import React from "react";
import { Card, Typography, Button } from "antd";
import {
  FaTools,
  FaBolt,
  FaHome,
  FaCouch,
  FaTree,
  FaTint,
  FaCar,
  FaVolumeUp,
  FaQuestionCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardMaintenance.css";

const { Title, Text } = Typography;

export default function DashboardMaintenance() {
  const navigate = useNavigate();

  // 1. Define the categories from Image 1, mapped to colors/icons for Image 2 style
  const categories = [
    {
      key: "Appliances",
      subtitle: "Stove, dishwasher, fridge, washer / dryer",
      icon: <FaTools />,
      color: "#e6b95a", // Gold
    },
    {
      key: "Electrical",
      subtitle: "Lights, outlets, breakers, wiring",
      icon: <FaBolt />,
      color: "#b9965b", // Dark Gold
    },
    {
      key: "House Exterior",
      subtitle: "Roof, doors, windows, balcony",
      icon: <FaHome />,
      color: "#d9a24c", // Orange-Gold
    },
    {
      key: "Household",
      subtitle: "Interior doors, walls, flooring",
      icon: <FaCouch />,
      color: "#cfa052", // Light Brown
    },
    {
      key: "Outdoors",
      subtitle: "Yard, walkways, common outdoor areas",
      icon: <FaTree />,
      color: "#81c784", // Muted Green
    },
    {
      key: "Plumbing",
      subtitle: "Sinks, toilets, showers, leaks",
      icon: <FaTint />, // Or FaWrench
      color: "#5a4632", // Dark Brown
    },
    {
      key: "Parking & Garage",
      subtitle: "Garage door, gate, parking stalls",
      icon: <FaCar />,
      color: "#7a6a55", // Greyish Brown
    },
    {
      key: "Noise / Disturbance",
      subtitle: "Loud neighbors, parties, ongoing noise",
      icon: <FaVolumeUp />,
      color: "#e57373", // Muted Red
    },
    {
      key: "Other",
      subtitle: "Anything not listed above",
      icon: <FaQuestionCircle />,
      color: "#a08c6a", // Tan
    },
  ];

  // 2. Navigation Handler
  const handleCategoryClick = (categoryKey) => () => {
    // Navigate to the maintenance page and trigger the "Create Modal" for this category
    navigate("/maintenance", { state: { createCategory: categoryKey } });
  };

  return (
    <section className="maintenance-section">
      <Title level={4} className="maintenance-title">
        Request Maintenance
      </Title>

      {/* Horizontal Scroll Row */}
      <div className="maintenance-row">
        {categories.map((cat, index) => (
          <Card
            key={index}
            hoverable
            className="maintenance-card hotel-card clickable-card"
            onClick={handleCategoryClick(cat.key)}
          >
            {/* Icon Circle (Style from Image 2) */}
            <div className="maintenance-icon" style={{ background: cat.color }}>
              {cat.icon}
            </div>

            {/* Content Body */}
            <div className="maintenance-body">
              <div className="maintenance-header">
                <div className="maintenance-title-card">{cat.key}</div>
              </div>

              {/* Description (Mapped from Image 1 subtitle) */}
              <Text className="maintenance-subtitle-card">{cat.subtitle}</Text>

              <Button
                className="maintenance-btn"
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  handleCategoryClick(cat.key)();
                }}
              >
                Create Request
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
