import type {
  AccountStatus,
  JobType,
  UserRole,
} from "./auth";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  jobType: JobType;
  applications: number;
  createdAt: string;
  lastLogin?: string;
}

export type RemotePreference =
  | "ANY"
  | "REMOTE"
  | "HYBRID"
  | "ONSITE";

export interface UserPreferences {
  job_types: string[];
  job_titles: string[];
  locations: string[];
  remote_preference: RemotePreference;
  salary_min?: number | null;
  salary_max?: number | null;
  sponsorship_required: boolean;
  auto_apply: boolean;
}