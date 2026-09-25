import { ArrowLeft, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { jobs } from "../data/mock";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id) || jobs[0];
  return (
    <>
      <button className="back-link" onClick={()=>navigate("/jobs")}><ArrowLeft size={16}/> Back to jobs</button>
      <div className="detail-layout">
        <div>
          <div className="detail-header"><div className="job-logo large"><Sparkles size={27}/></div><div><span className="company">{job.company}</span><h1>{job.title}</h1><div className="job-meta"><span><MapPin size={15}/>{job.location}</span><span>{job.type}</span><span>{job.salary}</span></div></div></div>
          <section className="panel prose-panel"><h2>Job Description</h2><p>{job.description}</p><h2>Responsibilities</h2><ul><li>Design and build scalable backend services in Go.</li><li>Collaborate with product and engineering teams.</li><li>Improve reliability, observability and performance.</li><li>Write maintainable tests and technical documentation.</li></ul><h2>Requirements</h2><ul>{job.skills.map(s=><li key={s}>Professional experience with {s}.</li>)}</ul></section>
        </div>
        <aside className="panel match-panel"><span className="eyebrow">AI analysis</span><h2>Resume Match</h2><div className="match-ring">{job.match}%</div><p>Your experience aligns strongly with this role.</p><div className="match-section"><span>Strong matches</span>{job.skills.slice(0,4).map(s=><div key={s}><CheckCircle2 size={15}/> {s}</div>)}</div><button className="primary-btn full" onClick={()=>navigate(`/applications/new?job=${job.id}`)}>Apply with AI</button><button className="secondary-btn full">Save Job</button></aside>
      </div>
    </>
  );
}