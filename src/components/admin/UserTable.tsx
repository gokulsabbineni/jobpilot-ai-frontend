import { useNavigate } from "react-router-dom";

import type { User } from "../../types/user";

interface UserTableProps {
  users: User[];
}

export default function UserTable({
  users,
}: UserTableProps) {
  const navigate = useNavigate();

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Status</th>
            <th>Job Type</th>
            <th>Applications</th>
            <th>Joined</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="table-user">
                  <div className="table-avatar">
                    {user.name.charAt(0)}
                  </div>

                  <div>
                    <div className="table-user-name">
                      {user.name}
                    </div>

                    <div className="table-user-email">
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>

              <td>
                <span
                  className={`status-badge status-${user.status.toLowerCase()}`}
                >
                  {user.status}
                </span>
              </td>

              <td>
                {user.jobType ===
                "FULL_TIME"
                  ? "Full Time"
                  : "Contract"}
              </td>

              <td>
                {user.applications}
              </td>

              <td>
                {user.createdAt}
              </td>

              <td>
                <button
                  className="table-action-button"
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