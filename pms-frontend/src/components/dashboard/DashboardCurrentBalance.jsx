import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Card, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardCurrentBalance.css";

const { Title } = Typography;

export default function DashboardCurrentBalance() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  // Animated balance state
  const [balance, setBalance] = useState(0);
  const targetBalance = 1250;

  useEffect(() => {
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const duration = 1000; // 1 second animation
      const current = Math.min(
        Math.floor((progress / duration) * targetBalance),
        targetBalance
      );
      setBalance(current);
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="balance-section">
      <Title level={4} className="balance-title">
        Current Balance
      </Title>

      <Row gutter={16}>
        <Col xs={24} sm={16}>
          <Card
            hoverable
            className="balance-card hotel-card clickable-card"
            onClick={goTo("/payment")}
          >
            <div className="balance-card-body">
              <div className="balance-amount">${balance.toLocaleString()}</div>
              <div className="balance-meta">
                <Tag color="#b9965b">Due Dec 05</Tag>
                <span className="balance-invoice">1 invoice pending</span>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card
            hoverable
            className="payment-card hotel-card clickable-card"
            onClick={goTo("/payment")}
          >
            <div className="payment-card-body">
              <div className="payment-card-label">Make Payment</div>
              <Button
                className="payment-btn"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo("/payment")();
                }}
              >
                View
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  );
}
