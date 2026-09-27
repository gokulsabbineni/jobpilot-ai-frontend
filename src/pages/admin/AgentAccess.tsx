import { useEffect, useState } from "react";
import {
  getAdminAgentAccess,
  updateAdminAgentAccess,
  type AdminAgentAccess,
} from "../../api/admin-agent-access";

export default function AgentAccess() {
  const [users, setUsers] = useState<AdminAgentAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<number | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError("");
      setUsers(await getAdminAgentAccess());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load agent access.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function toggle(user: AdminAgentAccess) {
    try {
      setSavingId(user.id);
      await updateAdminAgentAccess(user.id, {
        advanced_enabled: !user.advanced_enabled,
        tier: !user.advanced_enabled ? "ADVANCED" : "FREE",
        premium_crawling_enabled: !user.advanced_enabled,
        cloud_browser_enabled: !user.advanced_enabled,
        serp_discovery_enabled: !user.advanced_enabled,
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update access.");
    } finally {
      setSavingId(null);
    }
  }

  async function updateLimit(user: AdminAgentAccess, field: "daily_application_limit" | "daily_discovery_limit", value: string) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) return;
    try {
      setSavingId(user.id);
      await updateAdminAgentAccess(user.id, { [field]: Math.floor(parsed) });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update limit.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Agent Access</h1>
          <p>Control advanced-agent access and daily usage limits.</p>
        </div>
        <button type="button" className="admin-secondary-button" onClick={load}>Refresh</button>
      </div>

      {error && <div className="admin-error">{error}</div>}
      {loading ? <div className="admin-loading">Loading agent access...</div> : (
        <div className="admin-agent-access-list">
          {users.map((user) => (
            <section className="admin-agent-access-card" key={user.id}>
              <div className="admin-agent-access-user">
                <div className="admin-user-avatar">{user.first_name.charAt(0).toUpperCase()}</div>
                <div>
                  <strong>{user.first_name} {user.last_name}</strong>
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="admin-agent-access-tier">
                <span className={user.advanced_enabled ? "admin-tier advanced" : "admin-tier"}>
                  {user.advanced_enabled ? "ADVANCED" : "FREE"}
                </span>
                <small>{user.status}</small>
              </div>

              <div className="admin-agent-access-controls">
                <label className="admin-agent-toggle">
                  <input type="checkbox" checked={user.advanced_enabled} disabled={savingId === user.id} onChange={() => toggle(user)} />
                  <span>Advanced Agent</span>
                </label>
                <label>
                  Applications / day
                  <input type="number" min="0" value={user.daily_application_limit} disabled={savingId === user.id}
                    onChange={(e) => updateLimit(user, "daily_application_limit", e.target.value)} />
                </label>
                <label>
                  Discoveries / day
                  <input type="number" min="0" value={user.daily_discovery_limit} disabled={savingId === user.id}
                    onChange={(e) => updateLimit(user, "daily_discovery_limit", e.target.value)} />
                </label>
              </div>

              <div className="admin-agent-access-providers">
                <span>Premium crawling: {user.effective.premium_crawling_enabled ? "ON" : "OFF"}</span>
                <span>Cloud browser: {user.effective.cloud_browser_enabled ? "ON" : "OFF"}</span>
                <span>SERP discovery: {user.effective.serp_discovery_enabled ? "ON" : "OFF"}</span>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
