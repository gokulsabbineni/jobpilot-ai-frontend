import { useState } from "react";
import { Check, ShieldAlert, UserCheck, X } from "lucide-react";
import { approvalRequests } from "../data/mock";

export default function AdminApprovals() {
  const [requests, setRequests] = useState(approvalRequests);
  const update = (id:string, status:"Active"|"Rejected") => setRequests(r=>r.map(x=>x.id===id?{...x,status}:x));
  const pending = requests.filter(r=>r.status==="Pending Approval").length;
  return <div className="page-stack">
    <div className="page-heading"><div><span className="eyebrow">Admin</span><h1>Account Approvals</h1><p>Review and approve new JobPilot users before they can access the AI agent.</p></div><div className="pill warning"><ShieldAlert size={15}/> {pending} pending</div></div>
    <div className="info-banner"><UserCheck size={20}/><div><strong>Approval is required before activation.</strong><span>Pending users cannot start the application agent or submit applications.</span></div></div>
    <div className="table-card"><div className="table-head"><strong>Registration requests</strong><span>{requests.length} total</span></div><div className="approval-table">{requests.map(r=><div className="approval-row" key={r.id}><div className="avatar">{r.name.split(" ").map(x=>x[0]).join("")}</div><div className="user-cell"><strong>{r.name}</strong><span>{r.email}</span></div><div><span className="muted">Requested</span><strong>{r.requested}</strong></div><div><span className="muted">Job type</span><strong>{r.jobType}</strong></div><div><span className={`pill ${r.status === "Active" ? "success" : r.status === "Rejected" ? "danger" : "warning"}`}>{r.status}</span></div><div className="row-actions">{r.status === "Pending Approval" && <><button className="icon-button approve" title="Approve" onClick={()=>update(r.id,"Active")}><Check size={17}/></button><button className="icon-button reject" title="Reject" onClick={()=>update(r.id,"Rejected")}><X size={17}/></button></>}</div></div>)}</div></div>
  </div>
}
