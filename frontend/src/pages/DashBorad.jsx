import React from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore.js";
import { formatDate } from "../utils/date.js";

const DashBoard = () => {
  const { user, isAuthenticated, logout, error } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-gray-950 max-w-md w-full backdrop-filter backdrop-blur-xl rounded-lg"
    >
      <h2 className="text-3xl flex justify-center font-semibold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent p-5">
        Dashborad Page
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900 p-3 m-5 rounded-md mb-3"
      >
        <p className="text-white font-semibold"> Name : {user.name}</p>
        <p className="text-white font-semibold"> Email : {user.email}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-900 p-3 m-5 rounded-md"
      >
        <p className="text-white font-semibold">
          Joined At :{" "}
          {new Date(user.createdAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-white font-semibold">Last Login : {formatDate(user.lastLogin)}</p>
      </motion.div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex justify-center">
        <motion.button
          initial={{opacity:0,y:10}}
          animate={{opacity:1, y:0}}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 0.4 }}
          className="w-full m-5 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DashBoard;
