import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, KeyRound, ShieldCheck, UserPlus } from "lucide-react";
import { actionRequired } from "../data/mock";

export default function ActionRequired() {
  const [items, setItems] = useState(actionRequired);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const resolve = (id: string) => setItems(prev => prev.filter(x => x.id !== id));
  return <div className="page-stack">
    <div className="page-heading"><div><span className="eyebrow">Human-in-the-loop</span><h1>Action Required</h1><p>JobPilot pauses an application whenever it needs information or a human-only step.</p></div><div className="pill warning"><AlertCircle size={15}/> {items.length} pending</div></div>
    <div className="info-banner"><ShieldCheck size={20}/><div><strong>You stay in control.</strong><span>JobPilot can auto-fill standard information, but sensitive data, new portal accounts, and human verification require your confirmation.</span></div></div>
    {items.length === 0 ? <div className="empty-state"><CheckCircle2 size={34}/><h3>All caught up</h3><p>No applications are waiting for you.</p></div> : <div className="action-list">{items.map(item => <div className="action-card" key={item.id}>
      <div className="action-icon">{item.type === "Portal Account" ? <UserPlus/> : item.type === "Verification" ? <ShieldCheck/> : <KeyRound/>}</div>
      <div className="action-content"><div className="action-top"><div><span className="muted">{item.applicationId} · {item.company}</span><h3>{item.title}</h3></div><span className="pill warning">{item.type}</span></div><p><strong>{item.question}</strong><br/>{item.description}</p>
      {item.type === "Additional Data" && <div className="answer-row"><input value={answers[item.id] || ""} onChange={e=>setAnswers({...answers,[item.id]:e.target.value})} placeholder="Enter your answer"/><button className="primary-button" disabled={!answers[item.id]} onClick={()=>resolve(item.id)}>Save & Continue <ArrowRight size={16}/></button></div>}
      {item.type === "Portal Account" && <div className="answer-row"><label className="checkbox-row"><input type="checkbox" onChange={e=>setAnswers({...answers,[item.id]:String(e.target.checked)})}/><span>I approve creating the employer portal account using my saved profile.</span></label><button className="primary-button" disabled={answers[item.id] !== "true"} onClick={()=>resolve(item.id)}>Approve & Continue <ArrowRight size={16}/></button></div>}
      {item.type === "Verification" && <button className="primary-button" onClick={()=>resolve(item.id)}>I completed verification <CheckCircle2 size={16}/></button>}
      </div>
    </div>)}</div>}
  </div>
}
