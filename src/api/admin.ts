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
}

export interface AdminApproval {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  created_at?: string;
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