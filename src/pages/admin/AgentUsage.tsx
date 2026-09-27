import { useEffect, useState } from "react";
import { getAdminAgentUsage, type AgentUsage as AgentUsageRow } from "../../api/admin-agent-access";

export default function AgentUsage() {
  const [rows, setRows] = useState<AgentUsageRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setRows(await getAdminAgentUsage()); } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Agent Usage</h1>
          <p>Daily usage by user for cost and capacity control.</p>
        </div>
        <button className="admin-secondary-button" onClick={load}>Refresh</button>
      </div>

      {loading ? <div className="admin-loading">Loading usage...</div> : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr>
              <th>User</th><th>Tier</th><th>Jobs</th><th>Pages</th><th>Browser min</th><th>Apps</th><th>Submitted</th><th>LLM</th>
            </tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.user_id}>
                  <td><strong>{row.first_name} {row.last_name}</strong><div className="admin-muted">{row.email}</div></td>
                  <td><span className={row.tier === "ADVANCED" ? "admin-tier advanced" : "admin-tier"}>{row.tier}</span></td>
                  <td>{row.usage.jobs_discovered}</td>
                  <td>{row.usage.pages_crawled}</td>
                  <td>{row.usage.browser_minutes}</td>
                  <td>{row.usage.applications_attempted}</td>
                  <td>{row.usage.applications_submitted}</td>
                  <td>{row.usage.llm_requests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
