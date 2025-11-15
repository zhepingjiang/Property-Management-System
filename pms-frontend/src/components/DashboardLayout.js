import React from "react";
import { Layout, Typography, Row, Col, Card, Avatar } from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function DashboardLayout() {
  return (
    <Layout style={{ background: "#f7f9fc" }}>
      {/* Modern Header */}
      <Header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "32px", fontWeight: 600 }}>
          <Text strong>Newsletter</Text>
          <Text strong>Policies</Text>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Text type="secondary">resident name</Text>
          <Avatar size={24} style={{ backgroundColor: "#d1d5db" }} />
          <Avatar size={24} style={{ backgroundColor: "#d1d5db" }} />
          <Avatar size={24} style={{ backgroundColor: "#d1d5db" }} />
        </div>
      </Header>

      <Content
        style={{ padding: "40px 40px", maxWidth: 1200, margin: "0 auto" }}
      >
        {/* Newsletter Banner */}
        <Card
          style={{
            width: "100%",
            height: 220,
            borderRadius: 12,
            background: "linear-gradient(135deg, #e2e8f0, #ffffff)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ maxWidth: 600, textAlign: "center", color: "#374151" }}
          >
            Newsletter section to send out updates regarding the community,
            living environment, and policies.
          </Text>
        </Card>

        {/* Trending Events */}
        <section style={{ marginTop: 50 }}>
          <Title level={4}>Trending Events</Title>
          <Row gutter={16}>
            {[1, 2, 3].map((i) => (
              <Col xs={24} sm={8} key={i}>
                <Card
                  hoverable
                  style={{
                    height: 180,
                    borderRadius: 12,
                    border: "1.5px solid #cbd5e1",
                  }}
                />
              </Col>
            ))}
          </Row>
        </section>

        {/* Current Balance */}
        <section style={{ marginTop: 50 }}>
          <Title level={4}>Current Balance</Title>
          <Row gutter={16}>
            <Col xs={24} sm={16}>
              <Card
                hoverable
                style={{
                  height: 180,
                  borderRadius: 12,
                  border: "1.5px solid #cbd5e1",
                }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Card
                hoverable
                style={{
                  height: 180,
                  borderRadius: 12,
                  border: "1.5px solid #cbd5e1",
                }}
              />
            </Col>
          </Row>
        </section>

        {/* Amenities Reserve */}
        <section style={{ marginTop: 50 }}>
          <Title level={4}>Amenities Reserve</Title>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Card
                hoverable
                style={{
                  height: 180,
                  borderRadius: 12,
                  border: "1.5px solid #cbd5e1",
                }}
              />
            </Col>
            <Col xs={24} sm={16}>
              <Card
                hoverable
                style={{
                  height: 180,
                  borderRadius: 12,
                  border: "1.5px solid #cbd5e1",
                }}
              />
            </Col>
          </Row>

          <Card
            hoverable
            style={{
              width: "100%",
              height: 110,
              marginTop: 20,
              borderRadius: 12,
              border: "1.5px solid #cbd5e1",
            }}
          />

          <Row gutter={16} style={{ marginTop: 20, width: "50%" }}>
            {[1, 2, 3].map((i) => (
              <Col xs={8} key={i}>
                <Card
                  hoverable
                  style={{
                    height: 70,
                    borderRadius: 12,
                    border: "1.5px solid #cbd5e1",
                  }}
                />
              </Col>
            ))}
          </Row>
        </section>

        {/* Useful Links */}
        <section style={{ marginTop: 50, marginBottom: 70 }}>
          <Title level={4}>Useful Links</Title>
          <Row gutter={16}>
            {[1, 2, 3, 4].map((i) => (
              <Col xs={12} sm={6} key={i}>
                <Card
                  hoverable
                  style={{
                    height: 50,
                    borderRadius: 10,
                    border: "1px solid #cbd5e1",
                  }}
                />
              </Col>
            ))}
          </Row>

          <Card
            hoverable
            style={{
              width: "35%",
              height: 70,
              marginTop: 24,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />

          <Text
            type="secondary"
            style={{
              display: "block",
              marginTop: 20,
              border: "1.5px solid #cbd5e1",
              textAlign: "center",
            }}
          >
            Address: xxxxx, xxxxx, xxxxxxx, xxxxxxx
            <br />
            Biz Service Office Hour: xxxxx - xxxxx
          </Text>

          <Text
            type="secondary"
            style={{
              display: "block",
              marginTop: 8,
              border: "1.5px solid #cbd5e1",
              textAlign: "center",
            }}
          >
            © 2025 Privacy & Policy. View our Accessibility
          </Text>
        </section>
      </Content>
    </Layout>
  );
}
