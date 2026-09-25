import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Preferences from "./pages/Preferences";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Applications from "./pages/Applications";
import ApplicationDetails from "./pages/ApplicationDetails";
import ApplicationReview from "./pages/ApplicationReview";
import Agent from "./pages/Agent";
import Settings from "./pages/Settings";
import ActionRequired from "./pages/ActionRequired";
import AdminApprovals from "./pages/AdminApprovals";

export default function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/action-required" element={<ActionRequired />} />
        <Route path="/admin/approvals" element={<AdminApprovals />} />
        <Route path="/applications/new" element={<ApplicationReview />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}