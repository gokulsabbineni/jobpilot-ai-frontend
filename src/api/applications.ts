import { apiRequest } from "./client";

export interface UserApplication {
  id: number;

  user_id: number;

  job_id: number;

  status: string;

  match_score?: number | null;

  external_url?: string | null;

  submitted_at?: string | null;

  created_at?: string | null;

  updated_at?: string | null;

  provider?: string | null;
  attempt_count?: number;
  max_attempts?: number;
  last_error?: string | null;
  next_retry_at?: string | null;
  started_at?: string | null;

  job: {
    id: number;
    company: string;
    title: string;
    description?: string | null;
    location?: string | null;
    job_type?: string | null;
    remote?: boolean;
    salary_min?: number | null;
    salary_max?: number | null;
    url: string;
    source?: string | null;
    posted_at?: string | null;
  };
}

export async function getApplications(): Promise<
  UserApplication[]
> {
  return apiRequest<UserApplication[]>(
    "/user/applications"
  );
}

export async function getApplication(
  applicationId: number
): Promise<UserApplication> {
  return apiRequest<UserApplication>(
    `/user/applications/${applicationId}`
  );
}

export async function prepareApplication(
  jobId: number
): Promise<UserApplication> {
  return apiRequest<UserApplication>(
    `/user/applications/jobs/${jobId}`,
    {
      method: "POST",
    }
  );
}

export async function runApplication(applicationId: number): Promise<UserApplication> {
  return apiRequest<UserApplication>(`/user/applications/${applicationId}/run`, { method: "POST" });
}

export async function retryApplication(applicationId: number): Promise<UserApplication> {
  return apiRequest<UserApplication>(`/user/applications/${applicationId}/retry`, { method: "POST" });
}
