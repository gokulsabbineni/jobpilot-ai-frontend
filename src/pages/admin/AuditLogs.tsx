import AdminHeader from "../../components/admin/AdminHeader";

export default function AuditLogs() {
  return (
    <div className="admin-page">
      <AdminHeader
        title="Audit Logs"
        description="Review administrative and system activity."
      />

      <div className="admin-empty-state">
        <h2>
          System Audit Logs
        </h2>

        <p>
          Audit events will appear here
          once connected to the backend.
        </p>
      </div>
    </div>
  );
}