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

  const pendingCount = data.pending_approvals;
  const activeUsers = data.active_users;
  const totalUsers = data.total_users;
  const approvalRate =
    totalUsers > 0
      ? Math.round((activeUsers / totalUsers) * 100)
      : 0;

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

      <div className="admin-dashboard-intro">
        <div>
          <span className="admin-eyebrow">Operations Center</span>
          <h2>Good morning, Admin</h2>
          <p>
            Keep an eye on account approvals, application activity, and the AI agent.
          </p>
        </div>

        <div className="admin-health-card">
          <div className="admin-health-indicator">
            <span className="admin-health-dot" />
            Operational
          </div>
          <span>Platform health</span>
        </div>
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

      <div className="admin-dashboard-grid">
        <section className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <div>
              <span className="admin-card-kicker">Account Health</span>
              <h2>Approval overview</h2>
            </div>
            <span className="admin-card-icon">✓</span>
          </div>

          <div className="admin-progress-row">
            <div>
              <strong>{approvalRate}%</strong>
              <span>active accounts</span>
            </div>
            <span>{activeUsers} / {totalUsers}</span>
          </div>

          <div className="admin-progress-track">
            <div
              className="admin-progress-fill"
              style={{ width: `${approvalRate}%` }}
            />
          </div>

          <div className="admin-dashboard-metrics">
            <div>
              <strong>{pendingCount}</strong>
              <span>Awaiting approval</span>
            </div>
            <div>
              <strong>{data.total_applications}</strong>
              <span>Applications</span>
            </div>
            <div>
              <strong>{data.active_agents}</strong>
              <span>Active agents</span>
            </div>
          </div>
        </section>

        <section className="admin-dashboard-card admin-quick-actions">
          <div className="admin-dashboard-card-header">
            <div>
              <span className="admin-card-kicker">Quick Actions</span>
              <h2>Review queue</h2>
            </div>
          </div>

          <button
            type="button"
            className="admin-quick-action"
            onClick={() => (window.location.href = "/admin/approvals")}
          >
            <span className="admin-quick-action-icon">⏳</span>
            <span>
              <strong>Pending approvals</strong>
              <small>{pendingCount} account{pendingCount === 1 ? "" : "s"} need review</small>
            </span>
            <span>→</span>
          </button>

          <button
            type="button"
            className="admin-quick-action"
            onClick={() => (window.location.href = "/admin/applications")}
          >
            <span className="admin-quick-action-icon">📋</span>
            <span>
              <strong>Application activity</strong>
              <small>Review user application progress</small>
            </span>
            <span>→</span>
          </button>

          <button
            type="button"
            className="admin-quick-action"
            onClick={() => (window.location.href = "/admin/agents")}
          >
            <span className="admin-quick-action-icon">🤖</span>
            <span>
              <strong>Agent activity</strong>
              <small>Monitor recent agent runs</small>
            </span>
            <span>→</span>
          </button>
        </section>
      </div>
    </div>
  );
}