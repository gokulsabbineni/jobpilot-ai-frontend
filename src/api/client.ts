const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("jobpilot_token");
  const headers = new Headers(options.headers);

  if (
    !headers.has("Content-Type") &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const body = await response.json();
      message =
        body.detail ||
        body.message ||
        body.error ||
        message;
    } catch {
      // Keep the HTTP status message for non-JSON errors.
    }

    if (response.status === 401) {
      localStorage.removeItem("jobpilot_token");
      localStorage.removeItem("jobpilot_user");
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
