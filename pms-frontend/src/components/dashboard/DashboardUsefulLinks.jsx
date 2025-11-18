import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardUsefulLinks.css";

const { Title } = Typography;

export default function DashboardUsefulLinks() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  const links = [
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
  ];

  return (
    <section className="useful-links-section">
      <Title level={4} className="useful-links-title">
        Useful Links
      </Title>

      <Row gutter={[16, 16]} className="links-row">
        {links.map((link, idx) => (
          <Col xs={24} sm={12} md={6} key={idx}>
            <Card
              hoverable
              className="link-card hotel-card"
              onClick={() => window.open(link.href, "_blank")}
            >
              <div className="link-card-body">
                <div className="link-card-title">{link.title}</div>
                <div className="link-card-sub">{link.sub}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
