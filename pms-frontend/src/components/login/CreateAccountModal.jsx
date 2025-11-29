import React, { useState } from "react";
import { validateCreateAccount } from "./validation";
import { register } from "./utils";
import { Modal, Form, Row, Col, Input, Select, Button } from "antd";
import "../../css/login/CreateAccountModal.css";

export default function CreateAccountModal({
  isOpen,
  onClose,
  onAccountCreated,
}) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "ROLE_RESIDENT",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Optional: Clear error for this field as soon as they type
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async () => {
    const v = validateCreateAccount(form);
    if (!v.ok) return setErrors(v.errors);

    setLoading(true);

    const requestBody = {
      username: form.username,
      password: form.password,
      email: form.email,
      role: form.role,
    };

    try {
      await register(requestBody);
      onClose();
    } catch (error) {
      setErrors({ submit: "Failed to create account" });
    }

    setLoading(false);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Create Account"
      centered
      className="create-account-modal"
      width={600}
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Username"
              required
              // 👇 ADDED ERROR DISPLAY PROPS
              validateStatus={errors.username ? "error" : ""}
              help={errors.username}
            >
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email"
              required
              // 👇 ADDED ERROR DISPLAY PROPS
              validateStatus={errors.email ? "error" : ""}
              help={errors.email}
            >
              <Input name="email" value={form.email} onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Password"
              required
              // 👇 ADDED ERROR DISPLAY PROPS
              validateStatus={errors.password ? "error" : ""}
              help={errors.password}
            >
              <Input.Password
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Confirm Password"
              required
              // 👇 ADDED ERROR DISPLAY PROPS
              validateStatus={errors.confirmPassword ? "error" : ""}
              help={errors.confirmPassword}
            >
              <Input.Password
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Role" required>
          <Select
            name="role"
            value={form.role}
            onChange={(val) => setForm({ ...form, role: val })}
          >
            <Select.Option value="ROLE_RESIDENT">Resident</Select.Option>
            <Select.Option value="ROLE_TRUSTEE">Faculty</Select.Option>
          </Select>
        </Form.Item>

        {errors.submit && <div className="error-text">{errors.submit}</div>}

        <div
          className="create-account-actions"
          style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}
        >
          <Button onClick={onClose} className="btn-cancel">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="btn-create"
          >
            Create Account
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
