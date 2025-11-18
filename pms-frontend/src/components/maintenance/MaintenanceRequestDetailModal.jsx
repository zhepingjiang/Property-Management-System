// src/components/maintenance/MaintenanceRequestDetailModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Card, Typography, Input, Button } from "antd";
import "../../css/maintenance/MaintenanceRequestDetailModal.css";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const MaintenanceRequestDetailModal = ({ request, onClose }) => {
  const [messages, setMessages] = useState(request.conversations || []);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    setMessages(request.conversations || []);
    setReplyText("");
  }, [request]);

  const handleSendReply = () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;

    const newMsg = {
      author: "You",
      message: trimmed,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    setMessages((prev) => [...prev, newMsg]);
    setReplyText("");
    // Later: POST to backend
  };

  return (
    <Modal
      open={true}
      footer={null}
      onCancel={onClose}
      width={900}
      className="maintenance-detail-modal"
    >
      <div className="maintenance-detail-grid">
        {/* LEFT: title + description */}
        <Card className="maintenance-detail-left">
          <Title level={4}>{request.title}</Title>
          <Paragraph type="secondary">
            <Text strong>Category:</Text> {request.category}
          </Paragraph>
          <Paragraph>
            {request.description || "No description provided by resident."}
          </Paragraph>
        </Card>

        {/* RIGHT: conversation + reply */}
        <Card className="maintenance-detail-right">
          <div className="maintenance-conversation-list">
            {messages.length === 0 ? (
              <div className="maintenance-no-history">
                No history of conversation.
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className="maintenance-message">
                  <div className="maintenance-message-meta">
                    <Text strong>{msg.author}</Text>
                    <Text type="secondary" className="maintenance-message-time">
                      {msg.timestamp}
                    </Text>
                  </div>
                  <div className="maintenance-message-body">{msg.message}</div>
                </div>
              ))
            )}
          </div>

          <div className="maintenance-reply-section">
            <TextArea
              placeholder="Write a reply..."
              autoSize={{ minRows: 2, maxRows: 4 }}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="maintenance-reply-input"
            />
            <Button
              type="primary"
              block
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

export default MaintenanceRequestDetailModal;
