import { apiRequest } from "./client";

export interface AdminDashboard {
  total_users: number;
  pending_approvals: number;
  active_users: number;
  total_applications: number;
  active_agents: number;
}

export interface AdminUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  last_login_at?: string;
}

export interface AdminApproval {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  created_at?: string;
}

export interface AdminUserDetails {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  last_login_at?: string;

  application_statistics: {
    total: number;
    submitted: number;
    failed: number;
    action_required: number;
  };

  resume: {
    id: number;
    file_name: string;
    uploaded_at?: string;
  } | null;

  preferences: {
    job_types?: string[];
    job_titles?: string[];
    locations?: string[];
    remote_preference?: string;
    salary_min?: number;
    salary_max?: number;
    sponsorship_required?: boolean;
    auto_apply?: boolean;
  } | null;
}

export interface AdminApplicationUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface AdminApplicationJob {
  id: number;
  company: string;
  title: string;
  location?: string;
  job_type?: string;
  remote?: boolean;
  url: string;
  source?: string;
}

export interface AdminApplication {
  id: number;
  user_id: number;
  user: AdminApplicationUser | null;
  job: AdminApplicationJob | null;
  status: string;
  match_score?: number | null;
  external_url?: string | null;
  submitted_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AdminAgentActivity {
  id: number;
  user_id: number;
  status: string;
  jobs_scanned: number;
  applications_made: number;
  started_at?: string | null;
  completed_at?: string | null;
  error_message?: string | null;
}

export interface AdminAuditLog {
  id: number;
  user_id?: number | null;
  action: string;
  resource?: string | null;
  resource_id?: string | null;
  details?: Record<string, unknown> | null;
  created_at?: string;
}

export interface AdminSettings {
  agent_enabled: boolean;
  auto_apply_enabled: boolean;
  maintenance_mode: boolean;
  max_applications_per_run: number;
}

export async function getAdminDashboard(): Promise<AdminDashboard> {
  return apiRequest<AdminDashboard>(
    "/admin/dashboard"
  );
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  return apiRequest<AdminUser[]>(
    "/admin/users"
  );
}

export async function getAdminUser(
  userId: number
): Promise<AdminUserDetails> {
  return apiRequest<AdminUserDetails>(
    `/admin/users/${userId}`
  );
}

export async function getAdminApprovals(): Promise<AdminApproval[]> {
  return apiRequest<AdminApproval[]>(
    "/admin/approvals"
  );
}

export async function approveUser(
  userId: number
) {
  return apiRequest(
    `/admin/approvals/${userId}/approve`,
    {
      method: "POST",
    }
  );
}

export async function rejectUser(
  userId: number
) {
  return apiRequest(
    `/admin/approvals/${userId}/reject`,
    {
      method: "POST",
    }
  );
}

export async function approveUserAgain(
  userId: number
) {
  return apiRequest(
    `/admin/users/${userId}/approve`,
    {
      method: "POST",
    }
  );
}

export async function getAdminApplications(): Promise<
  AdminApplication[]
> {
  return apiRequest<AdminApplication[]>(
    "/admin/applications"
  );
}

export async function getAdminAgentActivity(): Promise<
  AdminAgentActivity[]
> {
  return apiRequest<AdminAgentActivity[]>(
    "/admin/agent-activity"
  );
}

export async function getAdminAuditLogs(): Promise<
  AdminAuditLog[]
> {
  return apiRequest<AdminAuditLog[]>(
    "/admin/audit-logs"
  );
}

export async function getAdminSettings(): Promise<
  AdminSettings
> {
  return apiRequest<AdminSettings>(
    "/admin/settings"
  );
}

export async function updateAdminSettings(
  settings: AdminSettings
) {
  return apiRequest(
    "/admin/settings",
    {
      method: "PUT",
      body: JSON.stringify(settings),
    }
  );
}