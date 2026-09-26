import {
    useEffect,
    useState,
  } from "react";
  
  import type {
    JobApplication,
  } from "../../types/application";
  
  import {
    getApplications,
  } from "../../api/applications";
  
  export default function Applications() {
    const [
      applications,
      setApplications,
    ] = useState<JobApplication[]>(
      []
    );
  
    useEffect(() => {
      getApplications().then(
        setApplications
      );
    }, []);
  
    return (
      <div className="user-page">
        <h1>Applications</h1>
  
        <div className="user-application-list">
          {applications.map(
            (application) => (
              <div
                className="user-application-card"
                key={application.id}
              >
                <div>
                  <h2>
                    {application.position}
                  </h2>
  
                  <p>
                    {application.company}
                  </p>
                </div>
  
                <span>
                  {application.status}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    );
  }