import React from "react";
import { motion } from "framer-motion";
import ProviderLayout from "../layouts/ProviderLayout";

const HighRiskAnalytics = () => {
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
            High-Risk Cases Analytics
          </h1>
          <p className="text-[#618968] dark:text-gray-400 text-base font-normal leading-normal">
            Detailed insights into high-risk patient trends and alerts.
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
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {[
            {
              label: "Active High-Risk Patients",
              value: "42",
              trend: "+5 this week",
              trendIcon: "arrow_upward",
              trendColor: "text-[#e72608]",
            },
            {
              label: "Unresolved Alerts",
              value: "8",
              trend: "Requires Action",
              trendIcon: "warning",
              trendColor: "text-[#e72608]",
            },
            {
              label: "Avg. Response Time",
              value: "2.5 hrs",
              trend: "-15% vs last month",
              trendIcon: "arrow_downward",
              trendColor: "text-[#078825]",
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
              <p className="text-[#111812] dark:text-white tracking-light text-4xl font-bold leading-tight">
                {kpi.value}
              </p>
              <p
                className={`${kpi.trendColor} text-base font-medium leading-normal flex items-center gap-1`}
              >
                <span className="material-symbols-outlined text-lg">
                  {kpi.trendIcon}
                </span>
                {kpi.trend}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Risk Factor Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6"
          >
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Risk Factor Distribution
            </h3>
            <div className="flex items-center justify-center min-h-[250px]">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                className="relative w-48 h-48"
              >
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="stroke-current text-blue-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray="40, 100"
                  ></motion.path>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="stroke-current text-red-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray="30, 100"
                    strokeDashoffset="-40"
                  ></motion.path>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.1 }}
                    className="stroke-current text-yellow-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray="30, 100"
                    strokeDashoffset="-70"
                  ></motion.path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Factors
                  </span>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 1.3,
                    },
                  },
                }}
                className="ml-8 flex flex-col gap-2"
              >
                {[
                  { color: "bg-blue-500", label: "Preeclampsia (40%)" },
                  { color: "bg-red-500", label: "Hemorrhage Risk (30%)" },
                  {
                    color: "bg-yellow-500",
                    label: "Gestational Diabetes (30%)",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-[#111812] dark:text-gray-300">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Trend Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6"
          >
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              High-Risk Identifications (Last 6 Months)
            </h3>
            <div className="flex items-end justify-between h-[250px] gap-2 pt-4">
              {[30, 45, 35, 60, 50, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 w-full"
                >
                  <div
                    className="w-full bg-red-100 dark:bg-red-900/30 rounded-t-md relative group"
                    style={{ height: "100%" }}
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.7 + i * 0.1,
                        ease: "easeOut",
                      }}
                      className="absolute bottom-0 w-full bg-red-500 rounded-t-md"
                    ></motion.div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detailed List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6"
        >
          <h3 className="text-lg font-bold text-[#111812] dark:text-white">
            Recent High-Risk Alerts
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#dbe6dd] dark:border-[#2a4d31] text-[#618968] dark:text-gray-400">
                <tr>
                  <th className="py-3 px-4 font-medium">Patient</th>
                  <th className="py-3 px-4 font-medium">Risk Factor</th>
                  <th className="py-3 px-4 font-medium">Detected By</th>
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Action</th>
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
                      delayChildren: 0.9,
                    },
                  },
                }}
                className="divide-y divide-[#dbe6dd] dark:divide-[#2a4d31]"
              >
                {[
                  {
                    patient: "Sarah Connor",
                    risk: "Severe Hypertension",
                    riskColor: "text-red-600",
                    doctor: "Dr. Silberman",
                    date: "Today, 09:41 AM",
                    status: "Critical",
                    statusBg: "bg-red-100 dark:bg-red-900/50",
                    statusText: "text-red-700 dark:text-red-300",
                  },
                  {
                    patient: "Ellen Ripley",
                    risk: "Abnormal Fetal Heart Rate",
                    riskColor: "text-orange-600",
                    doctor: "Nurse Bishop",
                    date: "Yesterday",
                    status: "Monitoring",
                    statusBg: "bg-orange-100 dark:bg-orange-900/50",
                    statusText: "text-orange-700 dark:text-orange-300",
                  },
                  {
                    patient: "Dana Scully",
                    risk: "Gestational Diabetes",
                    riskColor: "text-yellow-600",
                    doctor: "Dr. Mulder",
                    date: "Nov 15, 2024",
                    status: "Stable",
                    statusBg: "bg-yellow-100 dark:bg-yellow-900/50",
                    statusText: "text-yellow-700 dark:text-yellow-300",
                  },
                ].map((alert, index) => (
                  <motion.tr
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    className="hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <td className="py-3 px-4 font-medium text-[#111812] dark:text-white">
                      {alert.patient}
                    </td>
                    <td className={`py-3 px-4 ${alert.riskColor} font-medium`}>
                      {alert.risk}
                    </td>
                    <td className="py-3 px-4">{alert.doctor}</td>
                    <td className="py-3 px-4">{alert.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`${alert.statusBg} ${alert.statusText} px-2 py-1 rounded-full text-xs font-bold`}
                      >
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-primary hover:underline font-medium"
                      >
                        View Profile
                      </motion.button>
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

export default HighRiskAnalytics;
