import React, { useState, useEffect } from "react";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Spin, message } from "antd";
import "../../css/event/TrendingEventsPage.css"; // Fixed path to 'events'
import { getAllEvents, getFirstEventImageUrl } from "./utils";

// HELPER: Resize Pexels images to prevent lag (width = 600px)
const optimizeUrl = (url) => {
  if (!url) return null;
  if (url.includes("images.pexels.com")) {
    // If it already has params, don't append again to avoid errors
    return url.includes("?") ? url : `${url}?auto=compress&cs=tinysrgb&w=600`;
  }
  return url;
};

export default function TrendingEventsPage() {
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pre-optimized placeholders
  const placeholderImages = [
    "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  // ==========================================
  // FETCH EVENTS
  // ==========================================
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const backendData = await getAllEvents();

      if (backendData) {
        const formattedEvents = backendData.map((e, index) => {
          // Date formatting
          const dateObj = e.eventDate
            ? new Date(e.eventDate)
            : new Date(e.createdAt);
          const dateString = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          });

          // Get image -> Optimize it -> Fallback if needed
          const rawImage = getFirstEventImageUrl(e);
          const optimizedImage =
            optimizeUrl(rawImage) ||
            placeholderImages[index % placeholderImages.length];

          // Mock categories for display
          const mockCategories = [
            "Social",
            "Wellness",
            "Community",
            "Lifestyle",
          ];
          const assignedCategory =
            e.category || mockCategories[index % mockCategories.length];

          return {
            id: e.id,
            title: e.title,
            description: e.content,
            image: optimizedImage,
            date: dateString,
            category: assignedCategory,
            location: e.location || "Community Center",
            attendees: e.attendees || 10 + index * 5,
          };
        });

        setEvents(formattedEvents);
      }
      setLoading(false);
    };

    loadEvents();
  }, []);

  // ==========================================
  // FILTER LOGIC
  // ==========================================
  const categories = ["All", "Social", "Wellness", "Community", "Lifestyle"];

  const filteredEvents =
    filter === "All" ? events : events.filter((e) => e.category === filter);

  // ==========================================
  // RSVP HANDLER
  // ==========================================
  const handleRSVP = (title) => {
    message.success(`You have reserved a spot for: ${title}`);
  };

  return (
    <div className="events-page-wrapper">
      <div className="events-container">
        {/* HERO HEADER */}
        <header className="events-header">
          <h1 className="events-title">Trending Events</h1>
          <p className="events-subtitle">
            Curated experiences for our exclusive community
          </p>

          {/* FILTER BUTTONS */}
          <div className="events-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* CONTENT */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 40, color: "#8e6f43" }}
                  spin
                />
              }
            />
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="event-card">
                  {/* IMAGE */}
                  <div className="event-image-wrapper">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-image"
                      loading="lazy" /* CRITICAL FOR SPEED */
                      onError={(e) => {
                        e.target.src = placeholderImages[0];
                      }}
                    />
                    <span className="event-category-tag">{event.category}</span>
                  </div>

                  {/* CONTENT */}
                  <div className="event-content">
                    <div className="event-date-row">
                      <CalendarOutlined /> {event.date}
                    </div>

                    <h3 className="event-card-title">{event.title}</h3>

                    <div className="event-details-row">
                      <EnvironmentOutlined /> {event.location}
                      <span style={{ margin: "0 8px" }}>|</span>
                      <UserOutlined /> {event.attendees} Attending
                    </div>

                    <p className="event-description">
                      {event.description && event.description.length > 100
                        ? event.description.substring(0, 100) + "..."
                        : event.description}
                    </p>

                    <button
                      className="event-rsvp-btn"
                      onClick={() => handleRSVP(event.title)}
                    >
                      RSVP Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "40px",
                  color: "#8e6f43",
                }}
              >
                <h3>No events found in this category.</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
