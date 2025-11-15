import React, { useState } from "react";
import { validateCreateAccount } from "./Validation";
import { fakeCreateAccount } from "./authApi";

export default function CreateAccountModal({
  isOpen,
  onClose,
  onAccountCreated,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "resident",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v = validateCreateAccount(form);
    if (!v.ok) return setErrors(v.errors);

    setLoading(true);

    try {
      const user = await fakeCreateAccount(form);
      onAccountCreated?.(user);
      onClose();
    } catch {
      setErrors({ submit: "Failed to create account" });
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="resident">Resident</option>
            <option value="faculty">Faculty</option>
          </select>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
