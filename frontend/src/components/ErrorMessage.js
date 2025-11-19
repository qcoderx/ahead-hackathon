import React from "react";
import { motion } from "framer-motion";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
      className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      >
        <span className="material-symbols-outlined text-red-600 dark:text-red-400">
          error
        </span>
      </motion.div>
      <div className="flex-1">
        <p className="text-red-800 dark:text-red-200 text-sm font-medium">
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;
