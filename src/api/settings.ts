import { apiRequest } from "./client";

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
}

export async function getUserProfile(): Promise<UserProfile> {
  return apiRequest<UserProfile>(
    "/user/profile"
  );
}

export async function updateUserProfile(
  profile: {
    first_name: string;
    last_name: string;
  }
): Promise<UserProfile> {
  return apiRequest<UserProfile>(
    "/user/profile",
    {
      method: "PUT",
      body: JSON.stringify(profile),
    }
  );
}