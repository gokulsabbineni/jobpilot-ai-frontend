import {
  useEffect,
  useState,
} from "react";

import {
  apiRequest,
} from "../../api/client";

import {
  getUserPreferences,
} from "../../api/users";

import type {
  UserPreferences,
} from "../../types/user";

const defaultPreferences: UserPreferences = {
  job_types: [],
  job_titles: [],
  locations: [],
  remote_preference: "ANY",
  salary_min: null,
  salary_max: null,
  sponsorship_required: false,
  auto_apply: false,
};

export default function Preferences() {
  const [
    preferences,
    setPreferences,
  ] = useState<UserPreferences>(
    defaultPreferences
  );

  const [
    jobTitleInput,
    setJobTitleInput,
  ] = useState("");

  const [
    locationInput,
    setLocationInput,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  useEffect(() => {
    loadPreferences();
  }, []);

  async function loadPreferences() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getUserPreferences();

      setPreferences({
        job_types:
          result.job_types || [],

        job_titles:
          result.job_titles || [],

        locations:
          result.locations || [],

        remote_preference:
          result.remote_preference ||
          "ANY",

        salary_min:
          result.salary_min ??
          null,

        salary_max:
          result.salary_max ??
          null,

        sponsorship_required:
          result.sponsorship_required ??
          false,

        auto_apply:
          result.auto_apply ??
          false,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load job preferences.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function savePreferences() {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await apiRequest(
        "/user/preferences",
        {
          method: "PUT",
          body: JSON.stringify(
            preferences
          ),
        }
      );

      setSuccess(
        "Your job preferences were saved successfully."
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to save job preferences.";

      setError(message);
    } finally {
      setSaving(false);
    }
  }

  function toggleJobType(
    jobType: string
  ) {
    setPreferences(
      (current) => {
        const exists =
          current.job_types.includes(
            jobType
          );

        return {
          ...current,

          job_types: exists
            ? current.job_types.filter(
                (item) =>
                  item !== jobType
              )
            : [
                ...current.job_types,
                jobType,
              ],
        };
      }
    );
  }

  function addJobTitle() {
    const value =
      jobTitleInput.trim();

    if (!value) {
      return;
    }

    const exists =
      preferences.job_titles.some(
        (title) =>
          title.toLowerCase() ===
          value.toLowerCase()
      );

    if (exists) {
      setJobTitleInput("");
      return;
    }

    setPreferences(
      (current) => ({
        ...current,

        job_titles: [
          ...current.job_titles,
          value,
        ],
      })
    );

    setJobTitleInput("");
  }

  function removeJobTitle(
    title: string
  ) {
    setPreferences(
      (current) => ({
        ...current,

        job_titles:
          current.job_titles.filter(
            (item) =>
              item !== title
          ),
      })
    );
  }

  function addLocation() {
    const value =
      locationInput.trim();

    if (!value) {
      return;
    }

    const exists =
      preferences.locations.some(
        (location) =>
          location.toLowerCase() ===
          value.toLowerCase()
      );

    if (exists) {
      setLocationInput("");
      return;
    }

    setPreferences(
      (current) => ({
        ...current,

        locations: [
          ...current.locations,
          value,
        ],
      })
    );

    setLocationInput("");
  }

  function removeLocation(
    location: string
  ) {
    setPreferences(
      (current) => ({
        ...current,

        locations:
          current.locations.filter(
            (item) =>
              item !== location
          ),
      })
    );
  }

  function handleJobTitleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (
      event.key === "Enter"
    ) {
      event.preventDefault();
      addJobTitle();
    }
  }

  function handleLocationKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (
      event.key === "Enter"
    ) {
      event.preventDefault();
      addLocation();
    }
  }

  function handleSalaryMinChange(
    value: string
  ) {
    setPreferences(
      (current) => ({
        ...current,

        salary_min:
          value === ""
            ? null
            : Number(value),
      })
    );
  }

  function handleSalaryMaxChange(
    value: string
  ) {
    setPreferences(
      (current) => ({
        ...current,

        salary_max:
          value === ""
            ? null
            : Number(value),
      })
    );
  }

  if (loading) {
    return (
      <div className="user-page">
        <div className="user-loading-card">
          <div className="user-loading-spinner" />

          <h2>
            Loading preferences
          </h2>

          <p>
            Preparing your job search preferences...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="user-page-header">
        <div>
          <div className="user-page-eyebrow">
            JOB SEARCH
          </div>

          <h1>
            Job Preferences
          </h1>

          <p>
            Tell JobPilot AI what kind of
            opportunities you want to find.
          </p>
        </div>

        <button
          type="button"
          className="user-secondary-button"
          onClick={loadPreferences}
          disabled={saving}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="user-alert user-alert-error">
          <span className="user-alert-icon" aria-hidden="true">⚠️</span>

          <div>
            <strong>
              Something went wrong
            </strong>

            <p>
              {error}
            </p>
          </div>
        </div>
      )}

      {success && (
        <div className="user-alert user-alert-success">
          <span className="user-alert-icon" aria-hidden="true">✅</span>

          <div>
            <strong>
              Preferences saved
            </strong>

            <p>
              {success}
            </p>
          </div>
        </div>
      )}

      <div className="user-preferences-layout">
        <div className="user-preferences-main">
          <section className="user-preferences-card">
            <div className="user-card-header">
              <div>
                <div className="user-card-icon" aria-hidden="true">💼</div>
              </div>

              <div>
                <h2>
                  Employment Type
                </h2>

                <p>
                  Select the types of positions
                  you're interested in.
                </p>
              </div>
            </div>

            <div className="user-option-grid">
              <label
                className={`user-option-card ${
                  preferences.job_types.includes(
                    "FULL_TIME"
                  )
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={preferences.job_types.includes(
                    "FULL_TIME"
                  )}
                  onChange={() =>
                    toggleJobType(
                      "FULL_TIME"
                    )
                  }
                />

                <span className="user-option-check" aria-hidden="true">✓</span>

                <span className="user-option-content">
                  <strong>
                    Full-time
                  </strong>

                  <small>
                    Permanent employment
                  </small>
                </span>
              </label>

              <label
                className={`user-option-card ${
                  preferences.job_types.includes(
                    "CONTRACT"
                  )
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={preferences.job_types.includes(
                    "CONTRACT"
                  )}
                  onChange={() =>
                    toggleJobType(
                      "CONTRACT"
                    )
                  }
                />

                <span className="user-option-check" aria-hidden="true">✓</span>

                <span className="user-option-content">
                  <strong>
                    Contract
                  </strong>

                  <small>
                    Contract opportunities
                  </small>
                </span>
              </label>
            </div>
          </section>

          <section className="user-preferences-card">
            <div className="user-card-header">
              <div className="user-card-icon" aria-hidden="true">🎯</div>

              <div>
                <h2>
                  Target Roles
                </h2>

                <p>
                  Add the job titles JobPilot
                  AI should search for.
                </p>
              </div>
            </div>

            <div className="user-input-row">
              <input
                type="text"
                value={jobTitleInput}
                placeholder="e.g. Golang Developer"
                onChange={(event) =>
                  setJobTitleInput(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleJobTitleKeyDown
                }
              />

              <button
                type="button"
                onClick={addJobTitle}
              >
                Add Role
              </button>
            </div>

            {preferences.job_titles.length >
            0 ? (
              <div className="user-tag-list">
                {preferences.job_titles.map(
                  (title) => (
                    <div
                      className="user-tag"
                      key={title}
                    >
                      <span>
                        {title}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeJobTitle(
                            title
                          )
                        }
                        aria-label={`Remove ${title}`}>×</button>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="user-inline-empty">
                No target roles added yet.
              </div>
            )}
          </section>

          <section className="user-preferences-card">
            <div className="user-card-header">
              <div className="user-card-icon" aria-hidden="true">📍</div>

              <div>
                <h2>
                  Locations
                </h2>

                <p>
                  Add cities, states, or regions
                  where you want to find jobs.
                </p>
              </div>
            </div>

            <div className="user-input-row">
              <input
                type="text"
                value={locationInput}
                placeholder="e.g. Dallas, TX"
                onChange={(event) =>
                  setLocationInput(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleLocationKeyDown
                }
              />

              <button
                type="button"
                onClick={addLocation}
              >
                Add Location
              </button>
            </div>

            {preferences.locations.length >
            0 ? (
              <div className="user-tag-list">
                {preferences.locations.map(
                  (location) => (
                    <div
                      className="user-tag"
                      key={location}
                    >
                      <span>
                        {location}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeLocation(
                            location
                          )
                        }
                        aria-label={`Remove ${location}`}>×</button>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="user-inline-empty">
                No locations added yet.
              </div>
            )}
          </section>

          <section className="user-preferences-card">
            <div className="user-card-header">
              <div className="user-card-icon" aria-hidden="true">🏠</div>

              <div>
                <h2>
                  Work Arrangement
                </h2>

                <p>
                  Choose where you prefer to
                  work.
                </p>
              </div>
            </div>

            <div className="user-work-options">
              {[
                {
                  value: "ANY",
                  title: "Any",
                  description:
                    "Show remote, hybrid, and on-site roles.",
                },
                {
                  value: "REMOTE",
                  title: "Remote",
                  description:
                    "Only search for remote positions.",
                },
                {
                  value: "HYBRID",
                  title: "Hybrid",
                  description:
                    "Search for hybrid opportunities.",
                },
                {
                  value: "ONSITE",
                  title: "On-site",
                  description:
                    "Search for on-site positions.",
                },
              ].map(
                (option) => (
                  <label
                    key={option.value}
                    className={`user-work-option ${
                      preferences.remote_preference ===
                      option.value
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="remote_preference"
                      value={
                        option.value
                      }
                      checked={
                        preferences.remote_preference ===
                        option.value
                      }
                      onChange={() =>
                        setPreferences(
                          (current) => ({
                            ...current,
                            remote_preference:
                              option.value as UserPreferences["remote_preference"],
                          })
                        )
                      }
                    />

                    <span className="user-radio">
                      <span />
                    </span>

                    <span>
                      <strong>
                        {option.title}
                      </strong>

                      <small>
                        {option.description}
                      </small>
                    </span>
                  </label>
                )
              )}
            </div>
          </section>

          <section className="user-preferences-card">
            <div className="user-card-header">
              <div className="user-card-icon" aria-hidden="true">💰</div>

              <div>
                <h2>
                  Salary Range
                </h2>

                <p>
                  Set the compensation range
                  you're targeting.
                </p>
              </div>
            </div>

            <div className="user-salary-grid">
              <div className="user-form-field">
                <label htmlFor="salary-min">
                  Minimum Salary
                </label>

                <div className="user-input-with-prefix">
                  <span>
                    $
                  </span>

                  <input
                    id="salary-min"
                    type="number"
                    min="0"
                    step="5000"
                    placeholder="110000"
                    value={
                      preferences.salary_min ??
                      ""
                    }
                    onChange={(event) =>
                      handleSalaryMinChange(
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="user-form-field">
                <label htmlFor="salary-max">
                  Maximum Salary
                </label>

                <div className="user-input-with-prefix">
                  <span>
                    $
                  </span>

                  <input
                    id="salary-max"
                    type="number"
                    min="0"
                    step="5000"
                    placeholder="160000"
                    value={
                      preferences.salary_max ??
                      ""
                    }
                    onChange={(event) =>
                      handleSalaryMaxChange(
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="user-preferences-card">
            <div className="user-card-header">
              <div className="user-card-icon" aria-hidden="true">⚙️</div>

              <div>
                <h2>
                  Application Preferences
                </h2>

                <p>
                  Control how JobPilot AI handles
                  your applications.
                </p>
              </div>
            </div>

            <div className="user-toggle-list">
              <label className="user-toggle-row">
                <span className="user-toggle-content">
                  <strong>
                    Visa sponsorship required
                  </strong>

                  <small>
                    Only consider jobs that provide
                    or support visa sponsorship.
                  </small>
                </span>

                <span className="user-switch">
                  <input
                    type="checkbox"
                    checked={
                      preferences.sponsorship_required
                    }
                    onChange={(event) =>
                      setPreferences(
                        (current) => ({
                          ...current,
                          sponsorship_required:
                            event.target
                              .checked,
                        })
                      )
                    }
                  />

                  <span />
                </span>
              </label>

              <label className="user-toggle-row">
                <span className="user-toggle-content">
                  <strong>
                    Automatic applications
                  </strong>

                  <small>
                    Allow JobPilot AI to automatically
                    apply when an application can be
                    completed safely.
                  </small>
                </span>

                <span className="user-switch">
                  <input
                    type="checkbox"
                    checked={
                      preferences.auto_apply
                    }
                    onChange={(event) =>
                      setPreferences(
                        (current) => ({
                          ...current,
                          auto_apply:
                            event.target
                              .checked,
                        })
                      )
                    }
                  />

                  <span />
                </span>
              </label>
            </div>
          </section>
        </div>

        <aside className="user-preferences-summary">
          <div className="user-summary-card">
            <div className="user-summary-header">
              <span className="user-summary-icon" aria-hidden="true">🔎</span>

              <div>
                <h3>
                  Search Profile
                </h3>

                <p>
                  Your current job search setup
                </p>
              </div>
            </div>

            <div className="user-summary-item">
              <span>
                Employment
              </span>

              <strong>
                {preferences.job_types.length
                  ? preferences.job_types
                      .map(
                        (type) =>
                          type ===
                          "FULL_TIME"
                            ? "Full-time"
                            : "Contract"
                      )
                      .join(", ")
                  : "Not selected"}
              </strong>
            </div>

            <div className="user-summary-item">
              <span>
                Target roles
              </span>

              <strong>
                {preferences.job_titles.length}
              </strong>
            </div>

            <div className="user-summary-item">
              <span>
                Locations
              </span>

              <strong>
                {preferences.locations.length}
              </strong>
            </div>

            <div className="user-summary-item">
              <span>
                Work arrangement
              </span>

              <strong>
                {preferences.remote_preference ===
                "ONSITE"
                  ? "On-site"
                  : preferences.remote_preference ===
                    "REMOTE"
                    ? "Remote"
                    : preferences.remote_preference ===
                      "HYBRID"
                      ? "Hybrid"
                      : "Any"}
              </strong>
            </div>

            <div className="user-summary-item">
              <span>
                Auto apply
              </span>

              <strong>
                {preferences.auto_apply
                  ? "Enabled"
                  : "Disabled"}
              </strong>
            </div>
          </div>

          <div className="user-summary-help">
            <div className="user-summary-help-icon" aria-hidden="true">💡</div>

            <h3>
              How this works
            </h3>

            <p>
              JobPilot AI uses these preferences
              together with your resume to identify
              relevant opportunities.
            </p>

            <p>
              You can change these settings at any
              time before starting the AI agent.
            </p>
          </div>
        </aside>
      </div>

      <div className="user-preferences-footer">
        <div>
          <strong>
            Ready to save your search profile?
          </strong>

          <span>
            JobPilot AI will use these settings
            when finding jobs for you.
          </span>
        </div>

        <button
          type="button"
          className="user-primary-button"
          onClick={savePreferences}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}