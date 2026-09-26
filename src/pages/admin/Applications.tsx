import {
  useEffect,
  useState,
} from "react";

import AdminHeader from "../../components/admin/AdminHeader";

import {
  getAdminApplications,
  type AdminApplication,
} from "../../api/admin";

export default function Applications() {
  const [applications, setApplications] =
    useState<AdminApplication[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getAdminApplications();

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
      case "SUBMITTED":
        return "admin-status admin-status-active";

      case "FAILED":
        return "admin-status admin-status-rejected";

      case "ACTION_REQUIRED":
        return "admin-status admin-status-pending";

      case "IN_PROGRESS":
        return "admin-status admin-status-pending";

      case "DISCOVERED":
        return "admin-status";

      default:
        return "admin-status";
    }
  }

  function getUserName(
    application: AdminApplication
  ) {
    if (!application.user) {
      return "Unknown User";
    }

    return `${application.user.first_name} ${application.user.last_name}`.trim();
  }

  function getJobTitle(
    application: AdminApplication
  ) {
    return application.job?.title || "Unknown Job";
  }

  function getCompany(
    application: AdminApplication
  ) {
    return application.job?.company || "Unknown Company";
  }

  if (loading) {
    return (
      <div className="admin-page">
        <AdminHeader
          title="Applications"
          description="Monitor job applications across all users."
        />

        <div className="admin-loading">
          Loading applications...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminHeader
        title="Applications"
        description="Monitor job applications across all users."
      />

      <div className="admin-page-header">
        <div>
          <h1>Application Management</h1>

          <p>
            {applications.length} application
            {applications.length === 1
              ? ""
              : "s"} found.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={loadApplications}
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
        applications.length === 0 && (
          <div className="admin-empty-state">
            <h2>
              No Applications
            </h2>

            <p>
              There are currently no job
              applications to display.
            </p>
          </div>
        )}

      {!error &&
        applications.length > 0 && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Job</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Match</th>
                  <th>Submitted</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map(
                  (application) => (
                    <tr
                      key={application.id}
                    >
                      <td>
                        <div className="admin-user-cell">
                          <div className="admin-user-avatar">
                            {application.user?.first_name
                              ?.charAt(0)
                              .toUpperCase() ||
                              "?"}
                          </div>

                          <div>
                            <strong>
                              {getUserName(
                                application
                              )}
                            </strong>

                            <div>
                              {application.user
                                ?.email ||
                                "—"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <strong>
                          {getJobTitle(
                            application
                          )}
                        </strong>
                      </td>

                      <td>
                        {getCompany(
                          application
                        )}
                      </td>

                      <td>
                        <span
                          className={getStatusClass(
                            application.status
                          )}
                        >
                          {formatStatus(
                            application.status
                          )}
                        </span>
                      </td>

                      <td>
                        {application.match_score !==
                        null &&
                        application.match_score !==
                        undefined
                          ? `${Math.round(
                              application.match_score
                            )}%`
                          : "—"}
                      </td>

                      <td>
                        {formatDate(
                          application.submitted_at
                        )}
                      </td>

                      <td>
                        {application.external_url ||
                        application.job?.url ? (
                          <a
                            href={
                              application.external_url ||
                              application.job?.url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-table-action"
                          >
                            View
                          </a>
                        ) : (
                          <span>
                            —
                          </span>
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