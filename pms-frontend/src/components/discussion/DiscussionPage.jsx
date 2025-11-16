import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import PostDetailModal from "./PostDetailModal";
import CreatePostModal from "./CreatePostModal";

import "../../css/discussion/DiscussionPage.css";

export default function DiscussionPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // MORE sample posts (~10) for better waterfall effect
  const posts = [
    {
      id: 1,
      title: "Looking for a dog walker this weekend",
      images: [
        "https://images.pexels.com/photos/4587993/pexels-photo-4587993.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      content:
        "Hi neighbors, I'm looking for someone to walk my dog this Saturday afternoon.",
      replies: ["I can help!", "Check with the concierge."],
    },
    {
      id: 2,
      title: "Anyone selling a used bike?",
      images: [],
      content: "Looking for something under $100.",
      replies: [],
    },
    {
      id: 3,
      title: "Package theft alert",
      // images: ["https://picsum.photos/500/350"],
      images: [],
      content:
        "Saw someone suspicious near the mail room yesterday. Stay alert.",
      replies: ["Saw them too.", "Thanks for informing!"],
    },
    {
      id: 4,
      title: "Yoga class next Tuesday",
      images: [
        "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      content: "Offering a free yoga class in the community lounge.",
      replies: [],
    },
    {
      id: 5,
      title: "Lost key found near parking lot",
      // images: ["https://picsum.photos/500/340"],
      images: [],
      content: "Found a key near the visitor parking area.",
      replies: ["That might be mine!"],
    },
    {
      id: 6,
      title: "Cooking class recipes",
      images: [
        "https://images.pexels.com/photos/5591668/pexels-photo-5591668.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      content: "Posting recipes from yesterday’s cooking class!",
      replies: [],
    },
    {
      id: 7,
      title: "Community gardening tips",
      images: [
        "https://images.pexels.com/photos/4750399/pexels-photo-4750399.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      content: "Sharing some easy plant-care tips!",
      replies: ["Nice!", "Thanks for sharing!"],
    },
    {
      id: 8,
      title: "Board game night this Friday",
      images: [
        "https://images.pexels.com/photos/411207/pexels-photo-411207.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      content: "Join us in the lounge for board game night.",
      replies: [],
    },
    {
      id: 9,
      title: "Free couch available",
      images: [],
      content: "Moving out, giving away couch for free!",
      replies: [],
    },
    {
      id: 10,
      title: "Missing cat spotted",
      images: [
        "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      content: "Saw a cat wandering near Building B.",
      replies: ["Sending picture?", "I saw it too."],
    },
  ];

  const breakpointColumns = {
    default: 4,
    1400: 3,
    900: 2,
    600: 1,
  };

  return (
    <div className="discussion-page-container">
      {/* Modern Header */}
      <h2 className="discussion-header">Community Posts</h2>

      {/* Masonry Grid */}
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
            {post.images.length > 0 ? (
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

      {/* Floating Add (+) Button */}
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
        />
      )}

      {isCreateOpen && (
        <CreatePostModal onClose={() => setIsCreateOpen(false)} />
      )}
    </div>
  );
}
