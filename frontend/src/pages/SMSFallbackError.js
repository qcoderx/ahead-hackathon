import React from "react";
import { motion } from "framer-motion";
import ProviderLayout from "../layouts/ProviderLayout";

const SMSFallbackError = () => {
  return (
    <ProviderLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-[#111812] dark:text-white text-3xl font-black leading-tight tracking-tight">
            SMS Fallback & Error Logs
          </h1>
          <p className="text-[#618968] dark:text-gray-400 text-base font-normal leading-normal">
            System health monitoring and offline synchronization logs.
          </p>
        </motion.div>

        {/* System Health Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            type: "spring",
            stiffness: 300,
          }}
          className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 flex items-start gap-4"
        >
          <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full text-green-600 dark:text-green-200">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-800 dark:text-green-100">
              System Operational
            </h3>
            <p className="text-green-700 dark:text-green-300 mt-1">
              All services are running normally. SMS Gateway latency is 240ms.
              Offline sync is active.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {[
            {
              label: "SMS Sent (24h)",
              value: "1,842",
              status: "99.2% Delivery Rate",
              color: "text-[#078825]",
            },
            {
              label: "Failed / Retrying",
              value: "14",
              status: "Auto-retrying in 5m",
              color: "text-yellow-600",
            },
            {
              label: "Offline Sync Events",
              value: "328",
              status: "Last sync: 2 mins ago",
              color: "text-blue-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]"
            >
              <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
                {stat.label}
              </p>
              <p className="text-[#111812] dark:text-white tracking-light text-4xl font-bold leading-tight">
                {stat.value}
              </p>
              <p className={`${stat.color} text-sm font-medium leading-normal`}>
                {stat.status}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Error Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Recent Error Logs
            </h3>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Export Logs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Clear Resolved
              </motion.button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#dbe6dd] dark:border-[#2a4d31] text-[#618968] dark:text-gray-400">
                <tr>
                  <th className="py-3 px-4 font-medium">Timestamp</th>
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Message</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Retry Count</th>
                </tr>
              </thead>
              <motion.tbody
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.7,
                    },
                  },
                }}
                className="divide-y divide-[#dbe6dd] dark:divide-[#2a4d31]"
              >
                {[
                  {
                    timestamp: "2024-11-19 10:23:45",
                    type: "SMS_GATEWAY_TIMEOUT",
                    message: "Connection timed out to Provider A",
                    status: "Retrying",
                    statusBg: "bg-yellow-100 dark:bg-yellow-900/50",
                    statusText: "text-yellow-700 dark:text-yellow-300",
                    retry: "3/5",
                  },
                  {
                    timestamp: "2024-11-19 09:15:22",
                    type: "SYNC_CONFLICT",
                    message: "Patient ID P-4421 record version mismatch",
                    status: "Failed",
                    statusBg: "bg-red-100 dark:bg-red-900/50",
                    statusText: "text-red-700 dark:text-red-300",
                    retry: "0",
                  },
                  {
                    timestamp: "2024-11-19 08:45:10",
                    type: "INVALID_NUMBER",
                    message: "Failed to send alert to +254700...",
                    status: "Resolved",
                    statusBg: "bg-gray-100 dark:bg-gray-700",
                    statusText: "text-gray-700 dark:text-gray-300",
                    retry: "-",
                  },
                ].map((log, index) => (
                  <motion.tr
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    className="hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        {log.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#111812] dark:text-white">
                      {log.message}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`${log.statusBg} ${log.statusText} px-2 py-1 rounded-full text-xs font-bold`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      {log.retry}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </ProviderLayout>
  );
};

export default SMSFallbackError;
