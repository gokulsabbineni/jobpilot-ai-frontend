import {
  useEffect,
  useState,
} from "react";

import {
  getJobs,
  type UserJob,
} from "../../api/jobs";

import { prepareApplication } from "../../api/applications";

export default function Jobs() {
  const [jobs, setJobs] =
    useState<UserJob[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [jobType, setJobType] =
    useState("ALL");

  const [remoteOnly, setRemoteOnly] =
    useState(false);

  const [preparingJobId, setPreparingJobId] =
    useState<number | null>(null);

  useEffect(() => {
    loadJobs("");
  }, []);

  async function loadJobs(query = search) {
    try {
      setLoading(true);
      setError("");

      const result =
        await getJobs(query);

      setJobs(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load jobs.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function formatSalary(
    minimum?: number | null,
    maximum?: number | null
  ) {
    if (
      minimum === null ||
      minimum === undefined
    ) {
      if (
        maximum === null ||
        maximum === undefined
      ) {
        return null;
      }

      return `Up to $${maximum.toLocaleString()}`;
    }

    if (
      maximum === null ||
      maximum === undefined
    ) {
      return `$${minimum.toLocaleString()}+`;
    }

    return `$${minimum.toLocaleString()} - $${maximum.toLocaleString()}`;
  }

  function formatJobType(
    type?: string | null
  ) {
    if (!type) {
      return "Job";
    }

    return type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(
        /\b\w/g,
        (letter: string) =>
          letter.toUpperCase()
      );
  }

  async function handlePrepareApplication(jobId: number) {
    try {
      setPreparingJobId(jobId);
      setError("");
      await prepareApplication(jobId);
      window.location.href = "/applications";
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to prepare the application."
      );
    } finally {
      setPreparingJobId(null);
    }
  }

  function formatPostedDate(
    date?: string | null
  ) {
    if (!date) {
      return "Recently posted";
    }

    return new Date(
      date
    ).toLocaleDateString();
  }

  async function handleSearch() {
    await loadJobs(search);
  }

  const filteredJobs =
    jobs.filter((job) => {
      const searchValue =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        job.title
          .toLowerCase()
          .includes(searchValue) ||
        job.company
          .toLowerCase()
          .includes(searchValue) ||
        (
          job.location || ""
        )
          .toLowerCase()
          .includes(searchValue);

      const matchesType =
        jobType === "ALL" ||
        job.job_type === jobType;

      const matchesRemote =
        !remoteOnly ||
        job.remote === true;

      return (
        matchesSearch &&
        matchesType &&
        matchesRemote
      );
    });

  if (loading) {
    return (
      <div className="user-page">
        <h1>
          Find Jobs
        </h1>

        <p>
          Loading available jobs...
        </p>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="user-page-header">
        <div>
          <h1>
            Find Jobs
          </h1>

          <p>
            Discover jobs that match your
            JobPilot AI preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSearch()}
        >
          Refresh
        </button>
      </div>

      <div className="user-job-filters">
        <input
          type="search"
          placeholder="Search jobs, companies, or locations..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

        <select
          value={jobType}
          onChange={(event) =>
            setJobType(
              event.target.value
            )
          }
        >
          <option value="ALL">
            All Job Types
          </option>

          <option value="FULL_TIME">
            Full-time
          </option>

          <option value="CONTRACT">
            Contract
          </option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={(event) =>
              setRemoteOnly(
                event.target.checked
              )
            }
          />

          Remote only
        </label>
      </div>

      {error && (
        <div className="user-error">
          {error}
        </div>
      )}

      {!error &&
        jobs.length === 0 && (
          <div className="user-empty-state">
            <h2>
              No Jobs Available
            </h2>

            <p>
              There are currently no jobs
              available to display.
            </p>
          </div>
        )}

      {!error &&
        jobs.length > 0 &&
        filteredJobs.length === 0 && (
          <div className="user-empty-state">
            <h2>
              No Matching Jobs
            </h2>

            <p>
              Try changing your search or
              filters.
            </p>
          </div>
        )}

      {!error &&
        filteredJobs.length > 0 && (
          <div className="user-job-list">
            {filteredJobs.map(
              (job) => {
                const salary =
                  formatSalary(
                    job.salary_min,
                    job.salary_max
                  );

                return (
                  <div
                    className="user-job-card"
                    key={job.id}
                  >
                    <div>
                      <h2>
                        {job.title}
                      </h2>

                      <p>
                        <strong>
                          {job.company}
                        </strong>
                      </p>

                      <p>
                        {job.location ||
                          "Location not specified"}
                      </p>

                      <div className="user-job-meta">
                        {job.remote && (
                          <span>
                            Remote
                          </span>
                        )}

                        {job.job_type && (
                          <span>
                            {formatJobType(
                              job.job_type
                            )}
                          </span>
                        )}

                        {job.source && (
                          <span>
                            {job.source}
                          </span>
                        )}
                      </div>

                      {salary && (
                        <p>
                          {salary}
                        </p>
                      )}

                      <p>
                        Posted{" "}
                        {formatPostedDate(
                          job.posted_at
                        )}
                      </p>

                      {job.description && (
                        <p>
                          {job.description.length >
                          300
                            ? `${job.description.slice(
                                0,
                                300
                              )}...`
                            : job.description}
                        </p>
                      )}
                    </div>

                    <div className="user-job-actions">
                      <button
                        type="button"
                        onClick={() =>
                          handlePrepareApplication(job.id)
                        }
                        disabled={preparingJobId === job.id}
                      >
                        {preparingJobId === job.id
                          ? "Preparing..."
                          : "Prepare Application"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          window.open(
                            job.url,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        View Job
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
    </div>
  );
}