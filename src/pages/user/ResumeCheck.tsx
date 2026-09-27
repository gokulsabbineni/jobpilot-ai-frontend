import {useEffect,useState} from "react";
import {analyzeResume,getResumeCheck,type ResumeCheck as Data} from "../../api/resume-check";
export default function ResumeCheck(){
 const [data,setData]=useState<Data|null>(null),[loading,setLoading]=useState(true),[analyzing,setAnalyzing]=useState(false),[error,setError]=useState("");
 const load=async()=>{try{setLoading(true);setError("");setData(await getResumeCheck())}catch(e){setError(e instanceof Error?e.message:"Unable to load Resume Check.")}finally{setLoading(false)}};
 const run=async()=>{try{setAnalyzing(true);setError("");setData(await analyzeResume())}catch(e){setError(e instanceof Error?e.message:"Resume analysis failed.")}finally{setAnalyzing(false)}};
 useEffect(()=>{load()},[]);
 if(loading)return <main className="user-page"><div className="page-card"><h2>Resume Check</h2><p>Loading your resume analysis…</p></div></main>;
 const scores:[string,number][]=[["Overall",data?.overall_score||0],["ATS Compatibility",data?.ats_score||0],["Content Quality",data?.content_score||0],["Impact",data?.impact_score||0],["Readability",data?.readability_score||0],["Job Alignment",data?.job_alignment_score||0]];
 return <main className="user-page"><div className="page-header"><div><h1>Resume Check</h1><p>Review your resume for ATS readability, content strength, impact, and alignment with your target roles.</p></div><button className="primary-button" onClick={run} disabled={analyzing}>{analyzing?"Analyzing…":data?"Re-check Resume":"Check My Resume"}</button></div>
 {error&&<div className="page-card resume-check-error">{error}</div>}
 {!data?<div className="page-card"><h2>Get your resume ready</h2><p>Upload a readable resume first, then run a full check. Recommendations focus on concrete improvements and never invent experience or metrics.</p></div>:
 <><section className="resume-score-grid">{scores.map(([label,score])=><div className="resume-score-card" key={label}><span>{label}</span><strong>{score}</strong><small>/ 100</small><div className="resume-score-bar"><i style={{width:score+"%"}}/></div></div>)}</section>
 <section className="resume-check-columns"><div className="page-card"><h2>What to improve</h2>{data.analysis.issues.length?data.analysis.issues.map((i,n)=><div className="resume-issue" key={n}><div><span className={"severity severity-"+i.severity.toLowerCase()}>{i.severity}</span><b>{i.title}</b><em>{i.category}</em></div><p>{i.detail}</p></div>):<p>No major issues were detected.</p>}</div>
 <div className="page-card"><h2>Resume snapshot</h2><div className="resume-stats"><div><b>{data.analysis.stats.word_count}</b><span>Words</span></div><div><b>{data.analysis.stats.bullet_count}</b><span>Content lines</span></div><div><b>{data.analysis.stats.quantified_items}</b><span>Numbers detected</span></div></div><h3>Sections found</h3><div className="resume-tags">{data.analysis.stats.sections.map(s=><span key={s}>{s}</span>)}</div>{data.analysis.strengths.length>0&&<><h3>Strengths</h3>{data.analysis.strengths.map(s=><p className="resume-strength" key={s}>✓ {s}</p>)}</>}</div></section></>}</main>;
}
