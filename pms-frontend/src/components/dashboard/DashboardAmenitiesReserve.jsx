import React from "react";
import { Layout, Typography, Row, Col, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardLayout.css";
const { Title } = Typography;

export default function DashboardAmenitiesReserve() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  return (
    <section className="section">
      <Title level={4} className="hotel-title">
        Amenities Reserve
      </Title>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Card hoverable className="box-card hotel-card survey-card">
            <div className="card-body">
              <div className="card-title">Quick Survey</div>
              <div className="card-sub">Tell us about the new gym hours</div>
              <div style={{ marginTop: 8 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo("/survey/1")();
                  }}
                >
                  Take Survey
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={16}>
          <Card hoverable className="box-card hotel-card survey-card">
            <div className="card-body">
              <div className="card-title">Community Vote</div>
              <div className="card-sub">Help choose holiday decorations</div>
              <div style={{ marginTop: 8 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo("/survey/2")();
                  }}
                >
                  Vote Now
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        hoverable
        className="small-card-wide hotel-card clickable-card"
        onClick={goTo("/amenity/info")}
      >
        <div className="card-body">
          <div className="card-title">Pool & Rooftop</div>
          <div className="card-sub">Swim, relax, and enjoy city views</div>
          <div style={{ marginTop: 8 }}>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                goTo("/amenity/info")();
              }}
            >
              See Details
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
