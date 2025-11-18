import React from "react";
import "../../css/dashboard/DashboardLayout.css";
import "../../css/dashboard/DashboardFooter.css";
import { Layout } from "antd";
import { Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

export default function DashboardFooter() {
  return (
    <Footer className="dashboard-footer hotel-footer">
      <Text className="info-text hotel-text-secondary">
        Address: ### abcded St, City, Country
        <br />
        Biz Service Office Hour: 9:00 AM - 6:00 PM
      </Text>

      <Text className="info-text hotel-text-secondary">
        © 2025 Privacy & Policy. View our Accessibility
      </Text>
    </Footer>
  );
}
