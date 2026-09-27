import { apiRequest } from "./client";

export interface AgentAccess {
  user_id: number;
  tier: "FREE" | "ADVANCED";
  advanced_enabled: boolean;
  premium_crawling_enabled: boolean;
  cloud_browser_enabled: boolean;
  serp_discovery_enabled: boolean;
  daily_application_limit: number;
  daily_discovery_limit: number;
  expires_at?: string | null;
  effective: {
    tier: "FREE" | "ADVANCED";
    advanced_enabled: boolean;
    premium_crawling_enabled: boolean;
    cloud_browser_enabled: boolean;
    serp_discovery_enabled: boolean;
  };
}

export interface AdminAgentAccess extends AgentAccess {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
}

export interface AgentUsage {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  tier: string;
  usage: {
    date: string;
    discovery_requests: number;
    jobs_discovered: number;
    pages_crawled: number;
    browser_minutes: number;
    applications_attempted: number;
    applications_submitted: number;
    llm_requests: number;
  };
}

export async function getAdminAgentAccess(): Promise<AdminAgentAccess[]> {
  return apiRequest("/admin/agent-access");
}

export async function updateAdminAgentAccess(
  userId: number,
  payload: Partial<AgentAccess>
): Promise<AgentAccess> {
  return apiRequest(`/admin/users/${userId}/agent-access`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function getAdminAgentUsage(): Promise<AgentUsage[]> {
  return apiRequest("/admin/agent-usage");
}

export async function getUserAgentAccess() {
  return apiRequest("/user/agent/access");
}
