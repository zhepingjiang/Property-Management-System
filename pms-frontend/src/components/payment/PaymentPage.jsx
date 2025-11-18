import React, { useState } from "react";
import {
  Typography,
  Card,
  Input,
  Select,
  Button,
  Tag,
  Row,
  Col,
  message,
} from "antd";
import {
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../../css/payment/PaymentPage.css";

const { Title } = Typography;
const { Option } = Select;

export default function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Credit Card");
  const [loading, setLoading] = useState(false);

  const currentBalance = 1250;

  const [recentPayments, setRecentPayments] = useState([
    { id: 1, amount: 200, method: "Credit Card", status: "Paid" },
    { id: 2, amount: 450, method: "Debit Card", status: "Pending" },
    { id: 3, amount: 150, method: "Bank Transfer", status: "Failed" },
    { id: 4, amount: 300, method: "Credit Card", status: "Paid" },
    { id: 5, amount: 50, method: "Bank Transfer", status: "Pending" },
  ]);

  const handlePay = () => {
    if (!amount || Number(amount) <= 0) {
      message.error("Please enter a valid amount.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      message.success(`Payment of $${amount} via ${method} successful!`);
      setRecentPayments((prev) => [
        { id: prev.length + 1, amount: Number(amount), method, status: "Paid" },
        ...prev,
      ]);
      setAmount("");
      setLoading(false);
    }, 1000);
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "Paid":
        return (
          <Tag icon={<CheckCircleOutlined />} color="#b9965b">
            {status}
          </Tag>
        );
      case "Pending":
        return (
          <Tag icon={<ClockCircleOutlined />} color="#f0ad4e">
            {status}
          </Tag>
        );
      case "Failed":
        return (
          <Tag icon={<CloseCircleOutlined />} color="#d9534f">
            {status}
          </Tag>
        );
      default:
        return <Tag>{status}</Tag>;
    }
  };

  return (
    <div className="payment-page">
      <Title level={2} className="payment-title">
        Payments Page
      </Title>

      <Row gutter={24} align="top">
        {/* Left column: Recent Payments */}
        <Col xs={24} sm={12}>
          <Card className="recent-payments-card hotel-card">
            <Title level={3} className="recent-payments-title">
              Recent Payments
            </Title>
            <div className="recent-payments-list">
              {recentPayments.map((payment) => (
                <Row
                  key={payment.id}
                  className="recent-payment-row"
                  gutter={16}
                  align="middle"
                >
                  <Col xs={12} sm={8}>
                    <span className="recent-payment-amount">
                      ${payment.amount}
                    </span>
                  </Col>
                  <Col xs={12} sm={8}>
                    <span className="recent-payment-method">
                      {payment.method}
                    </span>
                  </Col>
                  <Col xs={24} sm={8}>
                    {getStatusTag(payment.status)}
                  </Col>
                </Row>
              ))}
            </div>
          </Card>
        </Col>

        {/* Right column: Payment Form */}
        <Col xs={24} sm={12}>
          <Card className="payment-form-card hotel-card">
            <div className="payment-form">
              <Card className="payment-balance-card hotel-card">
                <div className="balance-info">
                  <DollarOutlined className="balance-icon" />
                  <span className="balance-text">
                    Current Balance: ${currentBalance.toLocaleString()}
                  </span>
                </div>
              </Card>

              <label className="payment-label">Amount</label>
              <Input
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                size="large"
              />

              <label className="payment-label">Payment Method</label>
              <Select
                value={method}
                onChange={(value) => setMethod(value)}
                style={{ width: "100%" }}
                size="large"
              >
                <Option value="Credit Card">Credit Card</Option>
                <Option value="Debit Card">Debit Card</Option>
                <Option value="Bank Transfer">Bank Transfer</Option>
              </Select>

              <Button
                className="pay-btn"
                onClick={handlePay}
                loading={loading}
                disabled={loading}
                size="large"
              >
                Pay Now
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
