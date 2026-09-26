import {
  useEffect,
  useState,
} from "react";

import {
  clearSession,
} from "../../api/auth";

import {
  getUserProfile,
  updateUserProfile,
  type UserProfile,
} from "../../api/settings";

export default function Settings() {
  const [
    profile,
    setProfile,
  ] = useState<UserProfile>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    role: "USER",
    status: "ACTIVE",
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
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const result =
        await getUserProfile();

      setProfile(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load account settings.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (
      !profile.first_name.trim() ||
      !profile.last_name.trim()
    ) {
      setError(
        "First name and last name are required."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const updated =
        await updateUserProfile({
          first_name:
            profile.first_name.trim(),

          last_name:
            profile.last_name.trim(),
        });

      setProfile(updated);

      localStorage.setItem(
        "jobpilot_user",
        JSON.stringify(updated)
      );

      setSuccess(
        "Your account information has been updated successfully."
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to update account information.";

      setError(message);
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    clearSession();

    window.location.href =
      "/login";
  }

  function formatStatus(
    status: string
  ) {
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(
        /\b\w/g,
        (letter: string) =>
          letter.toUpperCase()
      );
  }

  if (loading) {
    return (
      <div className="user-page">
        <h1>
          Settings
        </h1>

        <p>
          Loading account settings...
        </p>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="user-page-header">
        <div>
          <h1>
            Settings
          </h1>

          <p>
            Manage your JobPilot AI
            account settings.
          </p>
        </div>

        <button
          type="button"
          onClick={loadProfile}
          disabled={saving}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="user-error">
          {error}
        </div>
      )}

      {success && (
        <div className="user-success">
          {success}
        </div>
      )}

      <div className="user-settings-grid">
        <section className="user-settings-card">
          <h2>
            Personal Information
          </h2>

          <div className="user-form-grid">
            <div className="user-form-field">
              <label htmlFor="first-name">
                First Name
              </label>

              <input
                id="first-name"
                type="text"
                value={
                  profile.first_name
                }
                onChange={(event) =>
                  setProfile(
                    (current) => ({
                      ...current,
                      first_name:
                        event.target.value,
                    })
                  )
                }
                disabled={saving}
              />
            </div>

            <div className="user-form-field">
              <label htmlFor="last-name">
                Last Name
              </label>

              <input
                id="last-name"
                type="text"
                value={
                  profile.last_name
                }
                onChange={(event) =>
                  setProfile(
                    (current) => ({
                      ...current,
                      last_name:
                        event.target.value,
                    })
                  )
                }
                disabled={saving}
              />
            </div>
          </div>

          <div className="user-form-field">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={
                profile.email
              }
              disabled
            />

            <p>
              Your email address is used
              to sign in to JobPilot AI.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </section>

        <section className="user-settings-card">
          <h2>
            Account Information
          </h2>

          <div className="user-account-info">
            <div>
              <span>
                Account ID
              </span>

              <strong>
                {profile.id}
              </strong>
            </div>

            <div>
              <span>
                Account Type
              </span>

              <strong>
                {formatStatus(
                  profile.role
                )}
              </strong>
            </div>

            <div>
              <span>
                Account Status
              </span>

              <strong>
                {formatStatus(
                  profile.status
                )}
              </strong>
            </div>
          </div>
        </section>

        <section className="user-settings-card">
          <h2>
            Security
          </h2>

          <p>
            Your account is protected by
            authenticated API access. Your
            password is never displayed or
            stored in the browser.
          </p>

          <p>
            Password management can be added
            once the backend password-change
            endpoint is enabled.
          </p>
        </section>

        <section className="user-settings-card user-settings-danger">
          <h2>
            Sign Out
          </h2>

          <p>
            Sign out of your JobPilot AI
            account on this device.
          </p>

          <button
            type="button"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </section>
      </div>
    </div>
  );
}