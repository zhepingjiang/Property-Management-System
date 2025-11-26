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
import { getReplies, createReply } from "./utils";
import "../../css/discussion/PostDetailModal.css";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const PostDetailModal = ({ post, onClose, onUpdated }) => {
  const [localReplies, setLocalReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

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
      onUpdated?.(); // refresh posts
    } catch (err) {
      console.error(err);
      message.error("Failed to send reply");
    }
    setLoading(false);
  };

  return (
    <Modal
      open={true}
      footer={null}
      onCancel={onClose}
      width={1000}
      className="discussion-post-modal"
      bodyStyle={{ padding: 0 }}
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
  );
};

export default PostDetailModal;
