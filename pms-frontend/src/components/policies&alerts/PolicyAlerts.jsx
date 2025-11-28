import React, { useEffect, useState } from "react";
import { Tabs, Alert, Typography, List, Divider, Button } from "antd"; // Import Button
import {
  InfoCircleOutlined,
  BellOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "../../css/policies&alerts/PolicyAlerts.css";

const { Title, Paragraph, Text } = Typography;

// 1. Accept onClose prop
function PolicyAlerts({ initialTab = "1", onClose }) {
  const [activeKey, setActiveKey] = useState(initialTab);

  useEffect(() => {
    setActiveKey(initialTab);
  }, [initialTab]);

  const activeAlerts = [
    {
      type: "warning",
      message: "Scheduled Power Maintenance",
      description:
        "The main building will undergo electrical maintenance on Nov 28th from 2:00 PM to 4:00 PM.",
      date: "Nov 25, 2025",
    },
    {
      type: "info",
      message: "Pool Area Renovation",
      description: "The North Pool is closed for resurfacing until Dec 1st.",
      date: "Nov 20, 2025",
    },
    {
      type: "error",
      message: "Fire Alarm Testing",
      description:
        "Annual fire alarm testing will occur on Nov 30th. Please do not panic if you hear the alarm.",
      date: "Nov 26, 2025",
    },
  ];

  const AlertsContent = () => (
    <div className="alerts-section">
      <div style={{ marginBottom: 20 }}>
        <Title level={4} className="policy-title" style={{ marginTop: 0 }}>
          Community Alerts
        </Title>
        <Text type="secondary" style={{ fontSize: "1rem" }}>
          Latest announcements and scheduled maintenance for the residence.
        </Text>
      </div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={activeAlerts}
        renderItem={(item) => (
          <List.Item>
            <Alert
              message={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{item.message}</span>
                  <span
                    style={{ fontSize: "12px", color: "#666", marginLeft: 10 }}
                  >
                    {item.date}
                  </span>
                </div>
              }
              description={
                <span style={{ fontSize: "1rem" }}>{item.description}</span>
              }
              type={item.type}
              showIcon
              style={{ borderRadius: "8px", padding: "16px" }}
            />
          </List.Item>
        )}
      />
    </div>
  );

  const PolicyContent = () => (
    <div className="policy-content-body policy-content">
      <Title level={4} className="policy-title" style={{ marginTop: 0 }}>
        Privacy Policy & Terms
      </Title>

      <section>
        <Title level={5}>1. Information We Collect</Title>
        <Paragraph>
          We collect information necessary to provide our services, including
          your name, unit number, contact information (email and phone number),
          and payment details for amenity reservations.
        </Paragraph>
      </section>

      <section>
        <Title level={5}>2. How We Use Your Data</Title>
        <Paragraph>
          Your data is used to facilitate building access, process amenity
          bookings, send important community alerts, and improve overall
          resident experience.
        </Paragraph>
      </section>

      <Divider
        style={{ borderColor: "rgba(185, 150, 87, 0.2)", margin: "30px 0" }}
      />

      <Title
        level={4}
        style={{ color: "#5a4632", fontFamily: '"Cormorant Garamond", serif' }}
      >
        Community Guidelines
      </Title>

      <section>
        <Title level={5}>1. Code of Conduct</Title>
        <Paragraph>
          All residents are expected to treat neighbors and staff with respect.
          Harassment, excessive noise, or misuse of common areas may result in a
          suspension of amenity privileges.
        </Paragraph>
        <ul>
          <li>Quiet hours are strictly enforced from 10:00 PM to 7:00 AM.</li>
          <li>Smoking is prohibited in all common areas and hallways.</li>
        </ul>
      </section>

      <section>
        <Title level={5}>2. Guest Policy</Title>
        <Paragraph>
          Residents are responsible for the behavior of their guests. Guests
          must be accompanied by a resident when using amenities such as the
          pool or gym.
        </Paragraph>
      </section>

      <div className="policy-date">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );

  const items = [
    {
      key: "1",
      label: (
        <span style={{ fontSize: "1.1rem" }}>
          <BellOutlined /> Alerts
        </span>
      ),
      children: <AlertsContent />,
    },
    {
      key: "2",
      label: (
        <span style={{ fontSize: "1.1rem" }}>
          <InfoCircleOutlined /> Policies
        </span>
      ),
      children: <PolicyContent />,
    },
  ];

  return (
    <div className="policy-container">
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        centered
        tabBarStyle={{
          color: "#5a4632",
          fontFamily: '"Cormorant Garamond", serif',
          marginBottom: "30px",
        }}
        items={items}
      />

      {/* --- 2. THE NOTICEABLE BUTTON --- */}
      <div className="close-btn-container">
        <Button className="custom-close-btn" type="primary" onClick={onClose}>
          I Understand
        </Button>
      </div>
    </div>
  );
}

export default PolicyAlerts;
