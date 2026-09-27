import { apiRequest } from "./client";

export interface ResumeIssue {
  severity: string;
  category: string;
  title: string;
  detail: string;
}

export interface ResumeQuickFix {
  type: string;
  category: string;
  original: string;
  replacement: string;
  note: string;
}

export interface ResumeCheck {
  id: number;
  resume_id: number;
  overall_score: number;
  ats_score: number;
  content_score: number;
  impact_score: number;
  readability_score: number;
  job_alignment_score: number;
  analysis: {
    target_role?: string;
    role_family?: string;
    issues: ResumeIssue[];
    strengths: string[];
    quick_fixes?: ResumeQuickFix[];
    role_skills?: Array<{ skill: string; present: boolean }>;
    market_skills?: Array<{ skill: string; frequency: number }>;
    stats: {
      word_count: number;
      bullet_count: number;
      sections: string[];
      quantified_items: number;
      target_jobs_analyzed?: number;
    };
  };
  updated_at: string;
}

export const getResumeCheck = (): Promise<ResumeCheck | null> =>
  apiRequest("/user/resume-check");

export const analyzeResume = (): Promise<ResumeCheck> =>
  apiRequest("/user/resume-check/analyze", { method: "POST" });
