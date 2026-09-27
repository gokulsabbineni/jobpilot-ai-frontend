import {
  useEffect,
  useState,
} from "react";

import {
  getAgentStatus,
  pauseAgent,
  startAgent,
  stopAgent,
  type AgentStatus,
} from "../../api/agent";

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
    case "RUNNING":
      return "user-status-success";

    case "PAUSED":
      return "user-status-warning";

    case "FAILED":
      return "user-status-error";

    case "COMPLETED":
      return "user-status-info";

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
  ).toLocaleString();
}

export default function Agent() {
  const [
    agent,
    setAgent,
  ] = useState<AgentStatus>({
    status: "IDLE",
    jobs_scanned: 0,
    applications_made: 0,
    applications_submitted: 0,
    applications_action_required: 0,
    applications_failed: 0,
    started_at: null,
    completed_at: null,
    error_message: null,
  });

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [access, setAccess] = useState<any>(null);

  async function loadAccess() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/agent/access`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
          },
        }
      );
      if (response.ok) setAccess(await response.json());
    } catch {
      // Agent status remains usable if access metadata is temporarily unavailable.
    }
  }

  useEffect(() => {
    loadAgent();
    loadAccess();

    const interval =
      window.setInterval(() => {
        loadAgent(true);
      }, 5000);

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, []);

  async function loadAgent(
    silent = false
  ) {
    try {
      if (!silent) {
        setLoading(true);
      }

      if (!silent) {
        setError("");
      }

      const result =
        await getAgentStatus();

      setAgent({
        status:
          result.status ||
          "IDLE",

        jobs_scanned:
          result.jobs_scanned ||
          0,

        applications_made:
          result.applications_made ||
          0,

        applications_submitted:
          result.applications_submitted ??
          0,

        applications_action_required:
          result.applications_action_required ??
          0,

        applications_failed:
          result.applications_failed ??
          0,

        started_at:
          result.started_at ||
          null,

        completed_at:
          result.completed_at ||
          null,

        error_message:
          result.error_message ||
          null,

        id:
          result.id ||
          null,
      });
    } catch (err) {
      if (!silent) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load agent status.";

        setError(message);
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }

  async function handleStart() {
    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const result =
        await startAgent();

      setSuccess(
        result.message ||
          "JobPilot AI agent started successfully."
      );

      await loadAgent(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to start the agent.";

      setError(message);
    } finally {
      setActionLoading(false);
    }
  }

  async function handlePause() {
    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const result =
        await pauseAgent();

      setSuccess(
        result.message ||
          "JobPilot AI agent paused."
      );

      await loadAgent(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to pause the agent.";

      setError(message);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleStop() {
    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const result =
        await stopAgent();

      setSuccess(
        result.message ||
          "JobPilot AI agent stopped."
      );

      await loadAgent(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to stop the agent.";

      setError(message);
    } finally {
      setActionLoading(false);
    }
  }

  const status =
    agent.status || "IDLE";

  const isRunning =
    status === "RUNNING";

  const isPaused =
    status === "PAUSED";

  const isWorking =
    isRunning ||
    isPaused;

  if (loading) {
    return (
      <div className="user-page">
        <h1>
          AI Agent
        </h1>

        <p>
          Loading agent status...
        </p>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="user-page-header">
        <div>
          <h1>
            AI Agent
          </h1>

          <p>
            Manage your JobPilot AI
            application agent.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            loadAgent()
          }
          disabled={
            actionLoading
          }
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="user-error">
          {error}
        </div>
      )}

      {success && (
        <div className="user-success">
          {success}
        </div>
      )}

      {access && (
        <section className="user-agent-info-card">
          <h2>{access.capabilities?.tier === "ADVANCED" ? "Advanced Agent" : "Free Agent"}</h2>
          <p>
            {access.capabilities?.tier === "ADVANCED"
              ? "Advanced agent access is enabled for your account by an administrator."
              : "You are currently using the free agent. Advanced capabilities require administrator access."}
          </p>
          <div className="user-agent-steps">
            <div><strong>Applications today</strong><p>{access.usage?.applications_attempted ?? 0} / {access.limits?.daily_application_limit ?? 0}</p></div>
            <div><strong>Jobs discovered today</strong><p>{access.usage?.jobs_discovered ?? 0} / {access.limits?.daily_discovery_limit ?? 0}</p></div>
            <div><strong>Premium crawling</strong><p>{access.capabilities?.premium_crawling_enabled ? "Enabled" : "Not enabled"}</p></div>
            <div><strong>Cloud browser</strong><p>{access.capabilities?.cloud_browser_enabled ? "Enabled" : "Not enabled"}</p></div>
          </div>
        </section>
      )}

      <section className="user-agent-status-card">
        <div>
          <p>
            Agent Status
          </p>

          <span
            className={`user-agent-status ${getStatusClass(
              status
            )}`}
          >
            {formatStatus(
              status
            )}
          </span>
        </div>

        <div className="user-agent-actions">
          {!isWorking && (
            <button
              type="button"
              onClick={
                handleStart
              }
              disabled={
                actionLoading
              }
            >
              {actionLoading
                ? "Starting..."
                : "Start Agent"}
            </button>
          )}

          {isRunning && (
            <button
              type="button"
              onClick={
                handlePause
              }
              disabled={
                actionLoading
              }
            >
              {actionLoading
                ? "Pausing..."
                : "Pause Agent"}
            </button>
          )}

          {isPaused && (
            <button
              type="button"
              onClick={
                handleStart
              }
              disabled={
                actionLoading
              }
            >
              {actionLoading
                ? "Resuming..."
                : "Resume Agent"}
            </button>
          )}

          {isWorking && (
            <button
              type="button"
              onClick={
                handleStop
              }
              disabled={
                actionLoading
              }
            >
              {actionLoading
                ? "Stopping..."
                : "Stop Agent"}
            </button>
          )}
        </div>
      </section>

      {agent.error_message && (
        <div className="user-error">
          <strong>
            Agent Error
          </strong>

          <p>
            {agent.error_message}
          </p>
        </div>
      )}

      <div className="user-agent-stats">
        <div className="user-agent-stat-card">
          <span>
            Jobs Scanned
          </span>

          <strong>
            {agent.jobs_scanned}
          </strong>
        </div>

        <div className="user-agent-stat-card">
          <span>
            Applications Made
          </span>

          <strong>
            {agent.applications_made}
          </strong>
        </div>

        <div className="user-agent-stat-card">
          <span>
            Started
          </span>

          <strong>
            {formatDate(
              agent.started_at
            )}
          </strong>
        </div>

        <div className="user-agent-stat-card">
          <span>
            Completed
          </span>

          <strong>
            {formatDate(
              agent.completed_at
            )}
          </strong>
        </div>
      </div>

      <section className="user-agent-info-card">
        <h2>
          How JobPilot AI Works
        </h2>

        <div className="user-agent-steps">
          <div>
            <strong>
              1. Discover Jobs
            </strong>

            <p>
              The agent searches for jobs
              based on your resume and
              preferences.
            </p>
          </div>

          <div>
            <strong>
              2. Evaluate Matches
            </strong>

            <p>
              JobPilot AI evaluates jobs
              against your experience,
              preferences, and requirements.
            </p>
          </div>

          <div>
            <strong>
              3. Apply
            </strong>

            <p>
              The agent works through
              supported application flows
              and records the application
              status.
            </p>
          </div>

          <div>
            <strong>
              4. Ask When Needed
            </strong>

            <p>
              If an application requires
              information only you can provide,
              the agent pauses and creates an
              Action Required item.
            </p>
          </div>

          <div>
            <strong>
              5. Continue
            </strong>

            <p>
              After you provide the required
              information, the application can
              continue through the workflow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}