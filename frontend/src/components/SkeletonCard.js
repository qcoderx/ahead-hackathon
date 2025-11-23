import React from "react";
import { motion } from "framer-motion";

const SkeletonCard = ({ height = "h-24", className = "" }) => {
  return (
    <motion.div
      className={`${height} ${className} bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-shimmer" />
    </motion.div>
  );
};

export default SkeletonCard;
