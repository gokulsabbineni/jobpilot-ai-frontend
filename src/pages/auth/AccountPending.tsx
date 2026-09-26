import { useAuth } from "../../auth/AuthContext";

export default function AccountPending() {
  const { user, logout } =
    useAuth();

  return (
    <div className="pending-page">
      <div className="pending-card">
        <div className="pending-icon">
          ⏳
        </div>

        <h1>
          Account Pending Approval
        </h1>

        <p>
          Hi {user?.name}, your
          JobPilot AI account has been
          submitted successfully.
        </p>

        <p>
          An administrator needs to
          approve your account before
          you can use the application.
        </p>

        <button
          onClick={logout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}