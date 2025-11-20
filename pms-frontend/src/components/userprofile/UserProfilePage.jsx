import React, { useState } from "react";
import { Card, Input, Button, Upload, Avatar, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../css/userprofile/UserProfilePage.css";

const { Title, Text } = Typography;

const ROLE_LABELS = {
  ROLE_RESIDENT: "Resident",
  ROLE_TRUSTEE: "Faculty",
};

export default function UserProfilePage({ user, onLogout }) {
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: user.username,
    email: user.email,
    phone: user.phone || "",
    unit: user.unit || "",
    bio: user.bio || "",
    role: user.role,
  });

  const handleAvatarUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
      message.success("Avatar updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-container">
        {/* LEFT MAIN PROFILE CARD */}
        <Card className="profile-card">
          <div className="profile-header">
            <Avatar src={avatar} size={120} className="profile-avatar" />

            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              customRequest={handleAvatarUpload}
            >
              <Button icon={<UploadOutlined />} className="profile-upload-btn">
                Change Avatar
              </Button>
            </Upload>

            <Title level={3} className="profile-name">
              {formData.name}
            </Title>

            {formData.unit && (
              <Text className="profile-unit">{formData.unit}</Text>
            )}
          </div>

          {/* Editable fields */}
          <div className="profile-form">
            <div className="profile-field">
              <Text className="profile-label">Name</Text>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="profile-input"
              />
            </div>

            <div className="profile-field">
              <Text className="profile-label">Email</Text>
              <Input
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="profile-input"
              />
            </div>

            <div className="profile-field">
              <Text className="profile-label">Phone</Text>
              <Input
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="profile-input"
              />
            </div>

            <div className="profile-field">
              <Text className="profile-label">Bio</Text>
              <Input.TextArea
                autoSize={{ minRows: 3 }}
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="profile-input"
              />
            </div>

            <Button type="primary" className="profile-save-btn">
              Save Changes
            </Button>

            {/* ✅ Logout button integrated */}
            <Button danger className="profile-logout-btn" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </Card>

        {/* RIGHT SIDE QUICK SUMMARY CARD */}
        <Card className="profile-side-card">
          <Title level={4} className="side-title">
            Account Info
          </Title>

          <div className="side-row">
            <Text className="side-label">Role:</Text>
            <Text className="side-value">{ROLE_LABELS[formData.role]}</Text>
          </div>

          <div className="side-row">
            <Text className="side-label">Unit:</Text>
            <Text className="side-value">{formData.unit || "N/A"}</Text>
          </div>

          <div className="side-row">
            <Text className="side-label">Email:</Text>
            <Text className="side-value">{formData.email}</Text>
          </div>

          <div className="side-row">
            <Text className="side-label">Phone:</Text>
            <Text className="side-value">{formData.phone || "N/A"}</Text>
          </div>

          <div className="side-divider"></div>

          <Button danger className="profile-delete-btn">
            Delete Account
          </Button>
        </Card>
      </div>
    </div>
  );
}
