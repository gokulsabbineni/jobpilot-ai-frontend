import type { AdminApproval } from "../../api/admin";

interface ApprovalTableProps {
  approvals: AdminApproval[];

  onApprove: (
    id: number
  ) => void;

  onReject: (
    id: number
  ) => void;

  processingId: number | null;
}

export default function ApprovalTable({
  approvals,
  onApprove,
  onReject,
  processingId,
}: ApprovalTableProps) {
  function getFullName(
    approval: AdminApproval
  ) {
    return `${approval.first_name} ${approval.last_name}`.trim();
  }

  function formatDate(
    date?: string
  ) {
    if (!date) {
      return "—";
    }

    return new Date(
      date
    ).toLocaleString();
  }

  if (approvals.length === 0) {
    return (
      <div className="admin-empty-state">
        <h2>
          No Pending Approvals
        </h2>

        <p>
          There are currently no users
          waiting for approval.
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
            <th>Status</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {approvals.map(
            (approval) => {
              const fullName =
                getFullName(
                  approval
                );

              const isProcessing =
                processingId ===
                approval.id;

              return (
                <tr
                  key={
                    approval.id
                  }
                >
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">
                        {approval.first_name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <div className="table-user-name">
                          {fullName}
                        </div>

                        <div className="table-user-email">
                          {approval.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="admin-status admin-status-pending">
                      {approval.status}
                    </span>
                  </td>

                  <td>
                    {formatDate(
                      approval.created_at
                    )}
                  </td>

                  <td>
                    <div className="approval-actions">
                      <button
                        type="button"
                        className="approve-button"
                        disabled={
                          isProcessing
                        }
                        onClick={() =>
                          onApprove(
                            approval.id
                          )
                        }
                      >
                        {isProcessing
                          ? "Processing..."
                          : "Approve"}
                      </button>

                      <button
                        type="button"
                        className="reject-button"
                        disabled={
                          isProcessing
                        }
                        onClick={() =>
                          onReject(
                            approval.id
                          )
                        }
                      >
                        {isProcessing
                          ? "Processing..."
                          : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}