import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import "../../css/dashboard/DashboardNewsletter.css";

// Import the API function from your newsletter folder
import { getAllNewsletters } from "../newsletter/utils";

const { Text } = Typography;

export default function DashboardNewsletter() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Touch control
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // 1. FETCH DATA ON MOUNT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllNewsletters();
        if (data && data.length > 0) {
          // Sort by newest first if needed, or take as is
          setNewsletters(data.slice(0, 5)); // Limit to top 5 for the banner
        }
      } catch (err) {
        console.error("Failed to load newsletters", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. AUTO ROTATE
  useEffect(() => {
    if (paused || newsletters.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % newsletters.length);
    }, 3000); // Increased to 3s for better readability

    return () => clearInterval(timer);
  }, [paused, newsletters.length]);

  // Swipe handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      // If valid swipe, calculate new index based on direction
      const direction = diff > 0 ? 1 : -1;
      setIndex((prev) => {
        const nextIndex = prev + direction;
        if (nextIndex < 0) return newsletters.length - 1;
        return nextIndex % newsletters.length;
      });
    }
  };

  // --- RENDER ---

  // Handle Loading State
  if (loading) {
    return (
      <Card className="newsletter-rotating-card" bordered={false}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 24, color: "#8e6f43" }}
                spin
              />
            }
          />
        </div>
      </Card>
    );
  }

  // Handle Empty State (No newsletters found)
  if (newsletters.length === 0) {
    return (
      <Card className="newsletter-rotating-card" bordered={false}>
        <div className="newsletter-rotating-text-wrapper">
          <Text className="newsletter-rotating-text">
            Stay tuned for community updates!
          </Text>
        </div>
      </Card>
    );
  }

  // Get current item
  const currentItem = newsletters[index];

  return (
    <Card
      className="newsletter-rotating-card"
      bordered={false}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="newsletter-rotating-text-wrapper">
        {/* Animate Key change to trigger CSS transitions if set up, or just text update */}
        <Text key={currentItem.id} className="newsletter-rotating-text">
          {currentItem.title}
        </Text>
      </div>

      {/* Dot indicators */}
      <div className="newsletter-dots">
        {newsletters.map((_, i) => (
          <div
            key={i}
            className={`newsletter-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <Button
        className="newsletter-learn-more"
        onClick={(e) => {
          e.stopPropagation();
          // Navigate to the specific ID from backend
          navigate(`/newsletter/${currentItem.id}`);
        }}
      >
        Learn More →
      </Button>
    </Card>
  );
}
