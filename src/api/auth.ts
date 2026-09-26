import { apiRequest } from "./client";
import type { AuthUser, LoginResponse } from "../types/auth";

interface BackendLoginResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response =
    await apiRequest<BackendLoginResponse>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );

  localStorage.setItem(
    "jobpilot_token",
    response.access_token
  );

  const user = response.user || await getCurrentUser();

  return {
    token: response.access_token,
    user,
  };
}

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<AuthUser> {
  return apiRequest<AuthUser>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }),
    }
  );
}

export async function getCurrentUser(): Promise<AuthUser> {
  return apiRequest<AuthUser>("/auth/me");
}

export function saveSession(response: LoginResponse) {
  localStorage.setItem("jobpilot_token", response.token);
  localStorage.setItem(
    "jobpilot_user",
    JSON.stringify(response.user)
  );
}

export function clearSession() {
  localStorage.removeItem("jobpilot_token");
  localStorage.removeItem("jobpilot_user");
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem("jobpilot_user");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}
