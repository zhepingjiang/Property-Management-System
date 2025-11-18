import React from "react";
import { Typography, Card, Button, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard/DashboardLayout.css";
import "../../css/dashboard/DashboardTrendingEvents.css";

const { Title } = Typography;

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
    {
      title: "Wine Tasting",
      date: "Dec 15",
      location: "Club Lounge",
      desc: "Sample local wines.",
    },
    {
      title: "Art Workshop",
      date: "Dec 20",
      location: "Studio 1",
      desc: "Paint & create together.",
    },
    {
      title: "Movie Night",
      date: "Dec 25",
      location: "Screening Room",
      desc: "Holiday classics.",
    },
    {
      title: "New Year Gala",
      date: "Dec 31",
      location: "Ballroom",
      desc: "Celebrate with neighbors.",
    },
  ];

  return (
    <section className="trending-events-section">
      <div className="trending-events-header">
        <Title level={4} className="hotel-title">
          Trending Events
        </Title>
        <Button className="trending-learn-more" onClick={goTo("/events")}>
          Learn More
        </Button>
      </div>

      <div className="trending-events-scroll">
        {trendingEvents.map((ev, i) => (
          <Card
            hoverable
            key={i}
            className="hotel-card trending-event-card clickable-card"
            onClick={goTo("/amenity/info")}
          >
            <div className="event-card-body">
              <Avatar size={52} style={{ backgroundColor: "#e2d5c2" }}>
                {ev.title.charAt(0)}
              </Avatar>
              <div className="event-card-content">
                <div className="card-title">{ev.title}</div>
                <div className="card-sub">
                  {ev.date} • {ev.location}
                </div>
                <div className="card-desc">{ev.desc}</div>
                <Button
                  size="small"
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo("/events")();
                  }}
                  className="event-view-btn"
                >
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
