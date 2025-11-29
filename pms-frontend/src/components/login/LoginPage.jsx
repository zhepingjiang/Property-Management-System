import React, { useState } from "react";
import "../../css/login/LoginPage.css";
import ForgotPasswordModal from "./ForgotPasswordModal";
import CreateAccountModal from "./CreateAccountModal";
import { login } from "./utils";
import { validateLogin } from "./validation";

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("resident");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateLogin(username, password);
    if (!validation.ok) return setErrors(validation.errors);

    setErrors({});
    setLoading(true);

    try {
      const response = await login({
        username,
        password,
        role: role === "resident" ? "ROLE_RESIDENT" : "ROLE_TRUSTEE",
      });

      // Never pass plaintext password outside LoginPage
      onLoginSuccess?.(response.token, {
        username,
        role: role === "resident" ? "ROLE_RESIDENT" : "ROLE_TRUSTEE",
      });

      setUsername("");
      setPassword("");
    } catch (err) {
      setErrors({ submit: err.message });
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h1>Login</h1>

          <div className="role-selection">
            {["resident", "faculty"].map((r) => (
              <button
                key={r}
                className={`role-btn ${role === r ? "active" : ""}`}
                onClick={() => setRole(r)}
                type="button"
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <div className="result-section">
            <div className="result-label">Role</div>
            <div className="role-display">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({});
              }}
              className={errors.username ? "error" : ""}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({});
              }}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <button
            className={`sign-in-btn ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <button onClick={() => setShowForgot(true)}>Forgot password</button>
          <button onClick={() => setShowCreate(true)}>Create account</button>
        </div>
      </div>

      {/* Modals */}
      <ForgotPasswordModal
        isOpen={showForgot}
        onClose={() => setShowForgot(false)}
      />
      <CreateAccountModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onAccountCreated={onLoginSuccess}
      />
    </div>
  );
}
