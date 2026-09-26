import {
  useEffect,
  useState,
} from "react";

import {
  getUserDashboard,
  type UserDashboard,
} from "../../api/users";

export default function Dashboard() {
  const [dashboard, setDashboard] =
    useState<UserDashboard | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getUserDashboard();

      setDashboard(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load dashboard.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function formatStatus(
    status?: string
  ) {
    if (!status) {
      return "Idle";
    }

    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(
        /\b\w/g,
        (letter: string) =>
          letter.toUpperCase()
      );
  }

  function formatDate(
    date?: string | null
  ) {
    if (!date) {
      return "—";
    }

    return new Date(
      date
    ).toLocaleString();
  }

  if (loading) {
    return (
      <div className="user-page">
        <div className="user-page-header">
          <div>
            <h1>
              Dashboard
            </h1>

            <p>
              Loading your JobPilot AI
              dashboard...
            </p>
          </div>
        </div>

        <div className="user-dashboard-grid">
          {[1, 2, 3, 4].map(
            (item) => (
              <div
                className="user-dashboard-card"
                key={item}
              >
                <span>
                  Loading
                </span>

                <strong>
                  —
                </strong>

                <p>
                  Please wait...
                </p>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-page">
        <div className="user-page-header">
          <div>
            <h1>
              Dashboard
            </h1>

            <p>
              Here's an overview of your
              JobPilot AI activity.
            </p>
          </div>
        </div>

        <div className="user-error">
          {error}
        </div>

        <button
          type="button"
          onClick={loadDashboard}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="user-page">
        <div className="user-page-header">
          <div>
            <h1>
              Dashboard
            </h1>

            <p>
              Here's an overview of your
              JobPilot AI activity.
            </p>
          </div>
        </div>

        <div className="user-empty-state">
          <h2>
            Dashboard Unavailable
          </h2>

          <p>
            No dashboard information is
            currently available.
          </p>
        </div>
      </div>
    );
  }

  const firstName =
    dashboard.user?.first_name ||
    "there";

  const applications =
    dashboard.applications;

  const agent =
    dashboard.agent;

  const resumeUploaded =
    dashboard.resume?.uploaded;

  const preferencesConfigured =
    dashboard.preferences?.configured;

  return (
    <div className="user-page">
      <div className="user-page-header">
        <div>
          <h1>
            Welcome, {firstName}
          </h1>

          <p>
            Here's an overview of your
            JobPilot AI activity.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDashboard}
        >
          Refresh
        </button>
      </div>

      <div className="user-dashboard-grid">
        <div className="user-dashboard-card">
          <span>
            Applications
          </span>

          <strong>
            {applications.total}
          </strong>

          <p>
            Total applications
          </p>
        </div>

        <div className="user-dashboard-card">
          <span>
            Submitted
          </span>

          <strong>
            {applications.submitted}
          </strong>

          <p>
            Applications submitted
          </p>
        </div>

        <div className="user-dashboard-card">
          <span>
            In Progress
          </span>

          <strong>
            {applications.in_progress}
          </strong>

          <p>
            Applications being processed
          </p>
        </div>

        <div className="user-dashboard-card">
          <span>
            Action Required
          </span>

          <strong>
            {applications.action_required}
          </strong>

          <p>
            Items waiting for you
          </p>
        </div>
      </div>

      <div className="user-dashboard-sections">
        <section className="user-dashboard-section">
          <div>
            <h2>
              Resume
            </h2>

            {resumeUploaded ? (
              <>
                <p>
                  Your resume is ready for
                  JobPilot AI.
                </p>

                <strong>
                  {dashboard.resume.file_name ||
                    "Resume uploaded"}
                </strong>

                {dashboard.resume
                  .uploaded_at && (
                  <p>
                    Uploaded{" "}
                    {formatDate(
                      dashboard.resume.uploaded_at
                    )}
                  </p>
                )}
              </>
            ) : (
              <>
                <p>
                  You haven't uploaded a
                  resume yet.
                </p>

                <a href="/resume">
                  Upload Resume
                </a>
              </>
            )}
          </div>

          <div className="user-dashboard-status">
            <span
              className={
                resumeUploaded
                  ? "user-status user-status-active"
                  : "user-status user-status-pending"
              }
            >
              {resumeUploaded
                ? "Ready"
                : "Required"}
            </span>
          </div>
        </section>

        <section className="user-dashboard-section">
          <div>
            <h2>
              Job Preferences
            </h2>

            {preferencesConfigured ? (
              <>
                <p>
                  Your job search preferences
                  are configured.
                </p>

                <strong>
                  {dashboard.preferences
                    .job_titles
                    ?.join(", ") ||
                    "Target roles configured"}
                </strong>
              </>
            ) : (
              <>
                <p>
                  Configure your preferences
                  so the agent knows what jobs
                  to target.
                </p>

                <a href="/preferences">
                  Configure Preferences
                </a>
              </>
            )}
          </div>

          <div className="user-dashboard-status">
            <span
              className={
                preferencesConfigured
                  ? "user-status user-status-active"
                  : "user-status user-status-pending"
              }
            >
              {preferencesConfigured
                ? "Configured"
                : "Required"}
            </span>
          </div>
        </section>

        <section className="user-dashboard-section">
          <div>
            <h2>
              AI Agent
            </h2>

            <p>
              Current agent status
            </p>

            <strong>
              {formatStatus(
                agent.status
              )}
            </strong>

            <p>
              {agent.jobs_scanned ?? 0}{" "}
              jobs scanned ·{" "}
              {agent.applications_made ?? 0}{" "}
              applications made
            </p>

            {agent.error_message && (
              <p>
                {agent.error_message}
              </p>
            )}
          </div>

          <div className="user-dashboard-status">
            <span
              className={`user-status ${agent.status === "RUNNING"
                ? "user-status-success"
                : agent.status === "FAILED"
                  ? "user-status-error"
                  : agent.status === "PAUSED"
                    ? "user-status-warning"
                    : "user-status-info"
              }`}
            >
              {formatStatus(
                agent.status
              )}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}