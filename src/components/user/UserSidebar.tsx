import {
  NavLink,
} from "react-router-dom";

import {
  useAuth,
} from "../../auth/AuthContext";

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  iconClass: string;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "⌂",
    iconClass: "home",
  },
  {
    label: "My Resume",
    path: "/resume",
    icon: "▣",
    iconClass: "resume",
  },
  {
    label: "Resume Check",
    path: "/resume-check",
    icon: "▣",
    iconClass: "resume-check",
  },
  {
    label: "Job Preferences",
    path: "/preferences",
    icon: "◎",
    iconClass: "preferences",
  },
  {
    label: "Find Jobs",
    path: "/jobs",
    icon: "⌕",
    iconClass: "jobs",
  },
  {
    label: "Applications",
    path: "/applications",
    icon: "▤",
    iconClass: "applications",
  },
  {
    label: "Action Required",
    path: "/action-required",
    icon: "!",
    iconClass: "action",
  },
  {
    label: "AI Agent",
    path: "/agent",
    icon: "AI",
    iconClass: "agent",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: "⚙",
    iconClass: "settings",
  },
];

export default function UserSidebar() {
  const {
    user,
    logout,
  } = useAuth();

  const firstName =
    user?.first_name || "User";

  const lastName =
    user?.last_name || "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase();

  return (
    <aside className="user-sidebar">
      <div className="user-sidebar-top">
        <div className="user-brand">
          <div className="user-brand-mark">
            JP
          </div>

          <div className="user-brand-text">
            <strong>
              JobPilot AI
            </strong>

            <span>
              Job Application Assistant
            </span>
          </div>
        </div>

        <div className="user-section-title">
          Workspace
        </div>

        <nav className="user-navigation">
          {navigationItems.map(
            (item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `user-nav-item ${
                    isActive
                      ? "active"
                      : ""
                  }`
                }
              >
                <span className={`user-nav-icon user-nav-icon-${item.iconClass}`} aria-hidden="true">
                  {item.icon}
                </span>

                <span className="user-nav-label">
                  {item.label}
                </span>
              </NavLink>
            )
          )}
        </nav>
      </div>

      <div className="user-sidebar-bottom">
        <div className="user-profile-card">
          <div className="user-profile-avatar">
            {initials}
          </div>

          <div className="user-profile-info">
            <strong>
              {firstName} {lastName}
            </strong>

            <span>
              {user?.email || ""}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="user-logout"
          onClick={logout}
        >
          <span className="user-logout-icon" aria-hidden="true"><span className="logout-glyph" /></span>

          <span>
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
}