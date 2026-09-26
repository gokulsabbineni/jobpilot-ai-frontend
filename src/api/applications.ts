import type {
    JobApplication,
  } from "../types/application";
  
  export async function getApplications(): Promise<
    JobApplication[]
  > {
    return [
      {
        id: "app_001",
        userId: "user_001",
        company: "Google",
        position: "Software Engineer",
        location: "Mountain View, CA",
        status: "APPLIED",
        appliedAt: "Sep 24, 2026",
        updatedAt: "Sep 24, 2026",
      },
      {
        id: "app_002",
        userId: "user_001",
        company: "Microsoft",
        position: "Backend Engineer",
        location: "Remote",
        status: "INTERVIEW",
        appliedAt: "Sep 21, 2026",
        updatedAt: "Sep 25, 2026",
      },
      {
        id: "app_003",
        userId: "user_001",
        company: "Amazon",
        position: "Software Development Engineer",
        location: "Seattle, WA",
        status: "ACTION_REQUIRED",
        appliedAt: "Sep 20, 2026",
        updatedAt: "Sep 25, 2026",
      },
    ];
  }