import React from "react";
import { motion } from "framer-motion";

const FalshRouting = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 ${color} ${size}`}
      style={{ top, left }}
      animate={{
        x: ["0%", "100%", "0%"],
        y: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden={true}
    ></motion.div>
  );
};

export default FalshRouting;
