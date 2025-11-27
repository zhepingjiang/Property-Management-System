import React from "react";
import { Modal } from "antd";
import PolicyAlerts from "../policies&alerts/PolicyAlerts";

export default function DashboardPopUp({ isOpen, onClose }) {
  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      // 1. CENTERED: This creates the "comfortable margin" vertically
      centered
      // 2. ANIMATION & STYLE: Removes default padding to let CSS handle it
      bodyStyle={{ padding: 0, backgroundColor: "transparent" }}
      // 3. LUXURY BACKDROP: Adds a blur effect to the background
      maskStyle={{
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(90, 70, 50, 0.4)", // Warm brownish tint
      }}
      destroyOnClose
    >
      <PolicyAlerts initialTab="1" onClose={onClose} />
    </Modal>
  );
}
