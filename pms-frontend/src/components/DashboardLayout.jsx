import React from "react";
import { Layout, Typography, Row, Col, Card, Avatar, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../css/DashboardLayout.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function DashboardLayout({ children, pageTitle, user }) {
  const navigate = useNavigate();

  const goTo = (path) => () => navigate(path);

  const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return "U";
    const parts = nameOrEmail.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  return (
    <Layout className="dashboard-layout">
      {/* Header */}
      <Header className="dashboard-header hotel-header">
        <div className="header-left">
          {/* Home button */}
          <Button
            type="link"
            icon={<HomeOutlined />}
            className="home-btn"
            onClick={goTo("/dashboard")}
          />

          {/* left nav items (kept small) */}
          <Text strong className="hotel-header-text">
            Newsletter
          </Text>
          <Text strong className="hotel-header-text">
            Policies
          </Text>
        </div>

        {/* Page title shows the active page when provided */}
        <div className="header-title">
          <Text className="hotel-page-title">{pageTitle || "Dashboard"}</Text>
        </div>

        <div className="header-right">
          <div className="header-user" onClick={goTo("/profile")}>
            <Text className="hotel-text-secondary">
              {user?.name || user?.email || "Resident name"}
            </Text>
            <Avatar size={32} className="hotel-avatar">
              {getInitials(user?.name || user?.email)}
            </Avatar>
          </div>
        </div>
      </Header>

      {/* Content */}
      <Content className="dashboard-content">
        {children ? (
          // render the provided page inside the dashboard content area
          children
        ) : (
          // default dashboard content when no child page is provided
          <>
            {/* Newsletter Banner (click -> newsletter detail) */}
            <Card
              className="newsletter-banner hotel-card clickable-card"
              onClick={goTo("/newsletter/1")}
            >
              <Text className="newsletter-text hotel-text">
                Newsletter section to send out updates regarding the community,
                living environment, and policies.
              </Text>
            </Card>

            {/* Trending Events */}
            <section className="section">
              <Title level={4} className="hotel-title">
                Trending Events
              </Title>
              <Row gutter={16}>
                {[1, 2, 3].map((i) => (
                  <Col xs={24} sm={8} key={i}>
                    <Card
                      hoverable
                      className="box-card hotel-card clickable-card"
                      // map events -> amenity info for now
                      onClick={goTo("/amenity/info")}
                    />
                  </Col>
                ))}
              </Row>
            </section>

            {/* Current Balance */}
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
                    Balance: $1,250
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card
                    hoverable
                    className="box-card hotel-card events-card clickable-card"
                    onClick={goTo("/amenity/info")}
                  >
                    Events: 3 upcoming
                  </Card>
                </Col>
              </Row>
            </section>

            {/* Amenities Reserve */}
            <section className="section">
              <Title level={4} className="hotel-title">
                Amenities Reserve
              </Title>
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Card hoverable className="box-card hotel-card survey-card">
                    Survey 1
                  </Card>
                </Col>
                <Col xs={24} sm={16}>
                  <Card hoverable className="box-card hotel-card survey-card">
                    Survey 2
                  </Card>
                </Col>
              </Row>

              <Card
                hoverable
                className="small-card-wide hotel-card clickable-card"
                onClick={goTo("/amenity/info")}
              >
                Large Amenity Info
              </Card>

              <Row gutter={16} className="small-row">
                {[1, 2, 3].map((i) => (
                  <Col xs={8} key={i}>
                    <Card hoverable className="small-card hotel-card">
                      Small Card {i}
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>

            {/* Useful Links */}
            <section className="section">
              <Title level={4} className="hotel-title">
                Useful Links
              </Title>
              <Row gutter={16}>
                {[1, 2, 3, 4].map((i) => (
                  <Col xs={12} sm={6} key={i}>
                    <Card hoverable className="link-card hotel-card">
                      Link {i}
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card
                hoverable
                className="mid-card hotel-card clickable-card"
                onClick={goTo("/amenity/reserve")}
              >
                Mid Card Info
              </Card>
            </section>
          </>
        )}
      </Content>

      {/* Footer */}
      <Footer className="dashboard-footer hotel-footer">
        <Text className="info-text hotel-text-secondary">
          Address: 123 Luxury St, City, Country
          <br />
          Biz Service Office Hour: 9:00 AM - 6:00 PM
        </Text>

        <Text className="info-text hotel-text-secondary">
          © 2025 Privacy & Policy. View our Accessibility
        </Text>
      </Footer>
    </Layout>
  );
}
