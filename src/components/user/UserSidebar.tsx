import {
    NavLink,
    useNavigate,
  } from "react-router-dom";
  
  import { useAuth } from "../../auth/AuthContext";
  
  const items = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "My Resume",
      path: "/resume",
    },
    {
      label: "Job Preferences",
      path: "/preferences",
    },
    {
      label: "Find Jobs",
      path: "/jobs",
    },
    {
      label: "Applications",
      path: "/applications",
    },
    {
      label: "Action Required",
      path: "/action-required",
    },
    {
      label: "AI Agent",
      path: "/agent",
    },
    {
      label: "Settings",
      path: "/settings",
    },
  ];
  
  export default function UserSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
  
    function handleLogout() {
      logout();
      navigate("/login");
    }
  
    return (
      <aside className="user-sidebar">
        <div className="user-brand">
          JOBPILOT AI
        </div>
  
        <div className="user-section-title">
          WORKSPACE
        </div>
  
        <nav className="user-navigation">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `user-nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
  
        <button
          className="user-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>
    );
  }