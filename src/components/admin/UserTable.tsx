import type { AdminUser } from "../../api/admin";

interface UserTableProps {
  users: AdminUser[];
  onApproveAgain?: (id: number) => void;
  onReject?: (id: number) => void;
  processingId?: number | null;
}

export default function UserTable({
  users,
  onApproveAgain,
  onReject,
  processingId = null,
}: UserTableProps) {
  function getFullName(user: AdminUser) {
    return `${user.first_name} ${user.last_name}`.trim();
  }

  function formatDate(date?: string) {
    if (!date) return "—";
    return new Date(date).toLocaleDateString();
  }

  function getStatusClass(status: string) {
    switch (status) {
      case "ACTIVE":
        return "admin-status admin-status-active";
      case "PENDING_APPROVAL":
        return "admin-status admin-status-pending";
      case "SUSPENDED":
        return "admin-status admin-status-suspended";
      case "REJECTED":
        return "admin-status admin-status-rejected";
      default:
        return "admin-status";
    }
  }

  if (users.length === 0) {
    return (
      <div className="admin-empty-state">
        <h3>No users found</h3>
        <p>There are currently no users to display.</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isProcessing = processingId === user.id;

            return (
              <tr key={user.id}>
                <td>
                  <div className="admin-user-cell">
                    <div className="admin-user-avatar">
                      {user.first_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong>{getFullName(user)}</strong>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className="admin-role">{user.role}</span>
                </td>
                <td>
                  <span className={getStatusClass(user.status)}>
                    {user.status}
                  </span>
                </td>
                <td>{formatDate(user.created_at)}</td>
                <td>
                  {user.status === "REJECTED" && onApproveAgain ? (
                    <div className="admin-user-actions">
                      <button
                        type="button"
                        className="admin-table-action admin-approve-action"
                        disabled={isProcessing}
                        onClick={() => onApproveAgain(user.id)}
                      >
                        {isProcessing ? "Processing..." : "Approve"}
                      </button>
                    </div>
                  ) : user.status === "ACTIVE" && onReject ? (
                    <div className="admin-user-actions">
                      <button
                        type="button"
                        className="admin-table-action admin-reject-action"
                        disabled={isProcessing}
                        onClick={() => onReject(user.id)}
                      >
                        {isProcessing ? "Processing..." : "Reject"}
                      </button>
                    </div>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
