export type UserRole = "USER" | "ADMIN";

export type AccountStatus =
  | "PENDING"
  | "ACTIVE"
  | "SUSPENDED"
  | "REJECTED";

export type JobType = "FULL_TIME" | "CONTRACT";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  jobType?: JobType;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}