import { useEffect, useState } from "react";

import {
  getAdminUsers,
  approveUserAgain,
  rejectUserFromUsers,
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

  const [processingId, setProcessingId] =
    useState<number | null>(null);

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

  async function handleApproveAgain(id: number) {
    try {
      setProcessingId(id);
      setError("");
      await approveUserAgain(id);
      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to approve user."
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject(id: number) {
    const user = users.find((item) => item.id === id);
    const name = user
      ? `${user.first_name} ${user.last_name}`.trim()
      : "this user";

    if (
      !window.confirm(
        `Reject ${name}'s account? They will lose access to JobPilot AI until an administrator approves them again.`
      )
    ) {
      return;
    }

    try {
      setProcessingId(id);
      setError("");
      await rejectUserFromUsers(id);
      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to reject user."
      );
    } finally {
      setProcessingId(null);
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
        <UserTable
          users={users}
          onApproveAgain={handleApproveAgain}
          onReject={handleReject}
          processingId={processingId}
        />
      )}
    </div>
  );
}