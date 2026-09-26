import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminSettings() {
  return (
    <div className="admin-page">
      <AdminHeader
        title="Admin Settings"
        description="Configure administrative and system settings."
      />

      <div className="admin-empty-state">
        <h2>
          System Settings
        </h2>

        <p>
          Administrative settings will
          be available here.
        </p>
      </div>
    </div>
  );
}