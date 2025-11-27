// src/components/maintenance/MaintenanceRequestCreateModal.jsx
import React, { useState } from "react";
import {
  Modal,
  Card,
  Typography,
  Input,
  Upload,
  Button,
  message,
  Select,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../css/maintenance/MaintenanceRequestCreateModal.css";

const { Title } = Typography;
const { TextArea } = Input;

const priorities = ["LOW", "MEDIUM", "HIGH"];

const MaintenanceRequestCreateModal = ({ category, onCancel, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [property, setProperty] = useState("");
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [assignedTo, setAssignedTo] = useState(null);

  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  /* ============================
     IMAGE UPLOAD HANDLERS
  ============================= */
  const handleUpload = ({ onSuccess }) => {
    setTimeout(() => onSuccess("ok"), 300);
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

  /* ============================
     SUBMIT
  ============================= */
  const handleSubmit = () => {
    if (!title.trim()) {
      message.error("Please enter a title.");
      return;
    }
    if (!property.trim()) {
      message.error("Please enter a property (e.g. Fairview).");
      return;
    }
    if (!unit.trim()) {
      message.error("Please enter a unit or location (e.g. Unit 305).");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      category, // display name string
      property: property.trim(),
      unit: unit.trim(),
      priority,
      assignedTo,
      images: files.map((f) => f.originFileObj), // REAL file objects
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

        {/* Property */}
        <Input
          placeholder="Property (e.g. Fairview, Maison)"
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          className="maintenance-create-field"
        />

        {/* Unit / Location */}
        <Input
          placeholder="Unit or Area (e.g. Unit 305, Equipment Area)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="maintenance-create-field"
        />

        {/* Title */}
        <Input
          placeholder="Short title (e.g. 'Oven not heating')"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="maintenance-create-field"
        />

        {/* Description */}
        <TextArea
          placeholder="Describe the issue in more detail…"
          autoSize={{ minRows: 4, maxRows: 6 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="maintenance-create-field"
        />

        {/* Priority */}
        <Select
          value={priority}
          onChange={setPriority}
          className="maintenance-create-field"
        >
          {priorities.map((p) => (
            <Select.Option key={p} value={p}>
              {p}
            </Select.Option>
          ))}
        </Select>

        {/* Assigned To */}
        <Input
          placeholder="Assign to (optional trustee ID)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="maintenance-create-field"
        />

        {/* Image Uploader */}
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
          <p>Click or drag images (max 3, optional)</p>
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

        {/* Submit */}
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
