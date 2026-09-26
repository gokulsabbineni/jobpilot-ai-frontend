import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";

const sections = [
  {
    title: "Overview",

    items: [
      {
        label: "Dashboard",
        path: "/admin",
        icon: "🏠",
      },
      {
        label: "Users",
        path: "/admin/users",
        icon: "👥",
      },
      {
        label: "Pending Approvals",
        path: "/admin/approvals",
        icon: "⏳",
      },
    ],
  },

  {
    title: "Applications",

    items: [
      {
        label: "All Applications",
        path: "/admin/applications",
        icon: "📋",
      },
    ],
  },

  {
    title: "AI Agent",

    items: [
      {
        label: "Agent Activity",
        path: "/admin/agents",
        icon: "🤖",
      },
    ],
  },

  {
    title: "System",

    items: [
      {
        label: "Audit Logs",
        path: "/admin/audit-logs",
        icon: "🧾",
      },
      {
        label: "Settings",
        path: "/admin/settings",
        icon: "⚙️",
      },
    ],
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const {
    logout,
  } = useAuth();

  function handleLogout() {
    logout();

    navigate("/login");
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-logo">
          JP
        </div>

        <div>
          <div className="admin-brand-name">
            JOBPILOT AI
          </div>

          <div className="admin-brand-subtitle">
            ADMIN CONSOLE
          </div>
        </div>
      </div>

      <nav className="admin-navigation">
        {sections.map(
          (section) => (
            <div
              className="admin-nav-section"
              key={section.title}
            >
              <div className="admin-nav-title">
                {section.title}
              </div>

              {section.items.map(
                (item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={
                      item.path ===
                      "/admin"
                    }
                    className={({
                      isActive,
                    }) =>
                      `admin-nav-item ${
                        isActive
                          ? "active"
                          : ""
                      }`
                    }
                  >
                    <span className="admin-nav-icon">
                      {item.icon}
                    </span>

                    <span>
                      {item.label}
                    </span>
                  </NavLink>
                )
              )}
            </div>
          )
        )}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-system-status">
          <span className="status-dot" />

          <span>
            System Operational
          </span>
        </div>

        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}