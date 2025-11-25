import React, { useState } from "react";
import { Modal, Card, Input, Upload, Button, Typography, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { createPost } from "./utils";
import "../../css/discussion/CreatePostModal.css";

const { Title } = Typography;
const { TextArea } = Input;

export default function CreatePostModal({ onClose, onCreated }) {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => onSuccess("ok"), 500);
  };

  const handleChange = ({ fileList }) => {
    if (fileList.length <= 3) setFiles(fileList);
  };

  const removeFile = (file) =>
    setFiles((prev) => prev.filter((f) => f.uid !== file.uid));

  const handleCreatePost = async () => {
    if (!title.trim() && !content.trim()) {
      message.warning("Post must have a title or content.");
      return;
    }

    const images = files.map((f) => f.originFileObj);
    setLoading(true);
    try {
      await createPost({ content: `${title}\n${content}`, images });
      message.success("Post created!");
      onClose();
      onCreated?.();
    } catch (err) {
      console.error(err);
      message.error("Failed to create post");
    }
    setLoading(false);
  };

  return (
    <Modal
      open={true}
      footer={null}
      onCancel={onClose}
      width={600}
      className="create-post-modal"
    >
      <Card className="create-post-card">
        <Title level={4} className="create-post-title">
          Create a Post
        </Title>
        <Input
          placeholder="Post title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Post description"
          className="create-post-input"
          autoSize={{ minRows: 4 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Upload.Dragger
          name="files"
          customRequest={handleUpload}
          fileList={files}
          onChange={handleChange}
          multiple
          maxCount={3}
          className="create-post-uploader"
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p>Click or drag files here (max 3 images)</p>
        </Upload.Dragger>

        {files.map((f) => (
          <div key={f.uid} className="uploaded-file-row">
            <span>{f.name}</span>
            <DeleteOutlined
              className="delete-file-icon"
              onClick={() => removeFile(f)}
            />
          </div>
        ))}

        <Button
          type="primary"
          size="large"
          block
          className="create-post-btn"
          onClick={handleCreatePost}
          loading={loading}
        >
          Create Post
        </Button>
      </Card>
    </Modal>
  );
}
