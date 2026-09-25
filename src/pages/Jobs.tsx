import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import JobCard from "../components/JobCard";
import { jobs } from "../data/mock";

export default function Jobs() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => jobs.filter(j => `${j.title} ${j.company} ${j.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <>
      <div className="page-title-row"><div><span className="eyebrow">Discover</span><h1>Find Jobs</h1><p>Opportunities ranked by how well they match your resume.</p></div></div>
      <div className="job-search-row"><div className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search job title, skills, or company"/></div><button className="secondary-btn"><Filter size={17}/> Filters</button></div>
      <div className="result-row"><strong>{filtered.length} matching jobs</strong><span>Sorted by resume match</span></div>
      <div className="job-list">{filtered.map(job => <JobCard job={job} key={job.id}/>)}</div>
    </>
  );
}