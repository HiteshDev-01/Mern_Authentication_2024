import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input.jsx";
import { Lock, Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ResetPassworPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword, error, isLoading, message } = useAuthStore();
  console.log(message);
  console.log(error);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);

      toast.success(
        "Password reset successfully, redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-black bg-opacity-50 rounded-2xl shadow-lg overflow-hidden backdrop-filter backdrop-blur-xl"
    >
      <div className="p-8">
        <h2 className="text-3xl text-center mb-3 font-bold bg-gradient-to-r from-green-400 to bg-emerald-400 bg-clip-text text-transparent">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <Input
            icon={Lock}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
          {message && <p className="text-sm text-green-500 mb-2">{message}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto" />
            ) : (
              "Reset password"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassworPage;
