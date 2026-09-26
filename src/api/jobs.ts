import { apiRequest } from "./client";

export interface UserJob {
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
  created_at?: string | null;
}

export async function getJobs(): Promise<UserJob[]> {
  return apiRequest<UserJob[]>(
    "/user/jobs"
  );
}

export async function getJob(
  jobId: number
): Promise<UserJob> {
  return apiRequest<UserJob>(
    `/user/jobs/${jobId}`
  );
}