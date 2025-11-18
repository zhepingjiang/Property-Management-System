import React from "react";
import { Typography, Row, Col, Card, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardLayout.css";
const { Title } = Typography;

export default function DashboardCurrentBalance() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  return (
    <section className="section">
      <Title level={4} className="hotel-title">
        Current Balance
      </Title>
      <Row gutter={16}>
        <Col xs={24} sm={16}>
          <Card
            hoverable
            className="box-card hotel-card balance-card clickable-card"
            onClick={goTo("/profile")}
          >
            <div className="card-body">
              <div className="card-title">Current Balance</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>$1,250</div>
              <div style={{ marginTop: 8 }}>
                <Tag color="gold">Due Dec 05</Tag>
                <span style={{ marginLeft: 8, color: "#7a6a55" }}>
                  1 invoice pending
                </span>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            className="box-card hotel-card events-card clickable-card"
            onClick={goTo("/amenity/info")}
          >
            <div className="card-body">
              <div className="card-title">Notifications</div>
              <div className="card-sub">3 new</div>
              <div style={{ marginTop: 8 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo("/notifications")();
                  }}
                >
                  View
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  );
}
