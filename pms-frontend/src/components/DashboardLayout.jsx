import React from "react";
import { Layout, Typography, Row, Col, Card, Avatar } from "antd";
import "../css/DashboardLayout.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function DashboardLayout() {
  return (
    <Layout className="dashboard-layout">
      {/* Header */}
      <Header className="dashboard-header hotel-header">
        <div className="header-left">
          <Text strong className="hotel-header-text">
            Newsletter
          </Text>
          <Text strong className="hotel-header-text">
            Policies
          </Text>
        </div>

        <div className="header-right">
          <Text className="hotel-text-secondary">Resident name</Text>
          <Avatar size={32} className="hotel-avatar">
            1
          </Avatar>
          <Avatar size={32} className="hotel-avatar">
            2
          </Avatar>
          <Avatar size={32} className="hotel-avatar">
            3
          </Avatar>
        </div>
      </Header>

      {/* Content */}
      <Content className="dashboard-content">
        {/* Newsletter Banner */}
        <Card className="newsletter-banner hotel-card">
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
                <Card hoverable className="box-card hotel-card" />
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
              <Card hoverable className="box-card hotel-card balance-card">
                Balance: $1,250
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card hoverable className="box-card hotel-card events-card">
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

          <Card hoverable className="small-card-wide hotel-card">
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

          <Card hoverable className="mid-card hotel-card">
            Mid Card Info
          </Card>
        </section>
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
