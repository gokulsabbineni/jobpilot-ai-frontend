import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import AdminHeader from "../../components/admin/AdminHeader";

import {
  getAdminUser,
  type AdminUserDetails,
} from "../../api/admin";

export default function UserDetails() {
  const { id } = useParams();

  const [user, setUser] =
    useState<AdminUserDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!id) {
      setError("User ID is missing.");
      setLoading(false);
      return;
    }

    loadUser(Number(id));
  }, [id]);

  async function loadUser(userId: number) {
    try {
      setLoading(true);
      setError("");

      const result =
        await getAdminUser(userId);

      setUser(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load user details.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date?: string) {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString();
  }

  function formatStatus(status: string) {
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(
        /\b\w/g,
        (letter: string) =>
          letter.toUpperCase()
      );
  }

  function formatList(
    values?: string[]
  ) {
    if (!values || values.length === 0) {
      return "—";
    }

    return values.join(", ");
  }

  function formatSalary(
    value?: number
  ) {
    if (
      value === undefined ||
      value === null
    ) {
      return "—";
    }

    return `$${value.toLocaleString()}`;
  }

  if (loading) {
    return (
      <div className="admin-page">
        <AdminHeader
          title="User Details"
          description="Loading user account information..."
        />

        <div className="admin-loading">
          Loading user details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <AdminHeader
          title="User Details"
          description="Unable to load the user account."
        />

        <div className="admin-error">
          {error}
        </div>

        <div className="admin-back-link">
          <Link to="/admin/users">
            ← Back to Users
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-page">
        <AdminHeader
          title="User Details"
          description="User account not found."
        />

        <div className="admin-empty-state">
          <h2>User Not Found</h2>

          <p>
            The requested user account could not
            be found.
          </p>
        </div>

        <div className="admin-back-link">
          <Link to="/admin/users">
            ← Back to Users
          </Link>
        </div>
      </div>
    );
  }

  const fullName =
    `${user.first_name} ${user.last_name}`.trim();

  const statistics =
    user.application_statistics;

  const preferences =
    user.preferences;

  return (
    <div className="admin-page">
      <AdminHeader
        title="User Details"
        description={`Viewing account ${user.id}`}
      />

      <div className="admin-back-link">
        <Link to="/admin/users">
          ← Back to Users
        </Link>
      </div>

      <div className="admin-detail-grid">
        <section className="admin-detail-card">
          <h2>Account Information</h2>

          <div className="detail-row">
            <span>Name</span>

            <strong>
              {fullName || "—"}
            </strong>
          </div>

          <div className="detail-row">
            <span>Email</span>

            <strong>
              {user.email}
            </strong>
          </div>

          <div className="detail-row">
            <span>Role</span>

            <strong>
              {user.role}
            </strong>
          </div>

          <div className="detail-row">
            <span>Status</span>

            <strong>
              {formatStatus(user.status)}
            </strong>
          </div>

          <div className="detail-row">
            <span>Created</span>

            <strong>
              {formatDate(
                user.created_at
              )}
            </strong>
          </div>

          <div className="detail-row">
            <span>Last Login</span>

            <strong>
              {formatDate(
                user.last_login_at
              )}
            </strong>
          </div>
        </section>

        <section className="admin-detail-card">
          <h2>Application Statistics</h2>

          <div className="detail-row">
            <span>Total Applications</span>

            <strong>
              {statistics.total}
            </strong>
          </div>

          <div className="detail-row">
            <span>Submitted</span>

            <strong>
              {statistics.submitted}
            </strong>
          </div>

          <div className="detail-row">
            <span>Failed</span>

            <strong>
              {statistics.failed}
            </strong>
          </div>

          <div className="detail-row">
            <span>Action Required</span>

            <strong>
              {statistics.action_required}
            </strong>
          </div>
        </section>

        <section className="admin-detail-card">
          <h2>Resume</h2>

          {user.resume ? (
            <>
              <p>
                {user.resume.file_name}
              </p>

              <div className="detail-row">
                <span>Uploaded</span>

                <strong>
                  {formatDate(
                    user.resume.uploaded_at
                  )}
                </strong>
              </div>

              <button
                type="button"
                className="table-action-button"
                disabled
                title="Resume viewing will be connected in a later step."
              >
                View Resume
              </button>
            </>
          ) : (
            <p>
              No resume uploaded.
            </p>
          )}
        </section>

        <section className="admin-detail-card">
          <h2>Job Preferences</h2>

          <div className="detail-row">
            <span>Job Type</span>

            <strong>
              {formatList(
                preferences?.job_types
              )}
            </strong>
          </div>

          <div className="detail-row">
            <span>Target Role</span>

            <strong>
              {formatList(
                preferences?.job_titles
              )}
            </strong>
          </div>

          <div className="detail-row">
            <span>Location</span>

            <strong>
              {formatList(
                preferences?.locations
              )}
            </strong>
          </div>

          <div className="detail-row">
            <span>Remote</span>

            <strong>
              {preferences?.remote_preference || "—"}
            </strong>
          </div>

          <div className="detail-row">
            <span>Salary Min</span>

            <strong>
              {formatSalary(
                preferences?.salary_min
              )}
            </strong>
          </div>

          <div className="detail-row">
            <span>Salary Max</span>

            <strong>
              {formatSalary(
                preferences?.salary_max
              )}
            </strong>
          </div>

          <div className="detail-row">
            <span>Sponsorship Required</span>

            <strong>
              {preferences?.sponsorship_required
                ? "Yes"
                : "No"}
            </strong>
          </div>

          <div className="detail-row">
            <span>Auto Apply</span>

            <strong>
              {preferences?.auto_apply
                ? "Enabled"
                : "Disabled"}
            </strong>
          </div>
        </section>
      </div>
    </div>
  );
}