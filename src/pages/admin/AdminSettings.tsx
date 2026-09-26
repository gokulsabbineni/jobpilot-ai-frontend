import {
  useEffect,
  useState,
} from "react";

import AdminHeader from "../../components/admin/AdminHeader";

import {
  getAdminSettings,
  updateAdminSettings,
  type AdminSettings as AdminSettingsData,
} from "../../api/admin";

export default function AdminSettings() {
  const [settings, setSettings] =
    useState<AdminSettingsData>({
      agent_enabled: true,
      auto_apply_enabled: false,
      maintenance_mode: false,
      max_applications_per_run: 10,
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const result =
        await getAdminSettings();

      setSettings({
        agent_enabled:
          result.agent_enabled ??
          true,

        auto_apply_enabled:
          result.auto_apply_enabled ??
          false,

        maintenance_mode:
          result.maintenance_mode ??
          false,

        max_applications_per_run:
          result.max_applications_per_run ??
          10,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load system settings.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateAdminSettings(
        settings
      );

      setSuccess(
        "System settings saved successfully."
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to save system settings.";

      setError(message);
    } finally {
      setSaving(false);
    }
  }

  function updateBoolean(
    key:
      | "agent_enabled"
      | "auto_apply_enabled"
      | "maintenance_mode",
    value: boolean
  ) {
    setSettings(
      (current) => ({
        ...current,
        [key]: value,
      })
    );
  }

  if (loading) {
    return (
      <div className="admin-page">
        <AdminHeader
          title="Admin Settings"
          description="Configure administrative and system settings."
        />

        <div className="admin-loading">
          Loading system settings...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminHeader
        title="Admin Settings"
        description="Configure administrative and system settings."
      />

      <div className="admin-page-header">
        <div>
          <h1>
            System Settings
          </h1>

          <p>
            Configure how JobPilot AI
            agents operate.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={loadSettings}
          disabled={saving}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {success && (
        <div className="admin-success">
          {success}
        </div>
      )}

      <div className="admin-settings-grid">
        <section className="admin-detail-card">
          <h2>
            Agent Configuration
          </h2>

          <div className="admin-setting-row">
            <div>
              <strong>
                Enable AI Agent
              </strong>

              <p>
                Allow JobPilot AI agents
                to run for active users.
              </p>
            </div>

            <label className="admin-toggle">
              <input
                type="checkbox"
                checked={
                  settings.agent_enabled
                }
                onChange={(event) =>
                  updateBoolean(
                    "agent_enabled",
                    event.target.checked
                  )
                }
              />

              <span>
                {settings.agent_enabled
                  ? "Enabled"
                  : "Disabled"}
              </span>
            </label>
          </div>

          <div className="admin-setting-row">
            <div>
              <strong>
                Enable Auto Apply
              </strong>

              <p>
                Allow the agent to submit
                applications automatically
                when user preferences permit it.
              </p>
            </div>

            <label className="admin-toggle">
              <input
                type="checkbox"
                checked={
                  settings.auto_apply_enabled
                }
                onChange={(event) =>
                  updateBoolean(
                    "auto_apply_enabled",
                    event.target.checked
                  )
                }
              />

              <span>
                {settings.auto_apply_enabled
                  ? "Enabled"
                  : "Disabled"}
              </span>
            </label>
          </div>

          <div className="admin-setting-row">
            <div>
              <strong>
                Maintenance Mode
              </strong>

              <p>
                Temporarily prevent agent
                activity while maintaining
                administrative access.
              </p>
            </div>

            <label className="admin-toggle">
              <input
                type="checkbox"
                checked={
                  settings.maintenance_mode
                }
                onChange={(event) =>
                  updateBoolean(
                    "maintenance_mode",
                    event.target.checked
                  )
                }
              />

              <span>
                {settings.maintenance_mode
                  ? "Enabled"
                  : "Disabled"}
              </span>
            </label>
          </div>
        </section>

        <section className="admin-detail-card">
          <h2>
            Application Limits
          </h2>

          <div className="admin-form-field">
            <label htmlFor="max-applications">
              Maximum Applications Per Agent Run
            </label>

            <input
              id="max-applications"
              type="number"
              min="1"
              max="100"
              value={
                settings.max_applications_per_run
              }
              onChange={(event) =>
                setSettings(
                  (current) => ({
                    ...current,
                    max_applications_per_run:
                      Number(
                        event.target.value
                      ),
                  })
                )
              }
            />

            <p>
              Maximum number of applications
              an agent can submit during one
              run.
            </p>
          </div>
        </section>
      </div>

      <div className="admin-settings-actions">
        <button
          type="button"
          className="admin-primary-button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Settings"}
        </button>
      </div>
    </div>
  );
}