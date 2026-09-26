import { useEffect, useState } from "react";

import {
  getAdminUsers,
  type AdminUser,
} from "../../api/admin";

import UserTable from "../../components/admin/UserTable";

export default function Users() {
  const [users, setUsers] =
    useState<AdminUser[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getAdminUsers();

      setUsers(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load users";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Users</h1>

          <p>
            Manage JobPilot AI user accounts.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={loadUsers}
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="admin-loading">
          Loading users...
        </div>
      )}

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <UserTable users={users} />
      )}
    </div>
  );
}