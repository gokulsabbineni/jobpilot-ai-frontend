import AdminHeader from "../../components/admin/AdminHeader";
import UserTable from "../../components/admin/UserTable";

const users = [
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
  {
    id: "usr_004",
    name: "David Wilson",
    email: "david.wilson@gmail.com",
    role: "USER" as const,
    status: "SUSPENDED" as const,
    jobType: "CONTRACT" as const,
    applications: 12,
    createdAt: "Sep 20, 2026",
  },
];

export default function Users() {
  return (
    <div className="admin-page">
      <AdminHeader
        title="Users"
        description="Manage all JobPilot AI user accounts."
      />

      <div className="admin-toolbar">
        <input
          className="admin-search-input"
          placeholder="Search users..."
        />

        <select className="admin-filter">
          <option>
            All Statuses
          </option>
          <option>
            Active
          </option>
          <option>
            Pending
          </option>
          <option>
            Suspended
          </option>
        </select>

        <select className="admin-filter">
          <option>
            All Job Types
          </option>
          <option>
            Full Time
          </option>
          <option>
            Contract
          </option>
        </select>
      </div>

      <UserTable
        users={users}
      />
    </div>
  );
}