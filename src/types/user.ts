import type {
    AccountStatus,
    JobType,
    UserRole,
  } from "./auth";
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: AccountStatus;
    jobType: JobType;
    applications: number;
    createdAt: string;
    lastLogin?: string;
  }
  
  export interface UserPreferences {
    targetRole: string;
    location: string;
    remote: boolean;
    minimumSalary?: number;
    yearsOfExperience?: number;
  }