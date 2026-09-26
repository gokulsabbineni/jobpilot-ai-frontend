import { useAuth } from "../../auth/AuthContext";

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export default function AdminHeader({
  title,
  description,
}: AdminHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="admin-header">
      <div>
        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}
      </div>

      <div className="admin-header-right">
        <button className="admin-notification-button">
          🔔
        </button>

        <div className="admin-profile">
          <div className="admin-avatar">
            {user?.name
              ?.charAt(0)
              .toUpperCase() || "A"}
          </div>

          <div>
            <div className="admin-profile-name">
              {user?.name ||
                "JobPilot Admin"}
            </div>

            <div className="admin-profile-role">
              Administrator
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}