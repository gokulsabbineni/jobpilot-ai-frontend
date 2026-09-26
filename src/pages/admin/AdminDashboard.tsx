import { useEffect, useState } from "react";

import {
  getAdminDashboard,
  type AdminDashboard as AdminDashboardData,
} from "../../api/admin";

import AdminStatCard from "../../components/admin/AdminStatCard";

export default function AdminDashboard() {
  const [data, setData] =
    useState<AdminDashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getAdminDashboard();

      setData(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load dashboard";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-page-header">
          <h1>Admin Dashboard</h1>

          <p>
            Loading JobPilot AI overview...
          </p>
        </div>

        <div className="admin-loading">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-page-header">
          <h1>Admin Dashboard</h1>
        </div>

        <div className="admin-error">
          {error}
        </div>

        <button
          className="admin-primary-button"
          onClick={loadDashboard}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Monitor JobPilot AI users,
            applications, and agents.
          </p>
        </div>

        <button
          className="admin-secondary-button"
          onClick={loadDashboard}
        >
          Refresh
        </button>
      </div>

      <div className="admin-stats-grid">
        <AdminStatCard
          title="Total Users"
          value={data.total_users}
          description="All registered users"
          icon="👥"
        />

        <AdminStatCard
          title="Pending Approvals"
          value={data.pending_approvals}
          description="Users waiting for approval"
          icon="⏳"
        />

        <AdminStatCard
          title="Active Users"
          value={data.active_users}
          description="Currently active accounts"
          icon="✓"
        />

        <AdminStatCard
          title="Applications"
          value={data.total_applications}
          description="Total job applications"
          icon="💼"
        />

        <AdminStatCard
          title="Active Agents"
          value={data.active_agents}
          description="Currently running agents"
          icon="🤖"
        />
      </div>
    </div>
  );
}