import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AccountPending from "./pages/auth/AccountPending";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import UserDetails from "./pages/admin/UserDetails";
import Approvals from "./pages/admin/Approvals";
import AdminApplications from "./pages/admin/Applications";
import AgentActivity from "./pages/admin/AgentActivity";
import AgentAccess from "./pages/admin/AgentAccess";
import AgentUsage from "./pages/admin/AgentUsage";
import AuditLogs from "./pages/admin/AuditLogs";
import AdminSettings from "./pages/admin/AdminSettings";
import Dashboard from "./pages/user/Dashboard";
import Resume from "./pages/user/Resume";
import Preferences from "./pages/user/Preferences";
import Jobs from "./pages/user/Jobs";
import Applications from "./pages/user/Applications";
import ActionRequired from "./pages/user/ActionRequired";
import Agent from "./pages/user/Agent";
import Settings from "./pages/user/Settings";
import ResumeCheck from "./pages/user/ResumeCheck";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/account-pending" element={<AccountPending />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRole="ADMIN" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/users/:id" element={<UserDetails />} />
            <Route path="/admin/approvals" element={<Approvals />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/agents" element={<AgentActivity />} />
            <Route path="/admin/agent-access" element={<AgentAccess />} />
            <Route path="/admin/agent-usage" element={<AgentUsage />} />
            <Route path="/admin/audit-logs" element={<AuditLogs />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRole="USER" />}>
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/resume-check" element={<ResumeCheck />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/action-required" element={<ActionRequired />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}