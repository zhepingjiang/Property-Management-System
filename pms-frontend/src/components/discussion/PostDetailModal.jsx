import React, { useState, useEffect } from "react";
import { Modal, Card, Carousel, Typography, Input, Button } from "antd";
import "../../css/discussion/DiscussionPage.css";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const PostDetailModal = ({ post, onClose }) => {
  const [localReplies, setLocalReplies] = useState(post.replies || []);
  const [replyText, setReplyText] = useState("");

  // If a different post is opened, sync replies
  useEffect(() => {
    setLocalReplies(post.replies || []);
    setReplyText("");
  }, [post]);

  const handleSendReply = () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;

    // For now, just update local state.
    // Later you'll call BE API and then refresh replies.
    setLocalReplies((prev) => [...prev, trimmed]);
    setReplyText("");
  };

  return (
    <Modal
      open={true}
      footer={null}
      onCancel={onClose}
      width={1100}
      className="discussion-post-modal"
    >
      <div className="post-modal-grid">
        {/* LEFT: images + title + content */}
        <Card className="post-left-card">
          {post.images && post.images.length > 0 && (
            <Carousel className="post-carousel">
              {post.images.map((img, idx) => (
                <div key={idx}>
                  <img src={img} alt="" className="post-carousel-img" />
                </div>
              ))}
            </Carousel>
          )}

          <Title level={4} className="post-title">
            {post.title}
          </Title>

          <Paragraph className="post-content">{post.content}</Paragraph>
        </Card>

        {/* RIGHT: replies + input at bottom */}
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
