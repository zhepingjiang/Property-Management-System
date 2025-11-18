import React from "react";
import { Card, Typography, Button, Avatar, Tag } from "antd";
import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardMaintenance.css";

const { Title, Text } = Typography;

export default function DashboardMaintenance() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  const maintenances = [
    {
      title: "Elevator Inspection",
      status: "Scheduled",
      priority: "High",
      lastUpdate: "Nov 15, 2:00 PM",
      iconColor: "#e6b95a",
      path: "/maintenance/1",
    },
    {
      title: "Pool Cleaning",
      status: "In Progress",
      priority: "Medium",
      lastUpdate: "Nov 16, 10:30 AM",
      iconColor: "#b9965b",
      path: "/maintenance/2",
    },
    {
      title: "Lobby Lighting Fix",
      status: "Pending",
      priority: "Low",
      lastUpdate: "Nov 14, 5:45 PM",
      iconColor: "#d9a24c",
      path: "/maintenance/3",
    },
    {
      title: "Rooftop AC Service",
      status: "Completed",
      priority: "Medium",
      lastUpdate: "Nov 12, 11:20 AM",
      iconColor: "#cfa052",
      path: "/maintenance/4",
    },
  ];

  return (
    <section className="maintenance-section">
      <Title level={4} className="maintenance-title">
        Maintenance Requests
      </Title>

      <div className="maintenance-row">
        {maintenances.map((m, i) => (
          <Card
            key={i}
            hoverable
            className="maintenance-card hotel-card clickable-card"
            onClick={goTo("/maintenance")}
          >
            <div
              className="maintenance-icon"
              style={{ background: m.iconColor }}
            >
              <FaTools />
            </div>
            <div className="maintenance-body">
              <div className="maintenance-header">
                <div className="maintenance-title-card">{m.title}</div>
                <Tag className={`priority-tag ${m.priority.toLowerCase()}`}>
                  {m.priority}
                </Tag>
              </div>
              <Text className="maintenance-status">{m.status}</Text>
              <Text className="maintenance-update">
                Last update: {m.lastUpdate}
              </Text>
              <Button
                className="maintenance-btn"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo("/maintenance")();
                }}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
