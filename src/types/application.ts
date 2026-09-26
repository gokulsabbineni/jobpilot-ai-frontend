export type ApplicationStatus =
  | "APPLIED"
  | "IN_PROGRESS"
  | "FAILED"
  | "ACTION_REQUIRED"
  | "INTERVIEW";

export interface JobApplication {
  id: string;
  userId: string;
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  appliedAt?: string;
  updatedAt: string;
}