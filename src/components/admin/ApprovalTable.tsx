interface Approval {
    id: string;
    name: string;
    email: string;
    jobType: string;
    registeredAt: string;
  }
  
  interface ApprovalTableProps {
    approvals: Approval[];
    onApprove: (
      id: string
    ) => void;
    onReject: (
      id: string
    ) => void;
  }
  
  export default function ApprovalTable({
    approvals,
    onApprove,
    onReject,
  }: ApprovalTableProps) {
    return (
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Job Type</th>
              <th>Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
  
          <tbody>
            {approvals.map(
              (approval) => (
                <tr key={approval.id}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">
                        {approval.name.charAt(
                          0
                        )}
                      </div>
  
                      <div>
                        <div className="table-user-name">
                          {approval.name}
                        </div>
  
                        <div className="table-user-email">
                          {approval.email}
                        </div>
                      </div>
                    </div>
                  </td>
  
                  <td>
                    {approval.jobType}
                  </td>
  
                  <td>
                    {approval.registeredAt}
                  </td>
  
                  <td>
                    <div className="approval-actions">
                      <button
                        className="approve-button"
                        onClick={() =>
                          onApprove(
                            approval.id
                          )
                        }
                      >
                        Approve
                      </button>
  
                      <button
                        className="reject-button"
                        onClick={() =>
                          onReject(
                            approval.id
                          )
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }