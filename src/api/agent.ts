import { apiRequest } from "./client";

export interface AgentStatus {
  id?: number | null;
  status: string;
  jobs_scanned: number;
  applications_made: number;
  started_at?: string | null;
  completed_at?: string | null;
  error_message?: string | null;
}

export interface AgentActionResponse {
  success?: boolean;
  message?: string;
  status?: string;
  id?: number;
  jobs_scanned?: number;
  applications_made?: number;
  started_at?: string | null;
  completed_at?: string | null;
  error_message?: string | null;
}

export async function getAgentStatus(): Promise<AgentStatus> {
  return apiRequest<AgentStatus>(
    "/user/agent"
  );
}

export async function startAgent(): Promise<AgentActionResponse> {
  return apiRequest<AgentActionResponse>(
    "/user/agent/start",
    {
      method: "POST",
    }
  );
}

export async function pauseAgent(): Promise<AgentActionResponse> {
  return apiRequest<AgentActionResponse>(
    "/user/agent/pause",
    {
      method: "POST",
    }
  );
}

export async function stopAgent(): Promise<AgentActionResponse> {
  return apiRequest<AgentActionResponse>(
    "/user/agent/stop",
    {
      method: "POST",
    }
  );
}