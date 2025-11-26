import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Avatar, message } from "antd";
import { useNavigate } from "react-router-dom";
import { FaComments, FaCamera } from "react-icons/fa";
import { getAllPosts } from "../discussion/utils";
import "../../css/dashboard/DashboardDiscussion.css";

const { Title, Text } = Typography;

export default function DashboardDiscussion() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const data = await getAllPosts();
      const list = data.content ? data.content : data;
      setPosts(list);
    } catch (err) {
      console.error(err);
      message.error("Failed to load posts");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <section className="discussion-section">
      <Title level={4} className="discussion-title">
        Discussions
      </Title>

      <div className="discussion-row">
        {posts.length === 0 && (
          <div style={{ color: "#5a4632", opacity: 0.6 }}>No posts yet</div>
        )}

        {posts.map((post) => (
          <Card
            key={post.id}
            hoverable
            className="discussion-card clickable-card"
            onClick={() => navigate(`/discussion`)}
          >
            {/* Image or Placeholder */}
            <div className="discussion-img-wrapper">
              {post.images && post.images.length > 0 ? (
                <img src={post.images[0]} alt="Post" />
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#b9965b",
                  }}
                >
                  <FaCamera size={32} style={{ marginBottom: 8 }} />
                  <span style={{ fontSize: 12, opacity: 0.7 }}>No Image</span>
                </div>
              )}
            </div>

            <div className="discussion-info">
              {/* Title */}
              <div className="discussion-title-card">
                {post.content?.slice(0, 40) || "Untitled Post"}
              </div>

              {/* Content preview */}
              <div className="discussion-last-msg">
                {post.content?.slice(0, 60) || "No content"}
              </div>

              {/* Author */}
              <div className="discussion-meta">
                <Avatar
                  size={28}
                  src={post.author?.avatarUrl || "https://i.pravatar.cc/40"}
                />
                <Text className="discussion-user">
                  {post.author?.username || "Unknown"}
                </Text>
              </div>

              {/* Button */}
              <Button
                className="discussion-btn"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/discussion`);
                }}
              >
                View Discussion
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
