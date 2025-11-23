import React, { useEffect, useState } from "react";
import { Typography, Carousel, Card, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/newsletter/NewsletterDetailPage.css";

import {
  getAllNewsletters,
  getNewsletterById,
  getNewestNewsletter,
} from "./utils";
import ErrorState from "../error/ErrorState";

const { Title, Paragraph } = Typography;

export default function NewsletterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newsletter, setNewsletter] = useState(null);
  const [allNewsletters, setAllNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  // fallback if BE has no images
  const placeholderImages = [
    "https://images.pexels.com/photos/5472533/pexels-photo-5472533.jpeg",
    "https://images.pexels.com/photos/31656146/pexels-photo-31656146.jpeg",
    "https://images.pexels.com/photos/34450811/pexels-photo-34450811.jpeg",
  ];

  // ============================
  // Load sidebar list (safe)
  // ============================
  useEffect(() => {
    const load = async () => {
      const data = await getAllNewsletters();
      if (data) setAllNewsletters(data);
    };
    load();
  }, []);

  // ============================
  // Load main newsletter (safe)
  // ============================
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = id
          ? await getNewsletterById(id)
          : await getNewestNewsletter();

        if (data) setNewsletter(data);
      } catch (e) {
        console.error("Error loading newsletter:", e);
      }
      setLoading(false);
    };

    load();
  }, [id]);

  // ============================
  // Render loading state
  // ============================
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!loading && !newsletter) {
    return (
      <ErrorState
        title="Newsletter not found"
        message="Newsletters may be deleted or temporarily unavailable."
      />
    );
  }

  const images =
    newsletter.imageUrls && newsletter.imageUrls.length > 0
      ? newsletter.imageUrls
      : placeholderImages;

  const creatorName =
    newsletter.creator?.username || "Property Management Office";

  return (
    <div className="newsletter-content-wrapper">
      <div className="newsletter-container">
        <div className="newsletter-page-grid">
          {/* ========== Sidebar ========== */}
          <aside className="newsletter-aside">
            <div className="newsletter-aside-title">Other Newsletters</div>

            <div className="newsletter-list">
              {(allNewsletters || []).map((item) => (
                <Card
                  key={item.id}
                  bordered
                  hoverable
                  className="newsletter-list-card"
                  onClick={() => navigate(`/newsletter/${item.id}`)}
                >
                  <div className="newsletter-list-item">
                    <img
                      src={item.imageUrls?.[0] || placeholderImages[0]}
                      alt="thumb"
                      className="newsletter-list-thumb"
                    />
                    <div className="newsletter-list-meta">
                      <div className="newsletter-list-title">{item.title}</div>
                      <div className="newsletter-list-date">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </aside>

          {/* ========== Main Content ========== */}
          <main className="newsletter-main">
            <Card bordered className="newsletter-image-card">
              <Carousel autoplay dots className="newsletter-carousel">
                {images.map((url, index) => (
                  <div key={index} className="newsletter-image-wrapper">
                    <img
                      src={url}
                      alt={`img-${index}`}
                      className="newsletter-image"
                      onError={(e) => {
                        e.target.src = placeholderImages[0];
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </Card>

            <div className="newsletter-lower-section">
              <Card bordered className="newsletter-description-card">
                <Title level={3}>{newsletter.title}</Title>
                <Paragraph className="newsletter-description-text">
                  {newsletter.content}
                </Paragraph>

                <div style={{ marginTop: "20px", opacity: 0.7 }}>
                  <div>Created By: {creatorName}</div>
                  <div>
                    {new Date(newsletter.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
