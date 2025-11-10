import React, { useState } from "react";
import "../css/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("resident");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    try {
      console.log("Login attempt:", { email, password, role: selectedRole });
      // Add your actual authentication logic here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`Successfully logged in as ${selectedRole}`);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Add forgot password logic
    alert("Forgot password functionality would go here");
  };

  const handleCreateAccount = () => {
    // Add create account logic
    alert("Create account functionality would go here");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Login</h1>
          <div className="role-selection">
            <button
              className={`role-btn ${
                selectedRole === "resident" ? "active" : ""
              }`}
              onClick={() => setSelectedRole("resident")}
              type="button"
            >
              Resident
            </button>
            <button
              className={`role-btn ${
                selectedRole === "faculty" ? "active" : ""
              }`}
              onClick={() => setSelectedRole("faculty")}
              type="button"
            >
              Faculty
            </button>
          </div>

          <div className="result-section">
            <div className="result-label">Result</div>
            <div className="role-display">
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`sign-in-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="login-footer">
          <button
            className="forgot-password"
            onClick={handleForgotPassword}
            disabled={isLoading}
          >
            Forget password
          </button>
          <button
            className="create-account"
            onClick={handleCreateAccount}
            disabled={isLoading}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Additional functional components for different parts of the application

export const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>Welcome, {user.name}!</h2>
      <p>Role: {user.role}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [resetEmail, setResetEmail] = useState("");

  const handleResetSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic
    console.log("Password reset requested for:", resetEmail);
    alert("Password reset instructions sent to your email");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Send Reset Link</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CreateAccountModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "resident",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Handle account creation logic
    console.log("Account creation:", formData);
    alert("Account created successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Account</h2>
        <form onSubmit={handleCreateAccount}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="resident">Resident</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
