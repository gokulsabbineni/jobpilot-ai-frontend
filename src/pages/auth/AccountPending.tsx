import { useAuth } from "../../auth/AuthContext";

export default function AccountPending() {
  const { logout } = useAuth();

  return (
    <main className="pending-page">
      <section className="pending-card" aria-labelledby="pending-title">
        <div className="pending-brand">
          <div className="pending-brand-mark">JP</div>
          <div>
            <strong>JobPilot AI</strong>
            <span>Smart job applications</span>
          </div>
        </div>

        <div className="pending-status-icon" aria-hidden="true">
          <span>✓</span>
        </div>

        <div className="pending-content">
          <span className="pending-eyebrow">ACCOUNT REVIEW</span>
          <h1 id="pending-title">Account Pending</h1>

          <p className="pending-greeting">
            Hi <strong>JobPilot User</strong>
          </p>

          <p className="pending-description">
            Your JobPilot AI account is waiting for administrator approval.
            You’ll be able to use the application once your account has been approved.
          </p>
        </div>

        <div className="pending-info">
          <div className="pending-info-icon">i</div>
          <div>
            <strong>What happens next?</strong>
            <p>
              An administrator will review your account. Once approved, you can
              sign in and start setting up your resume, job preferences, and AI agent.
            </p>
          </div>
        </div>

        <button
          className="pending-login-button"
          type="button"
          onClick={logout}
        >
          Back to Login
        </button>

        <p className="pending-footer">
          Thanks for choosing JobPilot AI.
        </p>
      </section>
    </main>
  );
}
