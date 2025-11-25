import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Card, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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

  return (
    <div className="discussion-page-wrapper">
      <div className="discussion-page-container">
        <h2 className="discussion-header">Community Posts</h2>

        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {posts.map((post) => (
            <Card
              key={post.id}
              className="discussion-card"
              hoverable
              onClick={() => setSelectedPost(post)}
            >
              {post.images && post.images.length > 0 ? (
                <div className="discussion-img-wrapper">
                  <img src={post.images[0]} alt="" className="discussion-img" />
                  <div className="discussion-title-overlay">{post.title}</div>
                </div>
              ) : (
                <div className="discussion-no-image-card">
                  <div className="discussion-title-text">{post.title}</div>
                </div>
              )}
            </Card>
          ))}
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
            onUpdated={loadPosts} // refresh list after reply
          />
        )}

        {isCreateOpen && (
          <CreatePostModal
            onClose={() => setIsCreateOpen(false)}
            onCreated={loadPosts} // refresh list after creating post
          />
        )}
      </div>
    </div>
  );
}
