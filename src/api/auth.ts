import type {
    AuthUser,
    LoginResponse,
  } from "../types/auth";
  
  const TEST_USERS = [
    {
      id: "admin_001",
      name: "JobPilot Admin",
      email: "admin@jobpilot.ai",
      password: "Admin@123",
      role: "ADMIN" as const,
      status: "ACTIVE" as const,
    },
    {
      id: "user_001",
      name: "John Doe",
      email: "user@jobpilot.ai",
      password: "User@123",
      role: "USER" as const,
      status: "ACTIVE" as const,
      jobType: "FULL_TIME" as const,
    },
  ];
  
  export async function login(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const user = TEST_USERS.find(
      (item) =>
        item.email.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password
    );
  
    if (!user) {
      throw new Error(
        "Invalid email or password."
      );
    }
  
    const { password: _, ...authUser } = user;
  
    const token =
      `test-token-${authUser.id}`;
  
    return {
      token,
      user: authUser as AuthUser,
    };
  }
  
  export function saveSession(
    response: LoginResponse
  ) {
    localStorage.setItem(
      "jobpilot_token",
      response.token
    );
  
    localStorage.setItem(
      "jobpilot_user",
      JSON.stringify(response.user)
    );
  }
  
  export function clearSession() {
    localStorage.removeItem(
      "jobpilot_token"
    );
  
    localStorage.removeItem(
      "jobpilot_user"
    );
  }
  
  export function getStoredUser(): AuthUser | null {
    const raw =
      localStorage.getItem(
        "jobpilot_user"
      );
  
    if (!raw) {
      return null;
    }
  
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }