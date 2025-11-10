import React, { useState } from "react";
import "../css/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Login - Resident</h1>
          <div className="result-section">
            <div className="result-label">Result</div>
            <div className="resident-label">Resident</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="sign-in-btn">
            Sign in
          </button>
        </form>

        <div className="login-footer">
          <a href="/forgot-password" className="forgot-password">
            Forget password
          </a>
          <a href="/create-account" className="create-account">
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
