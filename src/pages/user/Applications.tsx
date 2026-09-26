import {
  useEffect,
  useState,
} from "react";

import {
  getApplications,
  runApplication,
  retryApplication,
  type UserApplication,
} from "../../api/applications";

function formatStatus(
  status: string
) {
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter: string) =>
        letter.toUpperCase()
    );
}

function getStatusClass(
  status: string
) {
  switch (status) {
    case "SUBMITTED":
    case "APPLIED":
      return "user-status-success";

    case "IN_PROGRESS":
    case "DISCOVERED":
      return "user-status-info";

    case "ACTION_REQUIRED":
      return "user-status-warning";

    case "FAILED":
      return "user-status-error";

    default:
      return "user-status-default";
  }
}

function formatDate(
  date?: string | null
) {
  if (!date) {
    return "—";
  }

  return new Date(
    date
  ).toLocaleDateString();
}

function formatMatchScore(
  score?: number | null
) {
  if (
    score === null ||
    score === undefined
  ) {
    return null;
  }

  return `${Math.round(score)}% match`;
}

export default function Applications() {
  const [
    applications,
    setApplications,
  ] = useState<UserApplication[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [busyId, setBusyId] = useState<number | null>(null);\n\n  const [statusFilter, setStatusFilter] =
    useState("ALL");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getApplications();

      setApplications(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load applications.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRun(id: number) {
    try {
      setBusyId(id);
      setError("");
      await runApplication(id);
      await loadApplications();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run application.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleRetry(id: number) {
    try {
      setBusyId(id);
      setError("");
      await retryApplication(id);
      await loadApplications();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to retry application.");
    } finally {
      setBusyId(null);
    }
  }

  const filteredApplications =
    applications.filter(
      (application) =>
        statusFilter === "ALL" ||
        application.status ===
          statusFilter
    );

  if (loading) {
    return (
      <div className="user-page">
        <h1>
          Applications
        </h1>

        <p>
          Loading your applications...
        </p>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="user-page-header">
        <div>
          <h1>
            Applications
          </h1>

          <p>
            Track your JobPilot AI
            applications and their current
            status.
          </p>
        </div>

        <button
          type="button"
          onClick={loadApplications}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="user-error">
          {error}
        </div>
      )}

      <div className="user-application-filters">
        <label htmlFor="application-status">
          Status
        </label>

        <select
          id="application-status"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
        >
          <option value="ALL">
            All Applications
          </option>

          <option value="DISCOVERED">
            Discovered
          </option>

          <option value="IN_PROGRESS">
            In Progress
          </option>

          <option value="ACTION_REQUIRED">
            Action Required
          </option>

          <option value="SUBMITTED">
            Submitted
          </option>

          <option value="FAILED">
            Failed
          </option>
        </select>
      </div>

      {!error &&
        applications.length === 0 && (
          <div className="user-empty-state">
            <h2>
              No Applications Yet
            </h2>

            <p>
              Your job applications will
              appear here once JobPilot AI
              starts processing jobs for you.
            </p>
          </div>
        )}

      {!error &&
        applications.length > 0 &&
        filteredApplications.length ===
          0 && (
          <div className="user-empty-state">
            <h2>
              No Matching Applications
            </h2>

            <p>
              There are no applications with
              the selected status.
            </p>
          </div>
        )}

      {!error &&
        filteredApplications.length > 0 && (
          <div className="user-application-list">
            {filteredApplications.map(
              (application) => {
                const matchScore =
                  formatMatchScore(
                    application.match_score
                  );

                return (
                  <div
                    className="user-application-card"
                    key={application.id}
                  >
                    <div>
                      <h2>
                        {application.job.title}
                      </h2>

                      <p>
                        <strong>
                          {application.job.company}
                        </strong>
                      </p>

                      <p>
                        {application.job.location ||
                          "Location not specified"}
                      </p>

                      <div className="user-application-meta">
                        {application.job
                          .remote && (
                          <span>
                            Remote
                          </span>
                        )}

                        {application.job
                          .job_type && (
                          <span>
                            {application.job.job_type
                              .replace(
                                /_/g,
                                " "
                              )
                              .toLowerCase()
                              .replace(
                                /\b\w/g,
                                (
                                  letter: string
                                ) =>
                                  letter.toUpperCase()
                              )}
                          </span>
                        )}

                        {matchScore && (
                          <span>
                            {matchScore}
                          </span>
                        )}
                      </div>

                      <div className="user-application-dates">
                        <p>
                          Created:{" "}
                          {formatDate(
                            application.created_at
                          )}
                        </p>

                        <p>
                          Submitted:{" "}
                          {formatDate(
                            application.submitted_at
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="user-application-actions">
                      <span
                        className={`user-application-status ${getStatusClass(
                          application.status
                        )}`}
                      >
                        {formatStatus(
                          application.status
                        )}
                      </span>

                      {application.external_url && (
                        <button type="button" onClick={() => window.open(application.external_url!, "_blank", "noopener,noreferrer")}>
                          View Application
                        </button>
                      )}

                      {["READY", "RETRY"].includes(application.status) && (
                        <button type="button" disabled={busyId === application.id} onClick={() => handleRun(application.id)}>
                          {busyId === application.id ? "Working..." : "Run Application"}
                        </button>
                      )}

                      {application.status === "FAILED" && (
                        <button type="button" disabled={busyId === application.id} onClick={() => handleRetry(application.id)}>
                          {busyId === application.id ? "Retrying..." : "Retry"}
                        </button>
                      )}

                      {!application.external_url &&
                        application.job.url && (
                          <button
                            type="button"
                            onClick={() =>
                              window.open(
                                application.job.url,
                                "_blank",
                                "noopener,noreferrer"
                              )
                            }
                          >
                            View Job
                          </button>
                        )}
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