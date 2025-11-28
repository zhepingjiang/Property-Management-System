import React, { useState, useEffect } from "react";
import { Layout, Modal, Button } from "antd";
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
import DashboardPopup from "./DashboardPopUp";

const { Content } = Layout;

export default function DashboardLayout({ children, pageTitle, user }) {
  //  STATE: This controls the popup for everyone
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // AUTO-OPEN: Trigger it when the layout loads
  useEffect(() => {
    setIsPopupOpen(true);
  }, []);

  return (
    <Layout className="dashboard-layout">
      {/* Header moved to DashboardHeader component */}
      <DashboardHeader
        pageTitle={pageTitle}
        user={user}
        onPopUpClick={() => setIsPopupOpen(true)}
      />

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

        {/* The Modal Component */}
        <DashboardPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      </Content>

      {/* Footer */}
      <DashboardFooter />
    </Layout>
  );
}
