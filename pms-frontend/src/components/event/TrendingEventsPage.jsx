import React, { useState } from "react";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../../css/event/TrendingEventsPage.css";

export default function TrendingEventsPage() {
  const [filter, setFilter] = useState("All");

  // Mock Data
  const events = [
    {
      id: 1,
      title: "Wine & Cheese Evening",
      category: "Social",
      date: "Nov 28, 6:00 PM",
      location: "Sky Lounge",
      attendees: 24,
      image:
        "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg",
      description:
        "Join your neighbors for an exquisite selection of wines paired with artisanal cheeses.",
    },
    {
      id: 2,
      title: "Morning Yoga Flow",
      category: "Wellness",
      date: "Nov 29, 7:00 AM",
      location: "Garden Deck",
      attendees: 12,
      image:
        "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
      description:
        "Start your day with zen. A beginner-friendly yoga session led by instructor Sarah.",
    },
    {
      id: 3,
      title: "Annual HOA Meeting",
      category: "Community",
      date: "Dec 05, 5:30 PM",
      location: "Conference Hall B",
      attendees: 45,
      image:
        "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
      description:
        "Discussing upcoming renovations and community budget. Dinner will be served.",
    },
    {
      id: 4,
      title: "Holiday Gala 2025",
      category: "Social",
      date: "Dec 20, 8:00 PM",
      location: "Grand Ballroom",
      attendees: 110,
      image:
        "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg",
      description:
        "The biggest event of the year! Black tie attire. Live music, dancing, and cocktails.",
    },
    {
      id: 5,
      title: "Cooking Class: Italian",
      category: "Lifestyle",
      date: "Dec 10, 6:00 PM",
      location: "Community Kitchen",
      attendees: 8,
      image:
        "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
      description:
        "Learn to make authentic pasta from scratch with Chef Marco. Ingredients provided.",
    },
    {
      id: 6,
      title: "Poolside Jazz Night",
      category: "Social",
      date: "Dec 12, 7:30 PM",
      location: "Main Pool Area",
      attendees: 30,
      image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
      description:
        "Smooth jazz under the stars. Refreshments available at the cabana bar.",
    },
  ];

  // Filtering Logic
  const categories = ["All", "Social", "Wellness", "Community", "Lifestyle"];

  const filteredEvents =
    filter === "All" ? events : events.filter((e) => e.category === filter);

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

        {/* EVENTS GRID */}
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              {/* IMAGE */}
              <div className="event-image-wrapper">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image"
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

                <p className="event-description">{event.description}</p>

                <button
                  className="event-rsvp-btn"
                  onClick={() =>
                    alert(`You reserved a spot for: ${event.title}`)
                  }
                >
                  RSVP Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
