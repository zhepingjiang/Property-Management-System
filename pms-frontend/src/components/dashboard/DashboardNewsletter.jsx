import React from "react";
import { Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardLayout.css";
import "../../css/dashboard/DashboardNewsletter.css";
const { Text } = Typography;

export default function DashboardNewsletter() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  return (
    <Card
      className="newsletter-banner hotel-card clickable-card"
      onClick={goTo("/newsletter/1")}
    >
      <Text className="newsletter-text hotel-text">
        Newsletter section to send out updates regarding the community, living
        environment, and policies.
      </Text>
    </Card>
  );
}
