import React from "react";
import { Row, Col, Card, Typography, List } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardUsefulLinks.css";

const { Title, Text } = Typography;

export default function DashboardUsefulLinks() {
  const navigate = useNavigate();

  // Data Structure: Groups with Sub-links
  const linkGroups = [
    {
      title: "Community",
      links: [
        { label: "Bylaws & Rules", path: "/policies" }, // Example paths
        { label: "Amenities", path: "/amenities" },
        { label: "Parking Policies", path: "/policies/parking" },
      ],
    },
    {
      title: "Resident Services",
      links: [
        { label: "Maintenance Requests", path: "/maintenance" },
        { label: "Booking Guide", path: "/booking-guide" },
        { label: "Visitor Registration", path: "/visitors" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Office", path: "/contact" },
        { label: "FAQ", path: "/faq" },
        { label: "Report Website Issue", path: "/report-issue" },
      ],
    },
  ];

  const handleLinkClick = (path) => {
    // You can add logic here to check if it's an external link or internal route
    if (path.startsWith("http")) {
      window.open(path, "_blank");
    } else {
      navigate(path);
    }
  };

  return (
    <section className="useful-links-section">
      <Title level={4} className="useful-links-title">
        Useful Links
      </Title>

      <Row gutter={[24, 24]} className="links-row">
        {linkGroups.map((group, idx) => (
          <Col xs={24} sm={24} md={8} key={idx}>
            <Card
              className="link-group-card hotel-card"
              title={<span className="link-group-title">{group.title}</span>}
              bordered={false}
            >
              <List
                dataSource={group.links}
                split={false}
                renderItem={(item) => (
                  <List.Item
                    className="link-list-item"
                    onClick={() => handleLinkClick(item.path)}
                  >
                    <Text className="link-item-text">{item.label}</Text>
                    <RightOutlined className="link-arrow" />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
