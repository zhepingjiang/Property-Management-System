import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/login/LoginPage";
import ForgotPasswordModal from "./components/login/ForgotPasswordModal";
import CreateAccountModal from "./components/login/CreateAccountModal";
import UserProfile from "./components/login/UserProfile";
import DashboardLayout from "./components/dashboard/DashboardLayout";

import NewsletterDetailPage from "./components/newsletter/NewsletterDetailPage";
import AmenityInfoPage from "./components/amenity/AmenityInfoPage";
import AmenityReservationPage from "./components/amenity/AmenityReservationPage";
import DiscussionPage from "./components/discussion/DiscussionPage";
import MaintenanceRequestsPage from "./components/maintenance/MaintenanceRequestsPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

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
              <DashboardLayout pageTitle={"Profile"} user={user}>
                <div className="profile-container">
                  <UserProfile user={user} onLogout={handleLogout} />
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
              <DashboardLayout pageTitle={"Dashboard"} user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Amenity Pages (rendered inside DashboardLayout for consistent UI) */}
        <Route
          path="/amenity/info"
          element={
            user ? (
              <DashboardLayout pageTitle={"Amenity / Details"} user={user}>
                <AmenityInfoPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/amenity/reserve"
          element={
            user ? (
              <DashboardLayout
                pageTitle={"Reserve Amenity / Confirm"}
                user={user}
              >
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
              <DashboardLayout pageTitle={"Newsletter / Detail"} user={user}>
                <NewsletterDetailPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Discussion Board */}
        <Route path="/discussion" element={<DiscussionPage />} />

        {/* Maintenance Board */}
        <Route path="/maintenance" element={<MaintenanceRequestsPage />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
