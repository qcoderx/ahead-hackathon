import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "md", color = "primary" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colors = {
    primary: "border-primary",
    white: "border-white",
    gray: "border-gray-600",
  };

  return (
    <motion.div
      className={`${sizes[size]} border-4 ${colors[color]} border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export default LoadingSpinner;
