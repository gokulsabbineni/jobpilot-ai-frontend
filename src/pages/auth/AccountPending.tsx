import { useAuth } from "../../auth/AuthContext";

export default function AccountPending() {
  const { user, logout } = useAuth();

  const fullName = user
    ? `${user.first_name} ${user.last_name}`.trim()
    : "there";

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Account Pending</h1>

        <p>
          Hi {fullName}, your JobPilot AI
          account is waiting for administrator
          approval.
        </p>

        <p>
          You will be able to use the
          application after your account has
          been approved.
        </p>

        <button
          type="button"
          onClick={logout}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}