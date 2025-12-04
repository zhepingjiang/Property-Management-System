// src/components/maintenance/MaintenanceRequestDetailModal.jsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  Typography,
  Input,
  Button,
  message,
  Spin,
  Image,
  Carousel,
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

import {
  getRequestReplies,
  createRequestReply,
  deleteRequestReply,
} from "./utils";

import "../../css/maintenance/MaintenanceRequestDetailModal.css";

dayjs.extend(utc);
dayjs.extend(tz);

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const MaintenanceRequestDetailModal = ({ request, onClose }) => {
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [loadingReplies, setLoadingReplies] = useState(true);

  /* ================================
       LOAD REPLIES FROM BACKEND
  ================================= */
  const loadReplies = async () => {
    try {
      setLoadingReplies(true);
      const data = await getRequestReplies(request.id);
      setReplies(data || []);
    } catch (err) {
      console.error("Failed to load replies:", err);
    } finally {
      setLoadingReplies(false);
    }
  };

  useEffect(() => {
    loadReplies();
    setReplyText("");
  }, [request]);

  /* ================================
       SEND REPLY
  ================================= */
  const handleSendReply = async () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;

    try {
      await createRequestReply({
        requestId: request.id,
        content: trimmed,
      });

      setReplyText("");
      loadReplies(); // refresh
    } catch (err) {
      console.error("Failed to create reply:", err);
      message.error("Failed to send reply");
    }
  };

  /* ================================
       DELETE REPLY (OPTIONAL)
  ================================= */
  const handleDeleteReply = async (replyId) => {
    try {
      await deleteRequestReply(replyId);
      loadReplies();
    } catch (err) {
      console.error("Failed to delete reply:", err);
      message.error("Could not delete reply");
    }
  };

  const formatTime = (iso) =>
    dayjs(iso).tz("America/Toronto").format("YYYY-MM-DD HH:mm");

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

          {/* Images Section */}
          {/* Images Section */}
          {request.imageUrls && request.imageUrls.length > 0 && (
            <div className="maintenance-detail-images">
              <Carousel
                dots
                autoplay={false}
                className="maintenance-image-carousel"
              >
                {request.imageUrls.map((url, idx) => (
                  <div key={idx} className="carousel-image-wrapper">
                    <Image
                      src={url}
                      alt={`maintenance-${idx}`}
                      className="carousel-image"
                      width="100%"
                      height={220}
                      style={{
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "1px solid rgba(185, 150, 87, 0.35)",
                        boxShadow: "0 4px 12px rgba(185, 150, 87, 0.18)",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          <Paragraph>
            {request.description || "No description provided by resident."}
          </Paragraph>

          <div className="maintenance-bottom-info">
            <Paragraph>
              <Text strong>Status:</Text> {request.status}
            </Paragraph>

            <Paragraph>
              <Text strong>Property:</Text> {request.property}
            </Paragraph>

            <Paragraph>
              <Text strong>Unit:</Text> {request.unit}
            </Paragraph>
          </div>
        </Card>

        {/* RIGHT: conversation + reply */}
        <Card className="maintenance-detail-right">
          {loadingReplies ? (
            <div className="maintenance-loading-center">
              <Spin />
            </div>
          ) : (
            <div className="maintenance-conversation-list">
              {replies.length === 0 ? (
                <div className="maintenance-no-history">
                  No history of conversation.
                </div>
              ) : (
                replies.map((msg) => (
                  <div key={msg.id} className="maintenance-message">
                    <div className="maintenance-message-meta">
                      <Text strong>
                        {msg.author?.displayName ??
                          msg.author?.username ??
                          `User ${msg.author?.id}`}
                      </Text>

                      <Text
                        type="secondary"
                        className="maintenance-message-time"
                      >
                        {formatTime(msg.createdAt)}
                      </Text>
                    </div>

                    <div className="maintenance-message-body">
                      {msg.content}
                    </div>

                    {/* Optional delete button if needed */}
                    {/* <Button size="small" danger onClick={() => handleDeleteReply(msg.id)}>
                      Delete
                    </Button> */}
                  </div>
                ))
              )}
            </div>
          )}

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
              className="maintenance-send-reply"
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
