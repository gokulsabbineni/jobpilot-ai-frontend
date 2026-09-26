import {
    useEffect,
    useState,
  } from "react";
  
  import type { Job } from "../../types/job";
  import { getJobs } from "../../api/jobs";
  
  export default function Jobs() {
    const [jobs, setJobs] =
      useState<Job[]>([]);
  
    useEffect(() => {
      getJobs().then(setJobs);
    }, []);
  
    return (
      <div className="user-page">
        <h1>Find Jobs</h1>
  
        <div className="user-job-list">
          {jobs.map((job) => (
            <div
              className="user-job-card"
              key={job.id}
            >
              <h2>{job.title}</h2>
  
              <p>
                {job.company}
              </p>
  
              <p>
                {job.location}
              </p>
  
              {job.salary && (
                <p>
                  {job.salary}
                </p>
              )}
  
              <button>
                View Job
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }