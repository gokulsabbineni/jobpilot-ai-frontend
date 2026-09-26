import AdminHeader from "../../components/admin/AdminHeader";

export default function Applications() {
  return (
    <div className="admin-page">
      <AdminHeader
        title="Applications"
        description="Monitor job applications across all users."
      />

      <div className="admin-empty-state">
        <h2>
          Application Management
        </h2>

        <p>
          Application data will be
          connected to the backend here.
        </p>
      </div>
    </div>
  );
}