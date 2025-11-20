import React, { useState } from "react";
import { validateCreateAccount } from "./Validation";
import { register } from "./utils";
import { Modal, Form, Row, Col, Input, Select, Button } from "antd";

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
    setErrors({});
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
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Username" required>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Email" required>
              <Input name="email" value={form.email} onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Password" required>
              <Input.Password
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Confirm Password" required>
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

        {errors.submit && (
          <div style={{ color: "red", marginBottom: 12 }}>{errors.submit}</div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Account
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
