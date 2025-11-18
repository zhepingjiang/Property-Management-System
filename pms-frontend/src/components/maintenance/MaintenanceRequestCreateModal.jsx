// src/components/maintenance/MaintenanceRequestCreateModal.jsx
import React, { useState } from "react";
import { Modal, Card, Typography, Input, Upload, Button, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../css/maintenance/MaintenanceRequestCreateModal.css";

const { Title } = Typography;
const { TextArea } = Input;

const MaintenanceRequestCreateModal = ({ category, onCancel, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const handleUpload = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 300);
  };

  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 3) {
      message.warning("You can upload at most 3 images.");
      return;
    }
    setFiles(fileList);
  };

  const handleRemove = (file) => {
    setFiles((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      message.error("Please enter a title for your request.");
      return;
    }
    const payload = {
      title: title.trim(),
      description: description.trim(),
      category,
      attachments: files,
    };
    onSubmit(payload);
  };

  return (
    <Modal
      open={true}
      footer={null}
      onCancel={onCancel}
      width={600}
      className="maintenance-create-modal"
    >
      <Card className="maintenance-create-card">
        <Title level={4} className="maintenance-create-title">
          New Maintenance Request
        </Title>
        <div className="maintenance-create-category">
          Category: <strong>{category}</strong>
        </div>

        <Input
          placeholder="Short title (e.g. 'Oven not heating')"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="maintenance-create-field"
        />

        <TextArea
          placeholder="Describe the issue in more detail…"
          autoSize={{ minRows: 4, maxRows: 6 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="maintenance-create-field"
        />

        <Upload.Dragger
          multiple
          maxCount={3}
          customRequest={handleUpload}
          fileList={files}
          onChange={handleFileChange}
          showUploadList={false}
          className="maintenance-create-uploader"
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p>Click or drag image files here to upload (optional, max 3).</p>
        </Upload.Dragger>

        {files.length > 0 && (
          <div className="maintenance-uploaded-files">
            {files.map((file) => (
              <div key={file.uid} className="maintenance-uploaded-row">
                <span>{file.name}</span>
                <DeleteOutlined
                  className="maintenance-uploaded-remove"
                  onClick={() => handleRemove(file)}
                />
              </div>
            ))}
          </div>
        )}

        <Button
          type="primary"
          block
          className="maintenance-create-submit"
          onClick={handleSubmit}
        >
          Submit Request
        </Button>
      </Card>
    </Modal>
  );
};

export default MaintenanceRequestCreateModal;
