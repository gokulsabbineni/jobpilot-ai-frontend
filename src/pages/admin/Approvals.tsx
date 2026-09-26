import {
    useState,
  } from "react";
  
  import AdminHeader from "../../components/admin/AdminHeader";
  import ApprovalTable from "../../components/admin/ApprovalTable";
  
  const initialApprovals = [
    {
      id: "usr_005",
      name: "Jane Wilson",
      email: "jane.wilson@gmail.com",
      jobType: "FULL TIME",
      registeredAt:
        "Sep 25, 2026 7:42 PM",
    },
    {
      id: "usr_006",
      name: "Michael Brown",
      email: "michael.brown@gmail.com",
      jobType: "CONTRACT",
      registeredAt:
        "Sep 25, 2026 6:31 PM",
    },
    {
      id: "usr_007",
      name: "Alex Johnson",
      email: "alex.johnson@gmail.com",
      jobType: "FULL TIME",
      registeredAt:
        "Sep 25, 2026 5:18 PM",
    },
  ];
  
  export default function Approvals() {
    const [
      approvals,
      setApprovals,
    ] = useState(
      initialApprovals
    );
  
    function handleApprove(
      id: string
    ) {
      setApprovals(
        (current) =>
          current.filter(
            (item) =>
              item.id !== id
          )
      );
    }
  
    function handleReject(
      id: string
    ) {
      setApprovals(
        (current) =>
          current.filter(
            (item) =>
              item.id !== id
          )
      );
    }
  
    return (
      <div className="admin-page">
        <AdminHeader
          title="Pending Approvals"
          description="Review and approve new JobPilot AI accounts."
        />
  
        <div className="approval-summary">
          <strong>
            {approvals.length}
          </strong>
  
          <span>
            users waiting for approval
          </span>
        </div>
  
        <ApprovalTable
          approvals={approvals}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    );
  }