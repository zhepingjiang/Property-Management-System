import React from "react";
import { Layout, Typography, Row, Col, Card } from "antd";
import "../../css/dashboard/DashboardLayout.css";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import DashboardTrendingEvents from "./DashboardTrendingEvents";
import DashboardCurrentBalance from "./DashboardCurrentBalance";
import DasboardAmenitiesReserve from "./DashboardAmenitiesReserve";
import DashboardUserfulLinks from "./DashboardUsefulLinks";
import DashboardNewsletter from "./DashboardNewsletter";
import DashboardDiscussion from "./DashboardDiscussion";
import DashboardMaintenance from "./DashboardMaintenance";

const { Content } = Layout;

export default function DashboardLayout({ children, pageTitle, user }) {
  return (
    <Layout className="dashboard-layout">
      {/* Header moved to DashboardHeader component */}
      <DashboardHeader pageTitle={pageTitle} user={user} />

      {/* Content */}
      <Content className="dashboard-content">
        {children ? (
          // render the provided page inside the dashboard content area
          children
        ) : (
          // default dashboard content when no child page is provided
          <>
            {/* Newsletter Banner (click -> newsletter detail) */}
            <DashboardNewsletter />

            {/* Current Balance */}
            <DashboardCurrentBalance />

            {/*discussion*/}
            <DashboardDiscussion />

            {/* Amenities Reserve */}
            <DasboardAmenitiesReserve />

            {/* Trending Events */}
            <DashboardTrendingEvents />

            {/* Maintenance  */}
            <DashboardMaintenance />

            {/* Useful Links */}
            <DashboardUserfulLinks />
          </>
        )}
      </Content>

      {/* Footer */}
      <DashboardFooter />
    </Layout>
  );
}
