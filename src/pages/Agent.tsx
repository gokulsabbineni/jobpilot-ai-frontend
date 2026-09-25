import { useState } from "react";
import { Bot, Check, FileText, Pause, Play, Search, Target, Pencil, Square } from "lucide-react";
import { agentEvents } from "../data/mock";

const icons: Record<string, React.ReactNode> = { search:<Search/>, check:<Check/>, target:<Target/>, file:<FileText/>, edit:<Pencil/>, pause:<Pause/> };

export default function Agent() {
  const [running, setRunning] = useState(false);
  return <>
    <div className="page-title-row"><div><span className="eyebrow">Automation</span><h1>AI Agent</h1><p>Monitor and control your job-search agent.</p></div><button className="primary-btn" onClick={()=>setRunning(!running)}>{running?<><Square size={16}/> Stop Agent</>:<><Play size={16}/> Start Agent</>}</button></div>
    <div className="agent-grid">
      <section className="panel agent-control"><div className={`big-agent-icon ${running?"active":""}`}><Bot size={42}/></div><span className="live-dot"><i/> {running?"Agent running":"Agent ready"}</span><h2>{running?"Searching for matching jobs":"Your agent is ready"}</h2><p>{running?"Searching, matching and preparing applications based on your preferences.":"Start the agent to discover matching opportunities."}</p>{running && <div className="agent-progress-large"><div className="progress"><span style={{width:"65%"}}/></div><strong>65%</strong><small>Analyzing Senior Golang Developer</small></div>}<button className="primary-btn" onClick={()=>setRunning(!running)}>{running?"Stop Agent":"Start Agent"}</button></section>
      <section className="panel"><div className="panel-header"><div><span className="eyebrow">Live log</span><h2>Agent Activity</h2></div><span className="muted">Today</span></div><div className="activity-list">{agentEvents.map(e=><div className="activity-item" key={e.id}><span className="activity-icon">{icons[e.icon]}</span><div><strong>{e.message}</strong><small>{e.time}</small></div></div>)}</div></section>
    </div>
  </>;
}