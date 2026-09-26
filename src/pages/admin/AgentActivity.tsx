import AdminHeader from "../../components/admin/AdminHeader";

export default function AgentActivity() {
  return (
    <div className="admin-page">
      <AdminHeader
        title="AI Agent Activity"
        description="Monitor JobPilot AI agents running for users."
      />

      <div className="admin-empty-state">
        <h2>
          Agent Activity
        </h2>

        <p>
          Running agents, completed
          jobs, failures, and logs will
          appear here.
        </p>
      </div>
    </div>
  );
}