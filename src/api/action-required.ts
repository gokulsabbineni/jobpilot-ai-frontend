import { apiRequest } from "./client";

export interface ActionRequiredItem {
  id: number;

  user_id: number;

  application_id?: number | null;

  type?: string | null;

  title: string;

  description?: string | null;

  required: boolean;

  completed: boolean;

  response?: Record<
    string,
    unknown
  > | null;

  created_at?: string | null;

  completed_at?: string | null;

  application_url?: string | null;

  application?: {
    id: number;

    status?: string | null;

    job?: {
      id: number;
      company: string;
      title: string;
      location?: string | null;
      url?: string | null;
    } | null;
  } | null;
}

export async function getActionRequired(): Promise<
  ActionRequiredItem[]
> {
  return apiRequest<ActionRequiredItem[]>(
    "/user/action-required"
  );
}

export async function completeActionRequired(
  actionId: number,
  response: Record<string, unknown>
): Promise<ActionRequiredItem> {
  return apiRequest<ActionRequiredItem>(
    `/user/action-required/${actionId}`,
    {
      method: "POST",
      body: JSON.stringify({
        response,
      }),
    }
  );
}