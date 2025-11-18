import React, { useState } from "react";
import { Modal, Card, Input, Upload, Button, Typography } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../css/discussion/CreatePostModal.css";

const { Title } = Typography;
const { TextArea } = Input;

export default function CreatePostModal({ onClose }) {
  const [files, setFiles] = useState([]);

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 500);
  };

  const handleChange = ({ fileList }) => {
    if (fileList.length <= 3) {
      setFiles(fileList);
    }
  };

  const removeFile = (file) => {
    setFiles(files.filter((f) => f.uid !== file.uid));
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

        {/* Post title */}
        <Input placeholder="Post title" className="create-post-input" />

        {/* Post description */}
        <TextArea
          placeholder="Post description"
          className="create-post-input"
          autoSize={{ minRows: 4 }}
        />

        {/* Drag-drop uploader */}
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

        {/* File list */}
        {files.map((f) => (
          <div key={f.uid} className="uploaded-file-row">
            <span>{f.name}</span>
            <DeleteOutlined
              className="delete-file-icon"
              onClick={() => removeFile(f)}
            />
          </div>
        ))}

        <Button type="primary" size="large" block className="create-post-btn">
          Create Post
        </Button>
      </Card>
    </Modal>
  );
}
