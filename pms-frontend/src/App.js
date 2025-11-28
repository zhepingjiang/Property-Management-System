import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/login/LoginPage";
import ForgotPasswordModal from "./components/login/ForgotPasswordModal";
import CreateAccountModal from "./components/login/CreateAccountModal";
import UserProfilePage from "./components/userprofile/UserProfilePage";
import DashboardLayout from "./components/dashboard/DashboardLayout";

import NewsletterDetailPage from "./components/newsletter/NewsletterDetailPage";
import AmenityHomePage from "./components/amenity/AmenityHomePage";
import TrendingEventsPage from "./components/event/TrendingEventsPage";
import AmenityReservationPage from "./components/amenity/AmenityReservationPage";
import DiscussionPage from "./components/discussion/DiscussionPage";
import MaintenanceRequestsPage from "./components/maintenance/MaintenanceRequestsPage";
import PolicyAlerts from "./components/policies&alerts/PolicyAlerts";
import PaymentPage from "./components/payment/PaymentPage";
import { Spin } from "antd";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

  const handleLoginSuccess = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userJson = localStorage.getItem("user");

    if (token && userJson) {
      try {
        setUser(JSON.parse(userJson));
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
      }
    }

    setLoading(false); // <-- MUST be outside the if block
  }, []);

  // Prevent flicker while loading user from storage
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EDEDED",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page - redirect to dashboard automatically if already logged in */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <>
                <LoginPage
                  onLoginSuccess={handleLoginSuccess}
                  onForgotPassword={() => setIsForgotPasswordOpen(true)}
                  onCreateAccount={() => setIsCreateAccountOpen(true)}
                />

                <ForgotPasswordModal
                  isOpen={isForgotPasswordOpen}
                  onClose={() => setIsForgotPasswordOpen(false)}
                />

                <CreateAccountModal
                  isOpen={isCreateAccountOpen}
                  onClose={() => setIsCreateAccountOpen(false)}
                  onAccountCreated={handleLoginSuccess}
                />
              </>
            )
          }
        />

        {/* Profile Page */}
        <Route
          path="/profile"
          element={
            user ? (
              <DashboardLayout user={user}>
                <div className="profile-container">
                  <UserProfilePage user={user} onLogout={handleLogout} />
                </div>
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Dashboard Page (still optional) */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <DashboardLayout user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Amenity Pages (rendered inside DashboardLayout for consistent UI) */}
        <Route
          path="/amenity/home"
          element={
            user ? (
              <DashboardLayout user={user}>
                <AmenityHomePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/amenity/reserve/:unit_id"
          element={
            user ? (
              <DashboardLayout user={user}>
                <AmenityReservationPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Newsletter Page */}
        <Route
          path="/newsletter/:id"
          element={
            user ? (
              <DashboardLayout user={user}>
                <NewsletterDetailPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Discussion Board */}
        <Route
          path="/discussion"
          element={
            user ? (
              <DashboardLayout user={user}>
                <DiscussionPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Policy Page */}
        <Route
          path="/policyAlerts"
          element={
            user ? (
              <DashboardLayout user={user}>
                <PolicyAlerts />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Maintenance Board */}
        <Route
          path="/maintenance"
          element={
            user ? (
              <DashboardLayout user={user}>
                <MaintenanceRequestsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Payment Page */}
        <Route
          path="/payment"
          element={
            user ? (
              <DashboardLayout user={user}>
                <PaymentPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Events Page */}
        <Route
          path="/event"
          element={
            user ? (
              <DashboardLayout user={user}>
                <TrendingEventsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
