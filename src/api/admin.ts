import type { User } from "../types/user";

export async function getAdminUsers(): Promise<User[]> {
  return [
    {
      id: "usr_001",
      name: "John Doe",
      email: "john.doe@gmail.com",
      role: "USER",
      status: "ACTIVE",
      jobType: "FULL_TIME",
      applications: 24,
      createdAt: "Sep 25, 2026",
      lastLogin: "Sep 25, 2026 7:42 PM",
    },
    {
      id: "usr_002",
      name: "Sarah Smith",
      email: "sarah.smith@gmail.com",
      role: "USER",
      status: "PENDING",
      jobType: "CONTRACT",
      applications: 0,
      createdAt: "Sep 25, 2026",
    },
    {
      id: "usr_003",
      name: "Mike Johnson",
      email: "mike.johnson@gmail.com",
      role: "USER",
      status: "ACTIVE",
      jobType: "FULL_TIME",
      applications: 47,
      createdAt: "Sep 24, 2026",
      lastLogin: "Sep 25, 2026 6:21 PM",
    },
    {
      id: "usr_004",
      name: "David Wilson",
      email: "david.wilson@gmail.com",
      role: "USER",
      status: "SUSPENDED",
      jobType: "CONTRACT",
      applications: 12,
      createdAt: "Sep 20, 2026",
    },
  ];
}

export async function approveUser(
  userId: string
): Promise<void> {
  console.log("Approve user:", userId);
}

export async function rejectUser(
  userId: string
): Promise<void> {
  console.log("Reject user:", userId);
}