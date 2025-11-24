import React, { useState } from "react";
import { motion } from "framer-motion";
import ProviderLayout from "../layouts/ProviderLayout";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    weeklyDigest: true,
  });

  const handleToggle = (category, setting) => {
    if (category === "notifications") {
      setNotifications((prev) => ({ ...prev, [setting]: !prev[setting] }));
    }
  };

  return (
    <ProviderLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences.
          </p>
        </motion.header>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
          className="space-y-6"
        >
          {/* Profile Section */}
          <motion.section
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Dr. Sarah Connor"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="sarah.connor@hospital.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  defaultValue="Senior Obstetrician"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  defaultValue="Maternity Ward"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  readOnly
                />
              </div>
            </div>
          </motion.section>

          {/* Notifications Section */}
          <motion.section
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Notifications
            </h2>
            <div className="space-y-4">
              {/* Email Notifications */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive daily summaries and critical alerts via email.
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggle("notifications", "email")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.email
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.email ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </motion.button>
              </motion.div>

              {/* SMS Notifications */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    SMS Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get urgent alerts via text message.
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggle("notifications", "sms")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.sms
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.sms ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </motion.button>
              </motion.div>

              {/* Weekly Digest */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Weekly Digest
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive a weekly summary of patient statistics.
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggle("notifications", "weeklyDigest")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.weeklyDigest
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.weeklyDigest
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.section>

          {/* System Preferences Section */}
          <motion.section
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              System Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>English</option>
                  <option>French</option>
                  <option>Swahili</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Zone
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>East Africa Time (EAT)</option>
                  <option>West Africa Time (WAT)</option>
                  <option>Central Africa Time (CAT)</option>
                </select>
              </div>
            </div>
          </motion.section>

          {/* Actions */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex justify-end gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg font-medium transition-colors"
            >
              Save Changes
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </ProviderLayout>
  );
};

export default Settings;
