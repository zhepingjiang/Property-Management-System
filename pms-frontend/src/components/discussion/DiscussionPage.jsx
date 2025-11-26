import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Card, Button, message } from "antd";
import {
  PlusOutlined,
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";

import PostDetailModal from "./PostDetailModal";
import CreatePostModal from "./CreatePostModal";
import { getAllPosts } from "./utils";
import "../../css/discussion/DiscussionPage.css";

export default function DiscussionPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const loadPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load posts");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const breakpointColumns = { default: 4, 1400: 3, 900: 2, 600: 1 };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="discussion-page-wrapper">
      <div className="discussion-page-container">
        <h2 className="discussion-header">Community Posts</h2>

        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {posts.map((post) => {
            const hasImage = post.images && post.images.length > 0;

            return (
              <Card
                key={post.id}
                className="discussion-card"
                hoverable
                onClick={() => setSelectedPost(post)}
              >
                {hasImage ? (
                  /* --- IMAGE CARD --- */
                  <div className="discussion-img-wrapper">
                    <img
                      src={post.images[0]}
                      alt=""
                      className="discussion-img"
                    />
                    <div className="discussion-title-overlay">
                      {post.content?.slice(0, 40) || "Untitled Post"}
                    </div>
                  </div>
                ) : (
                  /* --- DEFAULT NO-IMAGE CARD --- */
                  <div className="discussion-no-image-card">
                    <div className="discussion-no-image-icon">
                      <FileTextOutlined style={{ fontSize: "40px" }} />
                    </div>

                    <div className="discussion-no-image-title">
                      {post.title || "Untitled Post"}
                    </div>

                    <div className="discussion-no-image-content">
                      {post.content
                        ? post.content.substring(0, 80) + "..."
                        : "No content provided."}
                    </div>
                  </div>
                )}

                {/* --- CARD FOOTER METADATA --- */}
                <div className="discussion-card-footer">
                  <span className="footer-author">
                    <UserOutlined /> {post.author?.username || "Unknown"}
                  </span>

                  <span className="footer-date">
                    {post.createdAt ? formatDate(post.createdAt) : ""}
                  </span>

                  <span className="footer-replies">
                    <MessageOutlined /> {post.replies?.length || 0}
                  </span>
                </div>
              </Card>
            );
          })}
        </Masonry>

        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          className="discussion-create-btn"
          onClick={() => setIsCreateOpen(true)}
        />

        {selectedPost && (
          <PostDetailModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onUpdated={loadPosts}
          />
        )}

        {isCreateOpen && (
          <CreatePostModal
            onClose={() => setIsCreateOpen(false)}
            onCreated={loadPosts}
          />
        )}
      </div>
    </div>
  );
}
