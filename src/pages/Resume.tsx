import { FileText, Upload, Plus, Trash2 } from "lucide-react";

export default function Resume() {
  return <>
    <div className="page-title-row"><div><span className="eyebrow">Profile</span><h1>My Resume</h1><p>Keep the profile your AI agent uses to match and prepare applications.</p></div><button className="primary-btn"><Upload size={17}/> Upload Resume</button></div>
    <section className="upload-zone"><FileText size={30}/><h3>Drag & drop your resume here</h3><p>PDF or DOCX up to 10MB</p><button className="secondary-btn"><Upload size={16}/> Choose file</button></section>
    <div className="form-grid">
      <section className="panel"><div className="panel-header"><div><span className="eyebrow">Basics</span><h2>Professional Profile</h2></div></div><div className="form-fields"><label>Full name<input defaultValue="Gokul Sai Sabbineni"/></label><label>Email<input defaultValue="gokul@example.com"/></label><label>Location<input defaultValue="Frisco, Texas"/></label><label>Most recent role<input defaultValue="Golang Developer"/></label><label className="wide">Professional summary<textarea defaultValue="Backend engineer focused on Go, APIs, distributed systems and cloud-native services." /></label></div></section>
      <section className="panel"><div className="panel-header"><div><span className="eyebrow">Skills</span><h2>Core Skills</h2></div></div><div className="tags large-tags">{["Go","Golang","Microservices","REST API","gRPC","PostgreSQL","Redis","Kafka","Docker","AWS"].map(s=><span key={s}>{s}<button>×</button></span>)}</div><button className="secondary-btn"><Plus size={16}/> Add skill</button></section>
      <section className="panel wide-panel"><div className="panel-header"><div><span className="eyebrow">Experience</span><h2>Work Experience</h2></div><button className="secondary-btn"><Plus size={16}/> Add experience</button></div><div className="experience-card"><div><h3>Golang Developer</h3><p>American Express • 2025 — Present</p></div><button className="icon-button"><Trash2 size={17}/></button><textarea defaultValue="Build and maintain backend services, APIs and event-driven workflows using Go and distributed systems technologies." /></div></section>
    </div>
    <div className="sticky-save"><button className="primary-btn">Save Resume</button></div>
  </>;
}