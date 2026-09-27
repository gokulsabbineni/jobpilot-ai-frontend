import {
  useEffect,
  useState,
} from "react";

import {
  completeActionRequired,
  getActionRequired,
  type ActionRequiredItem,
} from "../../api/action-required";

export default function ActionRequired() {
  const [
    actions,
    setActions,
  ] = useState<ActionRequiredItem[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [submittingId, setSubmittingId] =
    useState<number | null>(null);

  const [responses, setResponses] =
    useState<
      Record<number, string>
    >({});

  useEffect(() => {
    loadActions();
  }, []);

  async function loadActions() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getActionRequired();

      setActions(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load action required items.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleComplete(action: ActionRequiredItem) {
    try {
      setSubmittingId(action.id);
      setError("");

      await completeActionRequired(action.id, {
        answer: "Completed externally by user",
      });

      await loadActions();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to mark this action as completed.";

      setError(message);
    } finally {
      setSubmittingId(null);
    }
  }

  function formatType(
    type?: string | null
  ) {
    if (!type) {
      return "Action Required";
    }

    return type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(
        /\b\w/g,
        (letter: string) =>
          letter.toUpperCase()
      );
  }

  function formatDate(
    date?: string | null
  ) {
    if (!date) {
      return "—";
    }

    return new Date(
      date
    ).toLocaleString();
  }

  const pendingActions =
    actions.filter(
      (action) =>
        !action.completed
    );

  const completedActions =
    actions.filter(
      (action) =>
        action.completed
    );

  if (loading) {
    return (
      <div className="user-page">
        <h1>
          Action Required
        </h1>

        <p>
          Loading items that need your
          attention...
        </p>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="user-page-header">
        <div>
          <h1>
            Action Required
          </h1>

          <p>
            Complete these items so
            JobPilot AI can continue
            processing your applications.
          </p>
        </div>

        <button
          type="button"
          onClick={loadActions}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="user-error">
          {error}
        </div>
      )}

      {pendingActions.length ===
        0 && (
        <div className="user-empty-state">
          <h2>
            You're All Caught Up
          </h2>

          <p>
            There are no applications
            currently waiting for your
            input.
          </p>
        </div>
      )}

      {pendingActions.length >
        0 && (
        <div className="user-action-required-list">
          {pendingActions.map(
            (action) => (
              <div
                className="user-action-required-card"
                key={action.id}
              >
                <div className="user-action-required-header">
                  <div>
                    <span className="user-action-required-type">
                      {formatType(
                        action.type
                      )}
                    </span>

                    <h2>
                      {action.title}
                    </h2>
                  </div>

                  {action.required && (
                    <span className="user-status-warning">
                      Required
                    </span>
                  )}
                </div>

                {action.application
                  ?.job && (
                  <div className="user-action-required-job">
                    <strong>
                      {
                        action.application
                          .job.title
                      }
                    </strong>

                    <span>
                      {
                        action.application
                          .job.company
                      }
                    </span>

                    {action.application
                      .job.location && (
                      <span>
                        {
                          action.application
                            .job.location
                        }
                      </span>
                    )}
                  </div>
                )}

                {action.description && (
                  <p>
                    {action.description}
                  </p>
                )}

                {action.application_url ? (
                  <div className="user-action-required-external-action">
                    <a
                      href={action.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="user-action-required-open-button"
                    >
                      Open Application Page
                    </a>

                    <button
                      type="button"
                      onClick={() => handleComplete(action)}
                      disabled={submittingId === action.id}
                      className="user-action-required-complete-button"
                    >
                      {submittingId === action.id
                        ? "Updating..."
                        : "Mark as Completed"}
                    </button>

                    <span>
                      Finish the remaining steps directly on the employer's site, then mark this item as completed.
                    </span>
                  </div>
                ) : (
                  <div className="user-action-required-form">
                    <p>
                      JobPilot needs additional information from you before it can continue.
                    </p>

                    <button
                      type="button"
                      onClick={() => handleComplete(action)}
                      disabled={submittingId === action.id}
                    >
                      {submittingId === action.id
                        ? "Updating..."
                        : "Mark as Completed"}
                    </button>
                  </div>
                )}

                <p className="user-action-required-date">
                  Created:{" "}
                  {formatDate(
                    action.created_at
                  )}
                </p>
              </div>
            )
          )}
        </div>
      )}

      {completedActions.length >
        0 && (
        <section className="user-completed-actions">
          <h2>
            Recently Completed
          </h2>

          <div className="user-action-required-list">
            {completedActions.map(
              (action) => (
                <div
                  className="user-action-required-card"
                  key={action.id}
                >
                  <div className="user-action-required-header">
                    <div>
                      <span className="user-action-required-type">
                        {formatType(
                          action.type
                        )}
                      </span>

                      <h2>
                        {action.title}
                      </h2>
                    </div>

                    <span className="user-status-success">
                      Completed
                    </span>
                  </div>

                  {action.description && (
                    <p>
                      {action.description}
                    </p>
                  )}

                  <p className="user-action-required-date">
                    Completed:{" "}
                    {formatDate(
                      action.completed_at
                    )}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}