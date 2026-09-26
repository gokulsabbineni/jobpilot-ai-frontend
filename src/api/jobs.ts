import type { Job } from "../types/job";

export async function getJobs(): Promise<Job[]> {
  return [
    {
      id: "job_001",
      company: "Google",
      title: "Software Engineer",
      location: "Mountain View, CA",
      remote: false,
      salary: "$130k - $180k",
      postedAt: "2 days ago",
    },
    {
      id: "job_002",
      company: "Microsoft",
      title: "Backend Engineer",
      location: "Redmond, WA",
      remote: true,
      salary: "$120k - $165k",
      postedAt: "1 day ago",
    },
    {
      id: "job_003",
      company: "American Express",
      title: "Golang Developer",
      location: "New York, NY",
      remote: true,
      salary: "$115k - $155k",
      postedAt: "3 hours ago",
    },
  ];
}