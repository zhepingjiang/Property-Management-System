import React from "react";
import { Card, Typography, Button } from "antd";
import { FaSwimmer, FaSun, FaDumbbell, FaSpa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardAmenitiesReserve.css";

const { Title } = Typography;

export default function DashboardAmenitiesReserve() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  const amenities = [
    {
      title: "Pool & Rooftop",
      desc: "Swim, relax, and enjoy city views",
      icon: <FaSwimmer />,
      path: "/amenity/pool",
    },
    {
      title: "Sun Lounge",
      desc: "Soak up the sun in a comfortable lounge",
      icon: <FaSun />,
      path: "/amenity/sun-lounge",
    },
    {
      title: "Gym",
      desc: "Fully equipped gym for all levels",
      icon: <FaDumbbell />,
      path: "/amenity/gym",
    },
    {
      title: "Spa & Wellness",
      desc: "Relax with massages and wellness treatments",
      icon: <FaSpa />,
      path: "/amenity/spa",
    },
  ];

  return (
    <section className="amenities-section">
      <Title level={4} className="amenities-title">
        Amenities Reserve
      </Title>

      <div className="amenities-grid">
        {amenities.map((am, i) => (
          <Card
            key={i}
            hoverable
            className="amenity-card hotel-card clickable-card"
            onClick={goTo("/amenity/home")}
          >
            <div className="amenity-icon">{am.icon}</div>
            <div className="amenity-info">
              <div className="amenity-title">{am.title}</div>
              <div className="amenity-desc">{am.desc}</div>
              <Button
                className="amenity-btn"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo("/amenity/home")();
                }}
              >
                Reserve
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
