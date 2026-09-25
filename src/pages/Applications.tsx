import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { applications } from "../data/mock";

const tabs = ["All", "Pending", "Submitted", "Interview", "Rejected"];

export default function Applications() {
  const [tab, setTab] = useState("All");
  const filtered = applications.filter(a => tab === "All" || (tab === "Pending" ? ["Preparing","Waiting for Approval"].includes(a.status) : a.status === tab));
  return (
    <>
      <div className="page-title-row"><div><span className="eyebrow">Tracking</span><h1>Applications</h1><p>Keep every application and follow-up in one place.</p></div></div>
      <div className="tabs">{tabs.map(t=><button key={t} className={tab===t?"tab active":"tab"} onClick={()=>setTab(t)}>{t}</button>)}</div>
      <section className="panel table-panel"><div className="table-toolbar"><div className="search-box compact"><Search size={16}/><input placeholder="Search applications..."/></div></div><div className="table-wrap"><table><thead><tr><th>Company</th><th>Position</th><th>Status</th><th>Date</th><th></th></tr></thead><tbody>{filtered.map(a=><tr key={a.id}><td><div className="table-company"><div className="company-avatar">{a.company[0]}</div><strong>{a.company}</strong></div></td><td>{a.title}</td><td><StatusBadge status={a.status}/></td><td>{a.date}</td><td>{a.url && <a className="table-action" href={a.url} target="_blank" rel="noreferrer"><ExternalLink size={15}/> Open</a>}<Link className="table-action" to={`/applications/${a.id}`}>Details</Link></td></tr>)}</tbody></table></div></section>
    </>
  );
}