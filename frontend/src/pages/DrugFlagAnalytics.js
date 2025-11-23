import React from "react";
import { motion } from "framer-motion";
import ProviderLayout from "../layouts/ProviderLayout";

const DrugFlagAnalytics = () => {
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
            Drug Flag Analytics
          </h1>
          <p className="text-[#618968] dark:text-gray-400 text-base font-normal leading-normal">
            Monitoring medication safety checks and interaction alerts.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-4"
        >
          {[
            {
              label: "Total Checks (Today)",
              value: "156",
              color: "text-[#111812] dark:text-white",
            },
            {
              label: "Red Flags (Unsafe)",
              value: "12",
              color: "text-red-600 dark:text-red-400",
              subtitle: "7.6% of checks",
            },
            {
              label: "Yellow Flags (Caution)",
              value: "28",
              color: "text-yellow-600 dark:text-yellow-400",
              subtitle: "17.9% of checks",
            },
            {
              label: "Most Flagged Drug",
              value: "Ibuprofen",
              color: "text-[#111812] dark:text-white",
              subtitle: "Third Trimester Risk",
              size: "text-2xl",
            },
          ].map((kpi, index) => (
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
                {kpi.label}
              </p>
              <p
                className={`${kpi.color} tracking-light ${
                  kpi.size || "text-4xl"
                } font-bold leading-tight ${
                  kpi.size === "text-2xl" ? "truncate" : ""
                }`}
              >
                {kpi.value}
              </p>
              {kpi.subtitle && (
                <p className="text-sm text-gray-500">{kpi.subtitle}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Flag Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6"
          >
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Flag Categories
            </h3>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.7,
                  },
                },
              }}
              className="flex flex-col gap-3 pt-2"
            >
              {[
                { label: "Teratogenic Risk", percent: 45, color: "bg-red-600" },
                {
                  label: "Drug-Drug Interaction",
                  percent: 30,
                  color: "bg-orange-500",
                },
                {
                  label: "Dosage Warning",
                  percent: 15,
                  color: "bg-yellow-500",
                },
                {
                  label: "Breastfeeding Risk",
                  percent: 10,
                  color: "bg-blue-500",
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="space-y-1"
                >
                  <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                    <span>{category.label}</span>
                    <span>{category.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percent}%` }}
                      transition={{
                        duration: 1,
                        delay: 0.8 + index * 0.15,
                        ease: "easeOut",
                      }}
                      className={`${category.color} h-2.5 rounded-full`}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Recent Flags */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6"
          >
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Recent Flags
            </h3>
            <motion.div
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
              className="flex flex-col gap-3"
            >
              {[
                {
                  drug: "Ibuprofen",
                  risk: "High",
                  color: "text-red-600 dark:text-red-400",
                  bg: "bg-red-100 dark:bg-red-900/20",
                },
                {
                  drug: "Aspirin",
                  risk: "Medium",
                  color: "text-yellow-600 dark:text-yellow-400",
                  bg: "bg-yellow-100 dark:bg-yellow-900/20",
                },
                {
                  drug: "Codeine",
                  risk: "High",
                  color: "text-red-600 dark:text-red-400",
                  bg: "bg-red-100 dark:bg-red-900/20",
                },
                {
                  drug: "Warfarin",
                  risk: "High",
                  color: "text-red-600 dark:text-red-400",
                  bg: "bg-red-100 dark:bg-red-900/20",
                },
              ].map((flag, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-[#111812] dark:text-white">
                      {flag.drug}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Flagged 2 hours ago
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${flag.color} ${flag.bg}`}
                  >
                    {flag.risk}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Top Flagged Drugs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] overflow-hidden"
        >
          <div className="p-6 border-b border-[#dbe6dd] dark:border-[#2a4d31]">
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Top Flagged Drugs (This Week)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Drug Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Flags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
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
                      staggerChildren: 0.05,
                      delayChildren: 0.9,
                    },
                  },
                }}
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {[
                  {
                    name: "Ibuprofen",
                    flags: 45,
                    risk: "High",
                    category: "NSAID",
                  },
                  {
                    name: "Aspirin",
                    flags: 32,
                    risk: "Medium",
                    category: "Antiplatelet",
                  },
                  {
                    name: "Codeine",
                    flags: 28,
                    risk: "High",
                    category: "Opioid",
                  },
                  {
                    name: "Warfarin",
                    flags: 24,
                    risk: "High",
                    category: "Anticoagulant",
                  },
                  {
                    name: "Metformin",
                    flags: 18,
                    risk: "Low",
                    category: "Antidiabetic",
                  },
                ].map((drug, index) => (
                  <motion.tr
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111812] dark:text-white">
                      {drug.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {drug.flags}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          drug.risk === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                            : drug.risk === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        }`}
                      >
                        {drug.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {drug.category}
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

export default DrugFlagAnalytics;
