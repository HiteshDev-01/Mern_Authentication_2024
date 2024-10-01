import { useEffect } from "react";
import FalshRouting from "./components/FalshRouting";
import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./pages/DashBorad.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore.js";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ForgotPassword from "./pages/ForgotPasswordPage.jsx";
import ResetPassworPage from "./pages/ResetPassworPage.jsx";

const RedirectAuthenticatedUser = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-black flex items-center justify-center relative">
      <FalshRouting
        color={"bg-white"}
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FalshRouting
        color={"bg-white"}
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={0}
      />
      <FalshRouting
        color={"bg-white"}
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={0}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/verify-email"
          element={
            <RedirectAuthenticatedUser>
              <EmailVerificationPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassworPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
