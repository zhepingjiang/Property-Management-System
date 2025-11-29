import React, { useEffect, useState, memo } from "react";
import { Typography, Card, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import "../../css/dashboard/DashboardLayout.css";
import "../../css/dashboard/DashboardTrendingEvents.css";

import { getAllEvents, getFirstEventImageUrl } from "../event/utils";

const { Title } = Typography;

// Optimize Image URLs to request smaller sizes (Width = 600px)
const optimizeUrl = (url) => {
  if (!url) return null;
  // If it's a Pexels image, add query params to resize it
  if (url.includes("images.pexels.com")) {
    return `${url}?auto=compress&cs=tinysrgb&w=600`;
  }
  return url;
};

const DashboardTrendingEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Optimized Placeholders (Small size requested)
  const placeholders = [
    "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  // Static fallback data
  const fallbackEvents = [
    {
      id: 901,
      title: "Community BBQ Night",
      date: "Nov 22",
      location: "Central Lawn",
      desc: "Food, music & family fun.",
      image: placeholders[3],
    },
    {
      id: 902,
      title: "Yoga Morning",
      date: "Nov 28",
      location: "Rooftop Garden",
      desc: "Gentle flow for all levels.",
      image: placeholders[1],
    },
    {
      id: 903,
      title: "Holiday Fair",
      date: "Dec 10",
      location: "Lobby",
      desc: "Local vendors & crafts.",
      image: placeholders[5],
    },
    {
      id: 904,
      title: "Wine Tasting",
      date: "Dec 15",
      location: "Club Lounge",
      desc: "Sample local wines.",
      image: placeholders[0],
    },
  ];

  useEffect(() => {
    let isMounted = true; // Prevent state update if component unmounts

    const loadEvents = async () => {
      // Don't set loading true if we already have data (prevents flash)
      if (events.length === 0) setLoading(true);

      const data = await getAllEvents();

      if (isMounted) {
        if (data && data.length > 0) {
          const formatted = data.map((e, index) => {
            const rawImage = getFirstEventImageUrl(e);
            // Use backend image OR rotating placeholder
            const finalImage = rawImage
              ? optimizeUrl(rawImage)
              : placeholders[index % placeholders.length];

            return {
              id: e.id,
              title: e.title,
              date: e.eventDate
                ? new Date(e.eventDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Upcoming",
              location: e.location || "Community Center",
              desc: e.content
                ? e.content.substring(0, 35) +
                  (e.content.length > 35 ? "..." : "")
                : "",
              image: finalImage,
            };
          });
          setEvents(formatted.slice(0, 6));
        } else {
          setEvents(fallbackEvents);
        }
        setLoading(false);
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const goTo = (path) => () => navigate(path);

  return (
    <section className="trending-events-section">
      <div className="trending-events-header">
        <Title level={4} className="hotel-title">
          Trending Events
        </Title>
        <Button className="trending-learn-more" onClick={goTo("/event")}>
          View All
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 24, color: "#b9965b" }}
                spin
              />
            }
          />
        </div>
      ) : (
        <div className="trending-events-scroll">
          {events.map((ev, i) => {
            const bgImageStr = `url(${ev.image})`;

            return (
              <Card
                hoverable
                key={ev.id || i}
                className="trending-event-card"
                onClick={goTo("/event")}
              >
                {/* LAYER 1: Background Image */}
                <div
                  className="card-bg-image"
                  style={{ backgroundImage: bgImageStr }}
                />

                {/* LAYER 2: Dark Overlay */}
                <div className="card-overlay" />

                {/* LAYER 3: Content */}
                <div className="event-card-body">
                  <div className="event-card-content">
                    <div className="card-sub">
                      {ev.date} • {ev.location}
                    </div>
                    <div className="card-title">{ev.title}</div>
                    <div className="card-desc">{ev.desc}</div>

                    <div className="event-view-btn-wrapper">
                      <Button
                        size="small"
                        className="event-view-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          goTo("/event")();
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

// CRITICAL: Wrap in memo to prevent re-renders when parent state changes
export default memo(DashboardTrendingEvents);
