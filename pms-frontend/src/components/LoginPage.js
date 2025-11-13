import React, { useState } from "react";
import "../css/LoginPage.css";

const LoginPage = ({ onLoginSuccess, onForgotPassword, onCreateAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("resident");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      console.log("Login attempt:", { email, password, role: selectedRole });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create user data object
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: selectedRole === "resident" ? "John Resident" : "Jane Faculty",
        email: email,
        role: selectedRole,
        unit: selectedRole === "resident" ? "A-101" : "Faculty Wing",
      };

      console.log("Login successful, calling onLoginSuccess:", userData);

      // ✅ THIS IS THE KEY FIX - Call the prop function to notify parent
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      } else {
        alert(`Successfully logged in as ${selectedRole}`);
      }

      // Reset form
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleForgotPasswordClick = () => {
    if (onForgotPassword) {
      onForgotPassword();
    } else {
      alert("Forgot password functionality would go here");
    }
  };

  const handleCreateAccountClick = () => {
    if (onCreateAccount) {
      onCreateAccount();
    } else {
      alert("Create account functionality would go here");
    }
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
              aria-pressed={selectedRole === "resident"}
            >
              Resident
            </button>
            <button
              className={`role-btn ${
                selectedRole === "faculty" ? "active" : ""
              }`}
              onClick={() => setSelectedRole("faculty")}
              type="button"
              aria-pressed={selectedRole === "faculty"}
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

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
              required
              disabled={isLoading}
              className={errors.email ? "error" : ""}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message">
                {errors.email}
              </span>
            )}
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
              onChange={(e) => {
                setPassword(e.target.value);
                clearError("password");
              }}
              required
              disabled={isLoading}
              className={errors.password ? "error" : ""}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <span id="password-error" className="error-message">
                {errors.password}
              </span>
            )}
          </div>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <button
            type="submit"
            className={`sign-in-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="login-footer">
          <button
            className="forgot-password"
            onClick={handleForgotPasswordClick}
            disabled={isLoading}
            type="button"
          >
            Forget password
          </button>
          <button
            className="create-account"
            onClick={handleCreateAccountClick}
            disabled={isLoading}
            type="button"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Your other components (ForgotPasswordModal, CreateAccountModal, UserProfile) remain the same...
export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("Password reset instructions sent to your email");
      setTimeout(() => {
        onClose();
        setMessage("");
        setResetEmail("");
      }, 2000);
    } catch (error) {
      setMessage("Failed to send reset instructions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Reset Password</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <form onSubmit={handleResetSubmit}>
          <div className="form-group">
            <label htmlFor="reset-email">Email</label>
            <input
              id="reset-email"
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {message && (
            <div
              className={`message ${
                message.includes("Failed") ? "error" : "success"
              }`}
            >
              {message}
            </div>
          )}
          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CreateAccountModal = ({ isOpen, onClose, onAccountCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "resident",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("Account creation:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create user data object
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        unit: formData.role === "resident" ? "A-101" : "Faculty Wing",
      };

      // Call the callback if provided
      if (onAccountCreated) {
        onAccountCreated(userData);
      } else {
        alert("Account created successfully!");
      }

      onClose();
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "resident",
      });
    } catch (error) {
      console.error("Account creation error:", error);
      setErrors({ submit: "Failed to create account. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Account</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <form onSubmit={handleCreateAccount}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UserProfile = ({ user, onLogout }) => {
  return (
    <div className="user-profile">
      <h2>Welcome, {user.name}!</h2>
      <p>Role: {user.role}</p>
      <p>Email: {user.email}</p>
      {user.unit && <p>Unit: {user.unit}</p>}
      <button onClick={onLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default LoginPage;
