import React from "react";
import { Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardLayout.css";
import { Typography } from "antd";

const { Title } = Typography;

export default function DashboardUserfulLinks() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  return (
    <section className="section">
      <Title level={4} className="hotel-title">
        Useful Links
      </Title>
      <Row gutter={16}>
        {[
          {
            title: "Resident Portal",
            sub: "Account & payments",
            href: "https://learning.laioffer.com/",
          },
          {
            title: "Policies",
            sub: "Community rules",
            href: "https://learning.laioffer.com/",
          },
          {
            title: "Local Services",
            sub: "Recommended vendors",
            href: "https://learning.laioffer.com/",
          },
          {
            title: "Help Center",
            sub: "FAQs & support",
            href: "https://learning.laioffer.com/",
          },
        ].map((link, idx) => (
          <Col xs={12} sm={6} key={idx}>
            <Card
              hoverable
              className="link-card hotel-card"
              onClick={() => window.open(link.href, "_blank")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <div className="card-title">{link.title}</div>
                <div className="card-sub">{link.sub}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card
        hoverable
        className="mid-card hotel-card clickable-card"
        onClick={goTo("/amenity/reserve")}
      >
        <div className="card-body">
          <div className="card-title">Reserve an Amenity</div>
          <div className="card-sub">Check availability & book</div>
        </div>
      </Card>
    </section>
  );
}
