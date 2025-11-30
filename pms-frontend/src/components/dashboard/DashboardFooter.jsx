import React from "react";
import "../../css/dashboard/DashboardLayout.css";
import "../../css/dashboard/DashboardFooter.css";
import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

export default function DashboardFooter() {
  return (
    <Footer className="dashboard-footer">
      <div className="footer-content">
        <Text className="info-text">Address: 1234 ABC, DEFG, CA 12345</Text>

        <Text className="info-text">
          Concierge Office Hours: 9:00 AM - 6:00 PM
        </Text>

        <div style={{ marginTop: "20px", opacity: 0.8 }}>
          <Text className="info-text" style={{ fontSize: "0.95rem" }}>
            © 2025 Property Management. All Rights Reserved.
          </Text>
          <Text className="info-text" style={{ fontSize: "0.95rem" }}>
            Privacy Policy | Accessibility
          </Text>
        </div>
      </div>
    </Footer>
  );
}
