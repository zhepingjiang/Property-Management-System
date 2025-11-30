import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  Carousel,
  Typography,
  Input,
  Button,
  message,
} from "antd";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getReplies, createReply } from "./utils";
import "../../css/discussion/PostDetailModal.css";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const PostDetailModal = ({ post, onClose, onUpdated }) => {
  const [localReplies, setLocalReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  // Track INDEX for navigation support
  const [previewIndex, setPreviewIndex] = useState(null);

  const loadReplies = async () => {
    try {
      const replies = await getReplies(post.id);
      setLocalReplies(replies.map((r) => r.content));
    } catch (err) {
      console.error(err);
      message.error("Failed to load replies");
    }
  };

  useEffect(() => {
    setReplyText("");
    loadReplies();
  }, [post]);

  const handleSendReply = async () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      await createReply({ postId: post.id, content: trimmed });
      setLocalReplies((prev) => [...prev, trimmed]);
      setReplyText("");
      message.success("Reply sent!");
      onUpdated?.();
    } catch (err) {
      console.error(err);
      message.error("Failed to send reply");
    }
    setLoading(false);
  };

  // --- NAVIGATION HANDLERS ---
  const handlePrev = (e) => {
    e.stopPropagation();
    if (previewIndex !== null && post.images) {
      const newIndex =
        (previewIndex - 1 + post.images.length) % post.images.length;
      setPreviewIndex(newIndex);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (previewIndex !== null && post.images) {
      const newIndex = (previewIndex + 1) % post.images.length;
      setPreviewIndex(newIndex);
    }
  };

  return (
    <>
      {/* 1. MAIN POST DETAIL MODAL */}
      <Modal
        open={true}
        footer={null}
        onCancel={onClose}
        width={1000}
        className="discussion-post-modal"
        bodyStyle={{ padding: 0 }}
        centered
      >
        <div className="post-modal-grid">
          <Card className="post-left-card">
            {post.images?.length > 0 && (
              <Carousel className="post-carousel" autoplay>
                {post.images.map((img, idx) => (
                  <div key={idx}>
                    <img
                      src={img}
                      alt={`post-${idx}`}
                      className="post-carousel-img"
                      // Set Index on Click
                      onClick={() => setPreviewIndex(idx)}
                    />
                  </div>
                ))}
              </Carousel>
            )}
            <Title level={4} className="post-title">
              {post.title}
            </Title>
            <Paragraph className="post-content">{post.content}</Paragraph>
          </Card>

          <Card className="post-right-card">
            <div className="replies-list">
              {localReplies.length === 0 ? (
                <div className="no-replies-text">
                  No replies yet. Be the first to respond.
                </div>
              ) : (
                localReplies.map((rep, idx) => (
                  <div key={idx} className="reply-item">
                    {rep}
                  </div>
                ))
              )}
            </div>

            <div className="reply-editor">
              <TextArea
                className="reply-textarea"
                placeholder="Write a reply..."
                autoSize={{ minRows: 2, maxRows: 4 }}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Button
                type="primary"
                block
                className="reply-send-btn"
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                loading={loading}
              >
                Send Reply
              </Button>
            </div>
          </Card>
        </div>
      </Modal>

      {/* 2. IMAGE PREVIEW MODAL (LIGHTBOX) */}
      <Modal
        open={previewIndex !== null}
        footer={null}
        onCancel={() => setPreviewIndex(null)}
        centered
        closable={false}
        width="100%"
        className="image-preview-modal"
        maskStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(8px)",
        }}
        bodyStyle={{
          padding: 0,
          backgroundColor: "transparent",
          boxShadow: "none",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="preview-wrapper" onClick={() => setPreviewIndex(null)}>
          {/* Close Button */}
          <Button
            className="preview-close-btn"
            icon={<CloseOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setPreviewIndex(null);
            }}
          >
            Close Preview
          </Button>

          {/* Navigation Arrows (Only if > 1 image) */}
          {post.images?.length > 1 && (
            <>
              <Button
                className="preview-nav-btn preview-nav-left"
                icon={<LeftOutlined />}
                onClick={handlePrev}
              />
              <Button
                className="preview-nav-btn preview-nav-right"
                icon={<RightOutlined />}
                onClick={handleNext}
              />
            </>
          )}

          {/* Image */}
          {previewIndex !== null && post.images && (
            <img
              src={post.images[previewIndex]}
              alt={`Preview ${previewIndex}`}
              className="preview-image-content"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default PostDetailModal;
