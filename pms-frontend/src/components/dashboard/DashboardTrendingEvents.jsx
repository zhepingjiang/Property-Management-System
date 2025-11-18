import React from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Space,
  Tag,
} from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardLayout.css";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function DashboardTrendingEvents() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  const trendingEvents = [
    {
      title: "Community BBQ Night",
      date: "Nov 22",
      location: "Central Lawn",
      desc: "Food, music & family fun.",
    },
    {
      title: "Yoga Morning",
      date: "Nov 28",
      location: "Rooftop Garden",
      desc: "Gentle flow for all levels.",
    },
    {
      title: "Holiday Fair",
      date: "Dec 10",
      location: "Lobby",
      desc: "Local vendors & crafts.",
    },
  ];

  return (
    <section className="section">
      <Title level={4} className="hotel-title">
        Trending Events
      </Title>
      <Row gutter={16}>
        {trendingEvents.map((ev, i) => (
          <Col xs={24} sm={8} key={i}>
            <Card
              hoverable
              className="box-card hotel-card clickable-card"
              onClick={goTo("/amenity/info")}
            >
              <div className="card-body" style={{ display: "flex", gap: 12 }}>
                <Avatar size={52} style={{ backgroundColor: "#e2d5c2" }}>
                  {ev.title.charAt(0)}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <div className="card-title">{ev.title}</div>
                  <div className="card-sub">
                    {ev.date} • {ev.location}
                  </div>
                  <div style={{ marginTop: 8, color: "#6b5a45" }}>
                    {ev.desc}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <Button
                      size="small"
                      type="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo("/events")();
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
