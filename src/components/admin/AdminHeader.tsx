import { useAuth } from "../../auth/AuthContext";

interface AdminHeaderProps {
  title?: string;
  description?: string;
}

export default function AdminHeader({
  title = "Admin Portal",
  description,
}: AdminHeaderProps) {
  const { user, logout } = useAuth();

  const fullName = user
    ? `${user.first_name} ${user.last_name}`.trim()
    : "Administrator";

  return (
    <>
      <header className="admin-header">
        <div className="admin-header-title">
          <h2>JobPilot AI</h2>

          <span>Admin Portal</span>
        </div>

        <div className="admin-header-user">
          <div className="admin-header-user-info">
            <strong>
              {fullName || "Administrator"}
            </strong>

            <span>
              {user?.email}
            </span>
          </div>

          <button
            type="button"
            className="admin-logout-button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      {(title || description) && (
        <div className="admin-page-header">
          <div>
            <h1>{title}</h1>

            {description && (
              <p>{description}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}