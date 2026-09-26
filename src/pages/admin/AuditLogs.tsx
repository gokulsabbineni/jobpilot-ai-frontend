import {
  useEffect,
  useState,
} from "react";

import AdminHeader from "../../components/admin/AdminHeader";

import {
  getAdminAuditLogs,
  type AdminAuditLog,
} from "../../api/admin";

export default function AuditLogs() {
  const [logs, setLogs] =
    useState<AdminAuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getAdminAuditLogs();

      setLogs(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load audit logs.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(
    date?: string
  ) {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString();
  }

  function formatAction(
    action: string
  ) {
    return action
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(
        /\b\w/g,
        (letter: string) =>
          letter.toUpperCase()
      );
  }

  function formatDetails(
    details?: Record<string, unknown> | null
  ) {
    if (!details) {
      return "—";
    }

    const entries =
      Object.entries(details);

    if (entries.length === 0) {
      return "—";
    }

    return entries
      .map(
        ([key, value]) =>
          `${key}: ${String(value)}`
      )
      .join(", ");
  }

  if (loading) {
    return (
      <div className="admin-page">
        <AdminHeader
          title="Audit Logs"
          description="Review administrative and system activity."
        />

        <div className="admin-loading">
          Loading audit logs...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminHeader
        title="Audit Logs"
        description="Review administrative and system activity."
      />

      <div className="admin-page-header">
        <div>
          <h1>
            System Audit Logs
          </h1>

          <p>
            Review administrative actions
            and system activity.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={loadLogs}
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
        logs.length === 0 && (
          <div className="admin-empty-state">
            <h2>
              No Audit Logs
            </h2>

            <p>
              There are currently no audit
              events to display.
            </p>
          </div>
        )}

      {!error &&
        logs.length > 0 && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Action</th>
                  <th>Resource</th>
                  <th>Resource ID</th>
                  <th>Details</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {logs.map(
                  (log) => (
                    <tr
                      key={log.id}
                    >
                      <td>
                        <strong>
                          #{log.id}
                        </strong>
                      </td>

                      <td>
                        {log.user_id ?? "System"}
                      </td>

                      <td>
                        <span className="admin-role">
                          {formatAction(
                            log.action
                          )}
                        </span>
                      </td>

                      <td>
                        {log.resource || "—"}
                      </td>

                      <td>
                        {log.resource_id || "—"}
                      </td>

                      <td>
                        <span
                          title={formatDetails(
                            log.details
                          )}
                        >
                          {formatDetails(
                            log.details
                          )}
                        </span>
                      </td>

                      <td>
                        {formatDate(
                          log.created_at
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