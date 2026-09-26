import type {
    UserPreferences,
  } from "../types/user";
  
  export async function getUserPreferences(): Promise<UserPreferences> {
    return {
      targetRole: "Golang Developer",
      location: "United States",
      remote: true,
      minimumSalary: 110000,
      yearsOfExperience: 4,
    };
  }