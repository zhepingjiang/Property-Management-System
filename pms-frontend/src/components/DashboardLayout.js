import React from "react";
import { Layout, Typography, Row, Col, Card, Avatar } from "antd";
import "../css/DashboardLayout.css";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function DashboardLayout() {
  return (
    <Layout className="dashboard-layout">
      {/* Header */}
      <Header className="dashboard-header">
        <div className="header-left">
          <Text strong>Newsletter</Text>
          <Text strong>Policies</Text>
        </div>

        <div className="header-right">
          <Text type="secondary">resident name</Text>
          <Avatar size={24} className="header-avatar" />
          <Avatar size={24} className="header-avatar" />
          <Avatar size={24} className="header-avatar" />
        </div>
      </Header>

      <Content className="dashboard-content">
        {/* Newsletter Banner */}
        <Card className="newsletter-banner">
          <Text className="newsletter-text">
            Newsletter section to send out updates regarding the community,
            living environment, and policies.
          </Text>
        </Card>

        {/* Trending Events */}
        <section className="section">
          <Title level={4}>Trending Events</Title>
          <Row gutter={16}>
            {[1, 2, 3].map((i) => (
              <Col xs={24} sm={8} key={i}>
                <Card hoverable className="box-card" />
              </Col>
            ))}
          </Row>
        </section>

        {/* Current Balance */}
        <section className="section">
          <Title level={4}>Current Balance</Title>
          <Row gutter={16}>
            <Col xs={24} sm={16}>
              <Card hoverable className="box-card" />
            </Col>
            <Col xs={24} sm={8}>
              <Card hoverable className="box-card" />
            </Col>
          </Row>
        </section>

        {/* Amenities Reserve */}
        <section className="section">
          <Title level={4}>Amenities Reserve</Title>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Card hoverable className="box-card" />
            </Col>
            <Col xs={24} sm={16}>
              <Card hoverable className="box-card" />
            </Col>
          </Row>

          <Card hoverable className="small-card-wide" />

          <Row gutter={16} className="small-row">
            {[1, 2, 3].map((i) => (
              <Col xs={8} key={i}>
                <Card hoverable className="small-card" />
              </Col>
            ))}
          </Row>
        </section>

        {/* Useful Links */}
        <section className="section">
          <Title level={4}>Useful Links</Title>
          <Row gutter={16}>
            {[1, 2, 3, 4].map((i) => (
              <Col xs={12} sm={6} key={i}>
                <Card hoverable className="link-card" />
              </Col>
            ))}
          </Row>

          <Card hoverable className="mid-card" />

          <Text type="secondary" className="info-text">
            Address: xxxxx, xxxxx, xxxxxxx, xxxxxxx
            <br />
            Biz Service Office Hour: xxxxx - xxxxx
          </Text>

          <Text type="secondary" className="info-text">
            © 2025 Privacy & Policy. View our Accessibility
          </Text>
        </section>
      </Content>
    </Layout>
  );
}
