import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input.jsx";
import { Mail, User, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import { useAuthStore } from "../store/authStore.js";

const Signup = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, isLoading, error } = useAuthStore();

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      await signup(mail, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md bg-black bg-opacity-40 w-full backdrop-filter backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            icon={Mail}
            placeholder="Email Address"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <PasswordStrengthMeter password={password} />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Signup"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-800 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">Already have an account ?</p>
        <Link to="/login" className="text-green-400 hover:underline ml-2">
          Login
        </Link>
      </div>
    </motion.div>
  );
};

export default Signup;
