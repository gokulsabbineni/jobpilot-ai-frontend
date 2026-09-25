import { NavLink } from "react-router-dom";
import {
  Bot, BriefcaseBusiness, FileText, LayoutDashboard, Settings,
  SlidersHorizontal, UserRound, X, AlertCircle, ShieldCheck
} from "lucide-react";

type Props = { mobileOpen: boolean; onClose: () => void };

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "My Resume", icon: FileText },
  { to: "/preferences", label: "Job Preferences", icon: SlidersHorizontal },
  { to: "/jobs", label: "Find Jobs", icon: BriefcaseBusiness },
  { to: "/applications", label: "Applications", icon: FileText },
  { to: "/action-required", label: "Action Required", icon: AlertCircle },
  { to: "/agent", label: "AI Agent", icon: Bot },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ mobileOpen, onClose }: Props) {
  return (
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-mark">J</div>
        <div>
          <strong>JobPilot</strong>
          <span>AI Career Agent</span>
        </div>
        <button className="icon-button mobile-close" onClick={onClose}><X size={19}/></button>
      </div>

      <nav>
        <div className="nav-section-label">Workspace</div>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-link"><NavLink to="/admin/approvals" onClick={onClose} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><ShieldCheck size={18}/><span>Admin Approvals</span><span className="nav-count">2</span></NavLink></div>

      <div className="sidebar-bottom">
        <div className="usage-card">
          <div className="usage-top"><span>Agent usage</span><strong>18 / 50</strong></div>
          <div className="progress"><span style={{width: "36%"}} /></div>
          <small>Applications this month</small>
        </div>
        <div className="profile-mini">
          <div className="avatar">GS</div>
          <div><strong>Gokul Sai</strong><span>Job seeker</span></div>
          <UserRound size={16} className="muted-icon" />
        </div>
      </div>
    </aside>
  );
}