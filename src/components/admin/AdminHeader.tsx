import { useAuth } from "../../auth/AuthContext";

interface AdminHeaderProps {
  title?: string;
  description?: string;
}

export default function AdminHeader({
  title = "Admin Portal",
  description,
}: AdminHeaderProps) {
  const {
    user,
    logout,
  } = useAuth();

  const fullName = user
    ? `${user.first_name} ${user.last_name}`.trim()
    : "Administrator";

  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (part) =>
          part.charAt(0).toUpperCase()
      )
      .join("") || "AD";

  return (
    <>
      <header className="admin-header">
        <div className="admin-header-title">
          <h2>
            JobPilot AI
          </h2>

          <span>
            Admin Console
          </span>
        </div>

        <div className="admin-header-user">
          <div className="admin-header-avatar">
            {initials}
          </div>

          <div className="admin-header-user-info">
            <strong>
              {fullName || "Administrator"}
            </strong>

            <span>
              {user?.email ||
                "Administrator account"}
            </span>
          </div>

          <button
            type="button"
            className="admin-logout-button"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
      </header>

      {(title || description) && (
        <div className="admin-page-header">
          <div>
            <h1>
              {title}
            </h1>

            {description && (
              <p>
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}