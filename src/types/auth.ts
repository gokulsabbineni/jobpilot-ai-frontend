export type UserRole = "USER" | "ADMIN";

export type AccountStatus =
  | "PENDING_APPROVAL"
  | "ACTIVE"
  | "SUSPENDED"
  | "REJECTED";

export type JobType =
  | "FULL_TIME"
  | "CONTRACT";

export interface AuthUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}