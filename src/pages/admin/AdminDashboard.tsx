import AdminHeader from "../../components/admin/AdminHeader";
import AdminStatCard from "../../components/admin/AdminStatCard";
import UserTable from "../../components/admin/UserTable";

const recentUsers = [
  {
    id: "usr_001",
    name: "John Doe",
    email: "john.doe@gmail.com",
    role: "USER" as const,
    status: "ACTIVE" as const,
    jobType: "FULL_TIME" as const,
    applications: 24,
    createdAt: "Sep 25, 2026",
  },
  {
    id: "usr_002",
    name: "Sarah Smith",
    email: "sarah.smith@gmail.com",
    role: "USER" as const,
    status: "PENDING" as const,
    jobType: "CONTRACT" as const,
    applications: 0,
    createdAt: "Sep 25, 2026",
  },
  {
    id: "usr_003",
    name: "Mike Johnson",
    email: "mike.johnson@gmail.com",
    role: "USER" as const,
    status: "ACTIVE" as const,
    jobType: "FULL_TIME" as const,
    applications: 47,
    createdAt: "Sep 24, 2026",
  },
];

export default function AdminDashboard() {
  return (
    <div className="admin-page">
      <AdminHeader
        title="Admin Dashboard"
        description="Monitor users, applications, AI agents, and system activity."
      />

      <section className="admin-stats-grid">
        <AdminStatCard
          title="Total Users"
          value="1,248"
          description="+42 this month"
          icon="♙"
        />

        <AdminStatCard
          title="Pending Approvals"
          value="37"
          description="Requires attention"
          icon="✓"
        />

        <AdminStatCard
          title="Active Users"
          value="1,102"
          description="88.3% of users"
          icon="●"
        />

        <AdminStatCard
          title="Applications"
          value="8,421"
          description="All time"
          icon="▤"
        />

        <AdminStatCard
          title="Running Agents"
          value="342"
          description="Currently active"
          icon="✦"
        />

        <AdminStatCard
          title="Failed Applications"
          value="126"
          description="Requires review"
          icon="!"
        />
      </section>

      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <h2>
              Recent Users
            </h2>

            <p>
              Recently registered JobPilot AI users.
            </p>
          </div>
        </div>

        <UserTable
          users={recentUsers}
        />
      </section>
    </div>
  );
}