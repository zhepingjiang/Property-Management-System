import React, { useState } from "react";
import LoginPage, {
  ForgotPasswordModal,
  CreateAccountModal,
  UserProfile,
} from "./components/LoginPage";

const App = () => {
  const [currentView, setCurrentView] = useState("login");
  const [user, setUser] = useState(null);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView("profile");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("login");
  };

  return (
    <div className="App">
      {currentView === "login" && (
        <>
          <LoginPage onLoginSuccess={handleLoginSuccess} />
          <ForgotPasswordModal
            isOpen={isForgotPasswordOpen}
            onClose={() => setIsForgotPasswordOpen(false)}
          />
          <CreateAccountModal
            isOpen={isCreateAccountOpen}
            onClose={() => setIsCreateAccountOpen(false)}
          />
        </>
      )}

      {currentView === "profile" && user && (
        <div>
          <UserProfile user={user} />
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
