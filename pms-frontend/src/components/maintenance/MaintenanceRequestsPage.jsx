// src/components/maintenance/MaintenanceRequestsPage.jsx
import React, { useState } from "react";
import { Button, Card, Tag, Typography } from "antd";
import {
  ToolOutlined,
  BulbOutlined,
  HomeOutlined,
  DashboardOutlined,
  CloudOutlined,
  BuildOutlined,
  CarOutlined,
  SoundOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import MaintenanceRequestDetailModal from "./MaintenanceRequestDetailModal";
import MaintenanceRequestCreateModal from "./MaintenanceRequestCreateModal";

import "../../css/maintenance/MaintenanceRequestsPage.css";

const { Title, Text } = Typography;

const initialRequests = [
  {
    id: "MR-1001",
    title: "Oven not heating properly",
    description: "The oven in Unit 1205 doesn't reach the set temperature.",
    status: "NEW",
    property: "Fairview",
    unit: "Unit 1205",
    category: "Appliances",
    conversations: [
      {
        author: "Resident",
        message: "Noticed this issue last night, tried twice.",
        timestamp: "2025-11-10 19:30",
      },
    ],
  },
  {
    id: "MR-1002",
    title: "No power in bedroom outlets",
    description:
      "All outlets in the master bedroom stopped working, lights still fine.",
    status: "IN_PROGRESS",
    property: "Fairview",
    unit: "Unit 803",
    category: "Electrical",
    conversations: [
      {
        author: "Trustee",
        message: "Electrician scheduled for tomorrow 2–4 PM.",
        timestamp: "2025-11-11 09:15",
      },
    ],
  },
  {
    id: "MR-1003",
    title: "Water leak near kitchen sink",
    description: "Cabinet under sink is damp, slow leak from pipe.",
    status: "IN_PROGRESS",
    property: "Fairview",
    unit: "Unit 316",
    category: "Plumbing",
    conversations: [],
  },
  {
    id: "MR-1004",
    title: "Window seal broken in living room",
    description: "Strong draft from large window, seems the seal is damaged.",
    status: "RESOLVED",
    property: "Maison",
    unit: "Unit 507",
    category: "House Exterior",
    conversations: [
      {
        author: "Trustee",
        message: "Seal replaced on 2025-11-05.",
        timestamp: "2025-11-05 15:40",
      },
      {
        author: "Resident",
        message: "Feels much better now, thank you!",
        timestamp: "2025-11-06 10:05",
      },
    ],
  },
];

const maintenanceCategories = [
  {
    key: "Appliances",
    icon: <ToolOutlined />,
    subtitle: "Stove, dishwasher, fridge, washer / dryer",
  },
  {
    key: "Electrical",
    icon: <BulbOutlined />,
    subtitle: "Lights, outlets, breakers, wiring",
  },
  {
    key: "House Exterior",
    icon: <HomeOutlined />,
    subtitle: "Roof, doors, windows, balcony",
  },
  {
    key: "Household",
    icon: <DashboardOutlined />,
    subtitle: "Interior doors, walls, flooring",
  },
  {
    key: "Outdoors",
    icon: <CloudOutlined />,
    subtitle: "Yard, walkways, common outdoor areas",
  },
  {
    key: "Plumbing",
    icon: <BuildOutlined />,
    subtitle: "Sinks, toilets, showers, leaks",
  },
  {
    key: "Parking & Garage",
    icon: <CarOutlined />,
    subtitle: "Garage door, gate, parking stalls",
  },
  {
    key: "Noise / Disturbance",
    icon: <SoundOutlined />,
    subtitle: "Loud neighbors, parties, ongoing noise",
  },
  {
    key: "Other",
    icon: <QuestionCircleOutlined />,
    subtitle: "Anything not listed above",
  },
];

const MaintenanceRequestsPage = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [viewMode, setViewMode] = useState("board"); // "board" | "category"
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const openBoard = () => {
    setHidden(false);
    setViewMode("board");
    setSelectedCategory(null);
  };

  const handleAddClick = () => {
    setHidden(true);
    setViewMode("category");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = (newRequestData) => {
    const newRequest = {
      id: `MR-${1000 + requests.length + 1}`,
      status: "NEW",
      conversations: [],
      ...newRequestData,
    };
    setRequests((prev) => [newRequest, ...prev]);
    setIsCreateOpen(false);
    openBoard();
  };

  const byStatus = (status) =>
    requests.filter((r) => r.status === status.toUpperCase());

  return (
    <div className="maintenance-page">
      {/* Header */}
      <div className="maintenance-header">
        <div className="maintenance-header-left">
          <Title level={3} className="maintenance-title">
            Maintenance Requests
          </Title>
          {viewMode === "category" && (
            <Text type="secondary" className="maintenance-subtitle">
              Select a category to create a new request
            </Text>
          )}
        </div>
        <div className="maintenance-header-right">
          {viewMode === "category" && (
            <Button
              type="default"
              className="maintenance-header-btn"
              onClick={openBoard}
            >
              Back to Requests
            </Button>
          )}

          {!hidden && (
            <Button
              type="primary"
              className="maintenance-header-btn"
              onClick={handleAddClick}
            >
              Add Maintenance Request
            </Button>
          )}
        </div>
      </div>

      {viewMode === "board" && (
        <div className="maintenance-board">
          {/* New */}
          <div className="status-column">
            <div className="status-column-header">
              <Text className="status-column-title">New</Text>
              <Tag color="blue">{byStatus("NEW").length}</Tag>
            </div>
            {byStatus("NEW").map((req) => (
              <Card
                key={req.id}
                className="request-card"
                onClick={() => setSelectedRequest(req)}
                hoverable
              >
                <div className="request-card-title">{req.title}</div>
                <div className="request-card-meta">
                  <Text type="secondary">
                    {req.property}, {req.unit}
                  </Text>
                </div>
                <div className="request-card-footer">
                  <Tag>{req.category}</Tag>
                  <Button size="small" type="link">
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* In Progress */}
          <div className="status-column">
            <div className="status-column-header">
              <Text className="status-column-title">In Progress</Text>
              <Tag color="gold">{byStatus("IN_PROGRESS").length}</Tag>
            </div>
            {byStatus("IN_PROGRESS").map((req) => (
              <Card
                key={req.id}
                className="request-card"
                onClick={() => setSelectedRequest(req)}
                hoverable
              >
                <div className="request-card-title">{req.title}</div>
                <div className="request-card-meta">
                  <Text type="secondary">
                    {req.property}, {req.unit}
                  </Text>
                </div>
                <div className="request-card-footer">
                  <Tag color="gold">{req.category}</Tag>
                  <Button size="small" type="link">
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Resolved */}
          <div className="status-column">
            <div className="status-column-header">
              <Text className="status-column-title">Resolved</Text>
              <Tag color="green">{byStatus("RESOLVED").length}</Tag>
            </div>
            {byStatus("RESOLVED").map((req) => (
              <Card
                key={req.id}
                className="request-card"
                onClick={() => setSelectedRequest(req)}
                hoverable
              >
                <div className="request-card-title">{req.title}</div>
                <div className="request-card-meta">
                  <Text type="secondary">
                    {req.property}, {req.unit}
                  </Text>
                </div>
                <div className="request-card-footer">
                  <Tag color="green">{req.category}</Tag>
                  <Button size="small" type="link">
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {viewMode === "category" && (
        <div className="maintenance-category-grid">
          {maintenanceCategories.map((cat) => (
            <Card
              key={cat.key}
              className="maintenance-category-card"
              hoverable
              onClick={() => handleCategoryClick(cat.key)}
            >
              <div className="maintenance-category-icon">{cat.icon}</div>
              <div className="maintenance-category-name">{cat.key}</div>
              <div className="maintenance-category-subtitle">
                {cat.subtitle}
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedRequest && (
        <MaintenanceRequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}

      {isCreateOpen && selectedCategory && (
        <MaintenanceRequestCreateModal
          category={selectedCategory}
          onCancel={() => setIsCreateOpen(false)}
          onSubmit={handleCreateSubmit}
        />
      )}
    </div>
  );
};

export default MaintenanceRequestsPage;
