import React, { useEffect, useState } from "react";
import { Layout, Button, Typography, Avatar, Badge } from "antd";
import "../../css/dashboard/DashboardHeader.css";
import { HomeOutlined, BellOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Text } = Typography;

export default function DashboardHeader({ pageTitle, user }) {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (path) => () => navigate(path);

  const location = useLocation();
  const currentPath = location?.pathname || "/";

  const navItems = [
    { key: "dashboard", label: "Dashboard", path: "/dashboard" },
    { key: "newsletter", label: "Newsletter", path: "/newsletter/1" },
    { key: "amenities", label: "Amenities", path: "/amenity/info" },
    { key: "reserve", label: "Reserve", path: "/amenity/reserve" },
    { key: "policies", label: "Policies", path: "/policy" },
    { key: "discussion", label: "Discussion", path: "/discussion" },
    { key: "maintenance", label: "Maintenance", path: "/maintenance" },
  ];

  const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return "U";
    const parts = nameOrEmail.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  return (
    <Layout.Header
      className={`dashboard-header hotel-header ${isSticky ? "is-sticky" : ""}`}
    >
      <div className="header-left">
        <Button
          type="link"
          icon={<HomeOutlined />}
          className="home-btn"
          onClick={goTo("/dashboard")}
        />

        <nav className="header-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Button
              key={item.key}
              type={currentPath.startsWith(item.path) ? "primary" : "link"}
              className={
                "nav-item " +
                (currentPath.startsWith(item.path) ? "active" : "")
              }
              onClick={goTo(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="header-right">
        <div className="header-notif">
          <Badge count={999} size="small">
            <Button
              type="link"
              icon={<BellOutlined />}
              className="notif-btn"
              onClick={goTo("/notifications")}
            />
          </Badge>
        </div>
        <div className="header-user" onClick={goTo("/profile")}>
          <Text className="hotel-text-secondary">
            {user?.name || user?.email || "Resident name"}
          </Text>
          <Avatar size={32} className="hotel-avatar">
            {getInitials(user?.name || user?.email)}
          </Avatar>
        </div>
      </div>
    </Layout.Header>
  );
}
