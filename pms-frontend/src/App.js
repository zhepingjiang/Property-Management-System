import React, { useState } from "react";
import LoginPage, {
  ForgotPasswordModal,
  CreateAccountModal,
  UserProfile,
} from "./components/LoginPage";
import ResidentDashboard from "./components/ResidentDashboard";

const App = () => {
  const [currentView, setCurrentView] = useState("login");
  const [user, setUser] = useState(null);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    console.log("Login successful, user data:", userData);
    setUser(userData);

    // Redirect based on user role
    if (userData.role === "resident") {
      setCurrentView("resident-dashboard");
    } else if (userData.role === "faculty") {
      setCurrentView("faculty-dashboard");
    } else {
      setCurrentView("profile");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("login");
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      {/* Login View */}
      {currentView === "login" && (
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
      )}

      {/* Resident Dashboard View */}
      {currentView === "resident-dashboard" && user && (
        <ResidentDashboard
          user={user}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      )}

      {/* Profile View */}
      {currentView === "profile" && user && (
        <div className="profile-container">
          <UserProfile user={user} onLogout={handleLogout} />
          <div className="navigation-buttons">
            <button
              onClick={() => setCurrentView("resident-dashboard")}
              className="nav-btn"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Faculty Dashboard Placeholder */}
      {currentView === "faculty-dashboard" && user && (
        <div className="faculty-placeholder">
          <h1>Faculty Dashboard</h1>
          <p>Welcome, {user.name}!</p>
          <p>Faculty dashboard is under development.</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
