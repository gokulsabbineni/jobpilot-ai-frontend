import { ArrowLeft, ExternalLink, FileText, CheckCircle2, Clock3 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { applications } from "../data/mock";
import StatusBadge from "../components/StatusBadge";

export default function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = applications.find(a=>a.id===id) || applications[0];
  return <>
    <button className="back-link" onClick={()=>navigate("/applications")}><ArrowLeft size={16}/> Back to applications</button>
    <div className="page-title-row"><div><span className="eyebrow">{app.id}</span><h1>{app.title}</h1><p>{app.company}</p></div><StatusBadge status={app.status}/></div>
    <div className="detail-layout">
      <section className="panel"><div className="panel-header"><div><span className="eyebrow">History</span><h2>Application Timeline</h2></div></div><div className="timeline"><div><span className="timeline-dot"><CheckCircle2 size={15}/></span><div><strong>Application submitted</strong><small>September 25, 2026 at 4:42 PM</small></div></div><div><span className="timeline-dot"><FileText size={15}/></span><div><strong>AI prepared application</strong><small>September 25, 2026 at 4:40 PM</small></div></div><div><span className="timeline-dot"><Clock3 size={15}/></span><div><strong>Job matched with resume</strong><small>September 25, 2026 at 4:38 PM</small></div></div></div></section>
      <aside className="panel"><span className="eyebrow">Submission</span><h2>Application details</h2><div className="detail-item"><span>Resume used</span><strong>Gokul_Sai_Resume.pdf</strong></div><div className="detail-item"><span>Cover letter</span><strong>AI-generated</strong></div><div className="detail-item"><span>Application ID</span><strong>{app.id}</strong></div>{app.url && <a className="primary-btn full" href={app.url} target="_blank" rel="noreferrer">Open Application <ExternalLink size={16}/></a>}</aside>
    </div>
  </>;
}