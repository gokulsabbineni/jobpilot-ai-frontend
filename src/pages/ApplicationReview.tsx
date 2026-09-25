import { CheckCircle2, Edit3, FileText, Send } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { jobs } from "../data/mock";

export default function ApplicationReview() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const job = jobs.find(j=>j.id===params.get("job")) || jobs[0];
  return <>
    <div className="page-title-row"><div><span className="eyebrow">AI Application</span><h1>Review Application</h1><p>{job.title} • {job.company}</p></div></div>
    <div className="review-grid">
      <section className="panel"><div className="review-section"><div className="review-heading"><div><FileText size={19}/><h2>Resume</h2></div><button className="text-button">View resume</button></div><div className="file-card"><FileText size={22}/><div><strong>Gokul_Sai_Resume.pdf</strong><span>Uploaded today</span></div><CheckCircle2 className="success-icon"/></div></div>
      <div className="review-section"><div className="review-heading"><div><Edit3 size={19}/><h2>Cover Letter</h2></div><button className="text-button">Regenerate</button></div><textarea className="big-textarea" defaultValue={`Dear Hiring Team,\n\nI am excited to apply for the ${job.title} position at ${job.company}. My experience building backend services with Go, APIs, distributed systems and data platforms aligns closely with the role.\n\nI would welcome the opportunity to discuss how I can contribute to your team.\n\nBest,\nGokul Sai`}/></div></section>
      <aside className="panel review-side"><span className="eyebrow">Application questions</span><h2>Review answers</h2><label>How many years of experience do you have with Go?<input defaultValue="5 years"/></label><label>Are you authorized to work in the United States?<select defaultValue="Yes"><option>Yes</option><option>No</option></select></label><label>Are you willing to work in the listed location?<select defaultValue="Yes"><option>Yes</option><option>No</option></select></label><div className="approval-callout"><strong>Ready to submit</strong><span>Review the information, then submit the application.</span></div><button className="primary-btn full" onClick={()=>navigate(`/applications/APP-127`)}><Send size={16}/> Submit Application</button></aside>
    </div>
  </>;
}