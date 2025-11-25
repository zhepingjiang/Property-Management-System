// src/components/maintenance/MaintenanceRequestsPage.jsx
import React, { useState, useEffect } from "react";
import { Button, Card, Tag, Typography, Spin } from "antd";
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

import { getAllRequests, createRequest as apiCreateRequest } from "./utils"; // adjust path if needed

import MaintenanceRequestDetailModal from "./MaintenanceRequestDetailModal";
import MaintenanceRequestCreateModal from "./MaintenanceRequestCreateModal";

import "../../css/maintenance/MaintenanceRequestsPage.css";

const { Title, Text } = Typography;

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
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("board"); // "board" | "category"
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  /* ================================
     LOAD REQUESTS FROM BACKEND
  ================================= */
  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await getAllRequests(); // backend returns MaintenanceRequestDto[]
      setRequests(data);
    } catch (err) {
      console.error("Failed to load maintenance requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const openBoard = () => {
    setViewMode("board");
    setSelectedCategory(null);
  };

  const handleAddClick = () => {
    setViewMode("category");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsCreateOpen(true);
  };

  /* ================================
     CREATE REQUEST (REAL DB CALL)
  ================================= */
  const handleCreateSubmit = async (formValues) => {
    try {
      await apiCreateRequest(formValues);
      await loadRequests(); // refresh list
    } catch (err) {
      console.error("Create request failed:", err);
    }

    setIsCreateOpen(false);
    openBoard();
  };

  const byStatus = (status) => requests.filter((r) => r.status === status);

  if (loading) {
    return (
      <div className="maintenance-loading">
        <Spin size="large" />
      </div>
    );
  }

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

          <Button
            type="primary"
            className="maintenance-header-btn"
            onClick={handleAddClick}
          >
            Add Maintenance Request
          </Button>
        </div>
      </div>

      {/* =============================== */}
      {/*  BOARD MODE */}
      {/* =============================== */}
      {viewMode === "board" && (
        <div className="maintenance-board">
          {/* ===================== */}
          {/* NEW */}
          {/* ===================== */}
          <div className="status-column">
            <div className="status-column-header">
              <Text className="status-column-title">New</Text>
              <Tag color="blue">{byStatus("SUBMITTED").length}</Tag>
            </div>

            <div className="status-column-body">
              {byStatus("SUBMITTED").length === 0 ? (
                <div className="empty-placeholder">
                  No submitted maintenance requests yet
                </div>
              ) : (
                byStatus("SUBMITTED").map((req) => (
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
                ))
              )}
            </div>
          </div>

          {/* ===================== */}
          {/* IN PROGRESS */}
          {/* ===================== */}
          <div className="status-column">
            <div className="status-column-header">
              <Text className="status-column-title">In Progress</Text>
              <Tag color="gold">{byStatus("IN_PROGRESS").length}</Tag>
            </div>

            <div className="status-column-body">
              {byStatus("IN_PROGRESS").length === 0 ? (
                <div className="empty-placeholder">
                  No in progress maintenance requests yet
                </div>
              ) : (
                byStatus("IN_PROGRESS").map((req) => (
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
                ))
              )}
            </div>
          </div>

          {/* ===================== */}
          {/* RESOLVED */}
          {/* ===================== */}
          <div className="status-column">
            <div className="status-column-header">
              <Text className="status-column-title">Resolved</Text>
              <Tag color="green">{byStatus("RESOLVED").length}</Tag>
            </div>

            <div className="status-column-body">
              {byStatus("RESOLVED").length === 0 ? (
                <div className="empty-placeholder">
                  No Resolved maintenance requests yet
                </div>
              ) : (
                byStatus("RESOLVED").map((req) => (
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
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* =============================== */}
      {/* CATEGORY PICK MODE */}
      {/* =============================== */}
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

      {/* Details Modal */}
      {selectedRequest && (
        <MaintenanceRequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}

      {/* Create Modal */}
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
