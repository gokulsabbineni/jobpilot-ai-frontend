import {
    FormEvent,
    useState,
  } from "react";
  
  import {
    useNavigate,
  } from "react-router-dom";
  
  import { useAuth } from "../../auth/AuthContext";
  
  export default function Login() {
    const navigate = useNavigate();
  
    const { login } = useAuth();
  
    const [email, setEmail] =
      useState("");
  
    const [password, setPassword] =
      useState("");
  
    const [error, setError] =
      useState("");
  
    const [loading, setLoading] =
      useState(false);
  
    async function handleSubmit(
      event: FormEvent
    ) {
      event.preventDefault();
  
      setError("");
      setLoading(true);
  
      try {
        const user =
          await login(
            email,
            password
          );
  
        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Login failed."
        );
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">
            JP
          </div>
  
          <h1>JobPilot AI</h1>
  
          <p>
            Sign in to your account
          </p>
  
          <form
            onSubmit={handleSubmit}
          >
            <label>
              Email
            </label>
  
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="you@example.com"
              required
            />
  
            <label>
              Password
            </label>
  
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="••••••••"
              required
            />
  
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}
  
            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>
  
          <div className="test-account">
            <strong>
              Local test accounts
            </strong>
  
            <div>
              Admin:
              <br />
              admin@jobpilot.ai
              <br />
              Admin@123
            </div>
  
            <div>
              User:
              <br />
              user@jobpilot.ai
              <br />
              User@123
            </div>
          </div>
        </div>
      </div>
    );
  }