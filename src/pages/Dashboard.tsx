import { useState } from "react";
import { Activity, ArrowRight, Briefcase, CheckCircle2, Clock3, FileCheck2, Play, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import { agentEvents, applications, jobs } from "../data/mock";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const [running, setRunning] = useState(false);
  return (
    <>
      <div className="page-title-row">
        <div><span className="eyebrow">Dashboard</span><h1>Good evening, Gokul <span>👋</span></h1><p>Here’s what’s happening with your job search.</p></div>
        <button className="primary-btn" onClick={() => setRunning(!running)}>{running ? <Clock3 size={17}/> : <Play size={17}/>} {running ? "Agent Running" : "Start AI Agent"}</button>
      </div>

      <div className="stats-grid">
        <StatCard label="Jobs Found" value="127" detail="+18 this week" icon={Briefcase}/>
        <StatCard label="Applications" value="24" detail="+6 this week" icon={FileCheck2}/>
        <StatCard label="Interviews" value="3" detail="2 this week" icon={Users}/>
        <StatCard label="Submitted" value="18" detail="75% success rate" icon={CheckCircle2}/>
      </div>

      <div className="dashboard-grid">
        <section className="panel agent-panel">
          <div className="panel-header"><div><span className="eyebrow">Automation</span><h2>AI Agent</h2></div><span className="live-dot"><i/> {running ? "Running" : "Ready"}</span></div>
          <div className={`agent-hero ${running ? "running" : ""}`}>
            <div className="agent-orb"><Sparkles size={28}/></div>
            <div><h3>{running ? "Searching for matching jobs..." : "Your agent is ready"}</h3><p>{running ? "Analyzing your preferences and resume against available roles." : "Start the agent to discover and prepare applications for matching jobs."}</p></div>
            {running && <div className="agent-progress"><div className="progress"><span style={{width: "73%"}}/></div><small>73% • Analyzing Senior Golang Developer</small></div>}
            <div className="agent-actions"><Link to="/agent" className="secondary-btn">View Activity <ArrowRight size={15}/></Link><button className="primary-btn" onClick={() => setRunning(!running)}>{running ? "Stop Agent" : "Start Agent"}</button></div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header"><div><span className="eyebrow">Latest</span><h2>Applications</h2></div><Link to="/applications" className="text-link">View all <ArrowRight size={15}/></Link></div>
          <div className="application-list">
            {applications.slice(0, 4).map(app => <div className="application-row" key={app.id}><div className="company-avatar">{app.company[0]}</div><div className="application-info"><strong>{app.title}</strong><span>{app.company}</span></div><StatusBadge status={app.status}/></div>)}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header"><div><span className="eyebrow">Recommended</span><h2>Top matching jobs</h2></div><Link to="/jobs" className="text-link">Explore jobs <ArrowRight size={15}/></Link></div>
        <div className="job-mini-grid">{jobs.slice(0,3).map(job => <div className="job-mini" key={job.id}><div className="job-mini-top"><div className="job-logo small"><Briefcase size={17}/></div><span className="match-pill">{job.match}% match</span></div><strong>{job.title}</strong><span>{job.company} • {job.location}</span><div className="tags">{job.skills.slice(0,3).map(s=><span key={s}>{s}</span>)}</div></div>)}</div>
      </section>
    </>
  );
}