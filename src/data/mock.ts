import type { ActionRequired, AgentEvent, Application, ApprovalRequest, Job } from "../types";

export const jobs: Job[] = [
  {
    id: "job-1",
    company: "Northstar Labs",
    title: "Senior Golang Developer",
    location: "Dallas, TX • Hybrid",
    type: "Full-time",
    salary: "$125K – $150K",
    posted: "2 hours ago",
    match: 94,
    skills: ["Go", "Kubernetes", "AWS", "PostgreSQL", "Kafka"],
    description: "Build highly available backend services and event-driven systems using Go, PostgreSQL, Kafka and Kubernetes."
  },
  {
    id: "job-2",
    company: "Orbit Financial",
    title: "Backend Software Engineer",
    location: "Remote • United States",
    type: "Full-time",
    salary: "$115K – $145K",
    posted: "5 hours ago",
    match: 91,
    skills: ["Go", "REST APIs", "gRPC", "Redis", "AWS"],
    description: "Develop APIs and distributed backend services for a high-volume financial platform."
  },
  {
    id: "job-3",
    company: "Pioneer Systems",
    title: "Go Developer",
    location: "Austin, TX • Remote",
    type: "Contract",
    salary: "$65 – $78/hr",
    posted: "1 day ago",
    match: 88,
    skills: ["Go", "Docker", "MySQL", "Microservices"],
    description: "Work with a platform engineering team building cloud-native Go microservices."
  },
  {
    id: "job-4",
    company: "CloudBridge",
    title: "Backend Engineer",
    location: "Remote • United States",
    type: "Contract-to-hire",
    salary: "$120K – $140K",
    posted: "1 day ago",
    match: 84,
    skills: ["Go", "Kubernetes", "gRPC", "Terraform"],
    description: "Build internal platforms and services that power developer workflows across the company."
  }
];

export const applications: Application[] = [
  { id: "APP-127", company: "Northstar Labs", title: "Senior Golang Developer", status: "Submitted", date: "Sep 25, 2026", url: "https://example.com/application/APP-127" },
  { id: "APP-126", company: "Orbit Financial", title: "Backend Software Engineer", status: "Waiting for User", date: "Sep 25, 2026", actionRequired: true },
  { id: "APP-124", company: "Pioneer Systems", title: "Go Developer", status: "Interview", date: "Sep 24, 2026" },
  { id: "APP-119", company: "CloudBridge", title: "Backend Engineer", status: "Rejected", date: "Sep 20, 2026" }
];

export const agentEvents: AgentEvent[] = [
  { id: "1", time: "4:42:01 PM", icon: "search", message: "Searching for matching jobs" },
  { id: "2", time: "4:42:08 PM", icon: "check", message: "Found 32 matching jobs" },
  { id: "3", time: "4:42:14 PM", icon: "target", message: "Analyzing Senior Golang Developer" },
  { id: "4", time: "4:42:19 PM", icon: "file", message: "Resume matched with job" },
  { id: "5", time: "4:42:23 PM", icon: "edit", message: "Preparing application" },
  { id: "6", time: "4:42:30 PM", icon: "pause", message: "Waiting for user approval" }
];

export const actionRequired: ActionRequired[] = [
  { id: "ACT-201", applicationId: "APP-126", company: "Orbit Financial", title: "Backend Software Engineer", type: "Additional Data", question: "What is your desired base salary?", description: "This employer asks for a desired base salary before the application can continue.", required: true },
  { id: "ACT-202", applicationId: "APP-123", company: "Pioneer Systems", title: "Go Developer", type: "Portal Account", question: "Create an account on the employer portal?", description: "The application requires a new portal account. JobPilot can prepare the account details, but you should confirm before credentials are created.", required: true },
  { id: "ACT-203", applicationId: "APP-121", company: "CloudBridge", title: "Backend Engineer", type: "Verification", question: "Complete human verification", description: "The employer portal requires CAPTCHA or another human verification step. JobPilot will pause until you complete it.", required: true }
];

export const approvalRequests: ApprovalRequest[] = [
  { id: "USR-1008", name: "Alex Johnson", email: "alex.johnson@example.com", requested: "Sep 25, 2026 4:18 PM", status: "Pending Approval", jobType: "Full-time" },
  { id: "USR-1007", name: "Priya Shah", email: "priya.shah@example.com", requested: "Sep 25, 2026 3:52 PM", status: "Pending Approval", jobType: "Contract" },
  { id: "USR-1006", name: "Michael Chen", email: "michael.chen@example.com", requested: "Sep 25, 2026 2:31 PM", status: "Active", jobType: "Full-time" }
];
