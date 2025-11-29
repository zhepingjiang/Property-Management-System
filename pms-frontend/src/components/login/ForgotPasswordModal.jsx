import React, { useState } from "react";
import { Modal, Input, Button } from "antd"; // Switch to Ant Design components
import "../../css/login/ForgotPasswordModal.css"; // Import the styles

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Keeps your original logic exactly the same
  const handleSubmit = async () => {
    if (!email) return; // Basic check
    setLoading(true);

    await new Promise((res) => setTimeout(res, 1000));
    setMsg("Reset link sent!");

    setTimeout(() => {
      onClose();
      setMsg("");
      setEmail("");
    }, 1500);

    setLoading(false);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Reset Password"
      centered
      className="forgot-password-modal" // Applies our custom CSS
      width={500}
    >
      {/* Instructions */}
      <p className="instruction-text">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      {/* Input Field */}
      <Input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        onPressEnter={handleSubmit} // Allows pressing Enter key
      />

      {/* Success Message */}
      {msg && <div className="success-message">{msg}</div>}

      {/* Action Buttons */}
      <div className="forgot-password-actions">
        <Button onClick={onClose} className="btn-cancel">
          Cancel
        </Button>
        <Button
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          className="btn-send"
        >
          Send Reset Link
        </Button>
      </div>
    </Modal>
  );
}
