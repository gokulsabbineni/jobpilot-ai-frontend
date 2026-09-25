import { ArrowUpRight, Bookmark, Building2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Job } from "../types";

export default function JobCard({ job }: { job: Job }) {
  const navigate = useNavigate();
  return (
    <article className="job-card">
      <div className="job-logo"><Building2 size={21}/></div>
      <div className="job-main">
        <div className="job-heading">
          <div>
            <p className="company">{job.company}</p>
            <h3>{job.title}</h3>
          </div>
          <button className="icon-button"><Bookmark size={18}/></button>
        </div>
        <div className="job-meta"><span><MapPin size={15}/>{job.location}</span><span>{job.type}</span><span>{job.salary}</span></div>
        <div className="tags">{job.skills.map(s => <span key={s}>{s}</span>)}</div>
        <div className="job-footer">
          <small>{job.posted}</small>
          <div className="job-actions">
            <span className="match"><strong>{job.match}%</strong> resume match</span>
            <button className="secondary-btn" onClick={() => navigate(`/jobs/${job.id}`)}>View Job <ArrowUpRight size={15}/></button>
            <button className="primary-btn" onClick={() => navigate(`/jobs/${job.id}`)}>Apply with AI</button>
          </div>
        </div>
      </div>
    </article>
  );
}