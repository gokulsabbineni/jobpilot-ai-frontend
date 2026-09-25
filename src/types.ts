export type UserStatus = "Pending Approval" | "Active" | "Rejected" | "Suspended";
export type ApplicationStatus = "Submitted" | "Waiting for Approval" | "Waiting for User" | "Interview" | "Rejected" | "Preparing";
export type ActionType = "Additional Data" | "Portal Account" | "Verification";

export type Job = { id: string; company: string; title: string; location: string; type: string; salary: string; posted: string; match: number; skills: string[]; description: string; };
export type Application = { id: string; company: string; title: string; status: ApplicationStatus; date: string; url?: string; actionRequired?: boolean; };
export type AgentEvent = { id: string; time: string; icon: string; message: string; };
export type ActionRequired = { id: string; applicationId: string; company: string; title: string; type: ActionType; question: string; description: string; required: boolean; };
export type ApprovalRequest = { id: string; name: string; email: string; requested: string; status: UserStatus; jobType: string; };
