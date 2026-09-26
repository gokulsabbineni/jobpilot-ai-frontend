import { useNavigate } from "react-router-dom";

import type { AdminUser } from "../../api/admin";

interface UserTableProps {
  users: AdminUser[];
}

export default function UserTable({
  users,
}: UserTableProps) {
  const navigate = useNavigate();

  function getFullName(user: AdminUser) {
    return `${user.first_name} ${user.last_name}`.trim();
  }

  function formatDate(date?: string) {
    if (!date) {
      return "—";
    }

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

        <p>
          There are currently no users to display.
        </p>
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="admin-user-cell">
                  <div className="admin-user-avatar">
                    {user.first_name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {getFullName(user)}
                    </strong>
                  </div>
                </div>
              </td>

              <td>
                {user.email}
              </td>

              <td>
                <span className="admin-role">
                  {user.role}
                </span>
              </td>

              <td>
                <span
                  className={getStatusClass(
                    user.status
                  )}
                >
                  {user.status}
                </span>
              </td>

              <td>
                {formatDate(
                  user.created_at
                )}
              </td>

              <td>
                <button
                  type="button"
                  className="admin-table-action"
                  onClick={() =>
                    navigate(
                      `/admin/users/${user.id}`
                    )
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}