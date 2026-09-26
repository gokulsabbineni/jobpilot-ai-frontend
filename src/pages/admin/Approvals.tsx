import {
  useEffect,
  useState,
} from "react";

import AdminHeader from "../../components/admin/AdminHeader";
import ApprovalTable from "../../components/admin/ApprovalTable";

import {
  getAdminApprovals,
  approveUser,
  rejectUser,
  type AdminApproval,
} from "../../api/admin";

export default function Approvals() {
  const [
    approvals,
    setApprovals,
  ] = useState<AdminApproval[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    processingId,
    setProcessingId,
  ] = useState<number | null>(null);

  useEffect(() => {
    loadApprovals();
  }, []);

  async function loadApprovals() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getAdminApprovals();

      setApprovals(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load pending approvals.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(
    id: number
  ) {
    try {
      setProcessingId(id);
      setError("");

      await approveUser(id);

      setApprovals(
        (current) =>
          current.filter(
            (item) =>
              item.id !== id
          )
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to approve user.";

      setError(message);
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject(
    id: number
  ) {
    try {
      setProcessingId(id);
      setError("");

      await rejectUser(id);

      setApprovals(
        (current) =>
          current.filter(
            (item) =>
              item.id !== id
          )
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to reject user.";

      setError(message);
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="admin-page">
      <AdminHeader
        title="Pending Approvals"
        description="Review and approve new JobPilot AI accounts."
      />

      <div className="approval-summary">
        <div>
          <span className="admin-card-kicker">Review Queue</span>
          <strong>{loading ? "..." : approvals.length}</strong>
          <span>accounts waiting for approval</span>
        </div>
        <div className="approval-summary-icon">⏳</div>
      </div>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="admin-loading">
          Loading pending approvals...
        </div>
      ) : (
        <ApprovalTable
          approvals={approvals}
          onApprove={handleApprove}
          onReject={handleReject}
          processingId={processingId}
        />
      )}
    </div>
  );
}