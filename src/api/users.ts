import { apiRequest } from "./client";

import type {
  UserPreferences,
} from "../types/user";

export interface UserDashboard {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
  };

  resume: {
    uploaded: boolean;
    file_name?: string | null;
    uploaded_at?: string | null;
  };

  preferences: {
    configured: boolean;
    job_types?: string[];
    job_titles?: string[];
    locations?: string[];
    remote_preference?: string;
    salary_min?: number | null;
    salary_max?: number | null;
    sponsorship_required?: boolean;
    auto_apply?: boolean;
  };

  applications: {
    total: number;
    submitted: number;
    in_progress: number;
    action_required: number;
    failed: number;
  };

  agent: {
    status: string;
    jobs_scanned: number;
    applications_made: number;
    started_at?: string | null;
    completed_at?: string | null;
    error_message?: string | null;
  };
}

export interface UserResume {
  id: number;
  file_name: string;
  file_path?: string | null;
  content_text?: string | null;
  parsed_profile?: Record<string, unknown> | null;
  uploaded_at?: string | null;
}

export async function getUserDashboard(): Promise<UserDashboard> {
  return apiRequest<UserDashboard>(
    "/user/dashboard"
  );
}

export async function getUserPreferences(): Promise<UserPreferences> {
  return apiRequest<UserPreferences>(
    "/user/preferences"
  );
}

export async function getUserResume(): Promise<UserResume | null> {
  try {
    return await apiRequest<UserResume>(
      "/user/resume"
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.toLowerCase().includes("not found")
    ) {
      return null;
    }

    throw error;
  }
}

export async function uploadUserResume(
  file: File
): Promise<UserResume> {
  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  return apiRequest<UserResume>(
    "/user/resume",
    {
      method: "POST",
      body: formData,
    }
  );
}

export async function deleteUserResume(): Promise<void> {
  await apiRequest("/user/resume", {
    method: "DELETE",
  });
}
