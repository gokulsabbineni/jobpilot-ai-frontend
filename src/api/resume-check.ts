import { apiFetch } from "./client";
export interface ResumeCheck { id:number; resume_id:number; overall_score:number; ats_score:number; content_score:number; impact_score:number; readability_score:number; job_alignment_score:number; analysis:{issues:Array<{severity:string;category:string;title:string;detail:string}>;strengths:string[];stats:{word_count:number;bullet_count:number;sections:string[];quantified_items:number}};updated_at:string; }
export const getResumeCheck=():Promise<ResumeCheck|null>=>apiFetch("/user/resume-check");
export const analyzeResume=():Promise<ResumeCheck>=>apiFetch("/user/resume-check/analyze",{method:"POST"});
