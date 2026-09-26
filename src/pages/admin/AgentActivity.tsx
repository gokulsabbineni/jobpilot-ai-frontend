import {
  useEffect,
  useState,
} from "react";

import AdminHeader from "../../components/admin/AdminHeader";

import {
  getAdminAgentActivity,
  type AdminAgentActivity,
} from "../../api/admin";

export default function AgentActivity() {
  const [activities, setActivities] =
    useState<AdminAgentActivity[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadActivity();
  }, []);

  async function loadActivity() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getAdminAgentActivity();

      setActivities(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load agent activity.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(
    date?: string | null
  ) {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString();
  }

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
        return "admin-status admin-status-active";

      case "COMPLETED":
        return "admin-status admin-status-active";

      case "FAILED":
        return "admin-status admin-status-rejected";

      case "PAUSED":
        return "admin-status admin-status-pending";

      case "STOPPED":
        return "admin-status admin-status-suspended";

      case "IDLE":
        return "admin-status";

      default:
        return "admin-status";
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <AdminHeader
          title="AI Agent Activity"
          description="Monitor JobPilot AI agents running for users."
        />

        <div className="admin-loading">
          Loading agent activity...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminHeader
        title="AI Agent Activity"
        description="Monitor JobPilot AI agents running for users."
      />

      <div className="admin-page-header">
        <div>
          <h1>Agent Activity</h1>

          <p>
            Monitor agent runs,
            applications, and failures.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={loadActivity}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {!error &&
        activities.length === 0 && (
          <div className="admin-empty-state">
            <h2>
              No Agent Activity
            </h2>

            <p>
              There are currently no
              agent runs to display.
            </p>
          </div>
        )}

      {!error &&
        activities.length > 0 && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Run ID</th>
                  <th>User ID</th>
                  <th>Status</th>
                  <th>Jobs Scanned</th>
                  <th>Applications</th>
                  <th>Started</th>
                  <th>Completed</th>
                  <th>Error</th>
                </tr>
              </thead>

              <tbody>
                {activities.map(
                  (activity) => (
                    <tr
                      key={activity.id}
                    >
                      <td>
                        <strong>
                          #{activity.id}
                        </strong>
                      </td>

                      <td>
                        {activity.user_id}
                      </td>

                      <td>
                        <span
                          className={getStatusClass(
                            activity.status
                          )}
                        >
                          {formatStatus(
                            activity.status
                          )}
                        </span>
                      </td>

                      <td>
                        {activity.jobs_scanned ?? 0}
                      </td>

                      <td>
                        {activity.applications_made ?? 0}
                      </td>

                      <td>
                        {formatDate(
                          activity.started_at
                        )}
                      </td>

                      <td>
                        {formatDate(
                          activity.completed_at
                        )}
                      </td>

                      <td>
                        {activity.error_message ? (
                          <span
                            title={
                              activity.error_message
                            }
                          >
                            {activity.error_message}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}