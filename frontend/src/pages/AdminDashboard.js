import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProviderLayout from "../layouts/ProviderLayout";

const AdminDashboard = () => {
  const kpiCards = [
    {
      title: "Total Active Patients",
      value: "1,204",
      change: "+2.5%",
      isPositive: true,
    },
    {
      title: "High-Risk Cases Today",
      value: "15",
      change: "-1.2%",
      isPositive: false,
    },
    {
      title: "Pending Medication Checks",
      value: "32",
      change: "+5.0%",
      isPositive: true,
    },
    {
      title: "System Alerts (24h)",
      value: "8",
      change: "+1.8%",
      isPositive: true,
    },
  ];

  return (
    <ProviderLayout>
      <div className="flex flex-col gap-6">
        {/* PageHeading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-col gap-1">
            <p className="text-[#111812] dark:text-white text-3xl font-black leading-tight tracking-tight">
              Dashboard Overview
            </p>
            <p className="text-[#618968] dark:text-gray-400 text-base font-normal leading-normal">
              Welcome, Supervising Doctor. Here's what's happening today.
            </p>
          </div>
          {/* Chips (Date Range Filter) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#182c1b] dark:text-white px-4 border border-[#dbe6dd] dark:border-[#2a4d31] text-sm font-medium leading-normal hover:bg-gray-50 dark:hover:bg-white/10"
            >
              Today
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/20 dark:bg-primary/30 text-primary px-4 text-sm font-medium leading-normal"
            >
              Last 7 Days
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#182c1b] dark:text-white px-4 border border-[#dbe6dd] dark:border-[#2a4d31] text-sm font-medium leading-normal hover:bg-gray-50 dark:hover:bg-white/10"
            >
              Last 30 Days
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#182c1b] dark:text-white px-4 border border-[#dbe6dd] dark:border-[#2a4d31] text-sm font-medium leading-normal hover:bg-gray-50 dark:hover:bg-white/10"
            >
              All Time
            </motion.button>
          </motion.div>
        </motion.div>
        {/* Stats (KPI Cards) */}
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
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {kpiCards.map((kpi, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31] cursor-pointer"
            >
              <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
                {kpi.title}
              </p>
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                className="text-[#111812] dark:text-white tracking-light text-4xl font-bold leading-tight"
              >
                {kpi.value}
              </motion.p>
              <p
                className={`${
                  kpi.isPositive ? "text-[#078825]" : "text-[#e72608]"
                } text-base font-medium leading-normal flex items-center gap-1`}
              >
                <span className="material-symbols-outlined text-lg">
                  {kpi.isPositive ? "arrow_upward" : "arrow_downward"}
                </span>
                {kpi.change}
              </p>
            </motion.div>
          ))}
        </motion.div>
        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-1 flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
            <div className="flex flex-col">
              <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
                Medication Checks
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-[#111812] dark:text-white tracking-light text-[32px] font-bold leading-tight truncate">
                  1,432
                </p>
                <p className="text-[#078825] text-base font-medium leading-normal">
                  +12.5%
                </p>
              </div>
              <p className="text-[#618968] dark:text-gray-400 text-sm font-normal leading-normal">
                Last 30 Days
              </p>
            </div>
            <div className="flex min-h-[220px] flex-1 flex-col justify-end">
              <svg
                fill="none"
                height="100%"
                preserveAspectRatio="none"
                viewBox="-3 0 478 150"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                  fill="url(#paint0_linear_chart)"
                ></path>
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                  stroke="#13ec37"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear_chart"
                    x1="236"
                    x2="236"
                    y1="1"
                    y2="149"
                  >
                    <stop stopColor="#13ec37" stopOpacity="0.2"></stop>
                    <stop offset="1" stopColor="#13ec37" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex justify-around pt-2">
                <p className="text-[#618968] dark:text-gray-400 text-xs font-medium leading-normal tracking-wide">
                  Week 1
                </p>
                <p className="text-[#618968] dark:text-gray-400 text-xs font-medium leading-normal tracking-wide">
                  Week 2
                </p>
                <p className="text-[#618968] dark:text-gray-400 text-xs font-medium leading-normal tracking-wide">
                  Week 3
                </p>
                <p className="text-[#618968] dark:text-gray-400 text-xs font-medium leading-normal tracking-wide">
                  Week 4
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
            <div className="flex flex-col">
              <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
                Risk Level Distribution
              </p>
              <p className="text-[#111812] dark:text-white tracking-light text-[32px] font-bold leading-tight truncate">
                1,204 Patients
              </p>
              <p className="text-[#618968] dark:text-gray-400 text-sm font-normal leading-normal">
                All Time
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[220px]">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-gray-200 dark:text-gray-700"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                  ></path>
                  <path
                    className="stroke-current text-green-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeDasharray="70, 100"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                  <path
                    className="stroke-current text-yellow-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeDasharray="20, 100"
                    strokeDashoffset="-70"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                  <path
                    className="stroke-current text-red-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeDasharray="10, 100"
                    strokeDashoffset="-90"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[#111812] dark:text-white">
                    70%
                  </span>
                  <span className="text-sm text-[#618968] dark:text-gray-400">
                    Low Risk
                  </span>
                </div>
              </div>
              <div className="ml-8 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-[#111812] dark:text-gray-300">
                    Low (70%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-medium text-[#111812] dark:text-gray-300">
                    Medium (20%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium text-[#111812] dark:text-gray-300">
                    High (10%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Actionable Lists */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              High-Risk Patient Alerts
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#dbe6dd] dark:border-[#2a4d31] text-[#618968] dark:text-gray-400">
                  <tr>
                    <th className="py-2 px-4 font-medium">Patient Name</th>
                    <th className="py-2 px-4 font-medium">Reason</th>
                    <th className="py-2 px-4 font-medium">Alert Time</th>
                    <th className="py-2 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#dbe6dd] dark:border-[#2a4d31] hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="py-3 px-4">Jane Doe</td>
                    <td className="py-3 px-4">High Blood Pressure</td>
                    <td className="py-3 px-4">2 hours ago</td>
                    <td className="py-3 px-4">
                      <span className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                        Urgent
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#dbe6dd] dark:border-[#2a4d31] hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="py-3 px-4">Emily Smith</td>
                    <td className="py-3 px-4">Irregular Heartbeat</td>
                    <td className="py-3 px-4">5 hours ago</td>
                    <td className="py-3 px-4">
                      <span className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                        Urgent
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#dbe6dd] dark:border-[#2a4d31] hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="py-3 px-4">Jessica Jones</td>
                    <td className="py-3 px-4">Medication Missed</td>
                    <td className="py-3 px-4">8 hours ago</td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="py-3 px-4">Maria Garcia</td>
                    <td className="py-3 px-4">High Glucose Level</td>
                    <td className="py-3 px-4">Yesterday</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                        Resolved
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Quick Actions
            </h3>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/provider/patient-registration"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20"
                >
                  <span className="material-symbols-outlined text-primary text-3xl">
                    person_add
                  </span>
                  <span className="text-sm font-medium">Add Patient</span>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/provider/reports"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20"
                >
                  <span className="material-symbols-outlined text-primary text-3xl">
                    summarize
                  </span>
                  <span className="text-sm font-medium">Generate Report</span>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/provider/patient-search"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20"
                >
                  <span className="material-symbols-outlined text-primary text-3xl">
                    campaign
                  </span>
                  <span className="text-sm font-medium">Send Alert</span>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/provider/medication-check"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20"
                >
                  <span className="material-symbols-outlined text-primary text-3xl">
                    medication
                  </span>
                  <span className="text-sm font-medium">Check Medication</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          {/* Analytics Shortcuts */}
          <div className="lg:col-span-5 flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Analytics & System Health
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="/provider/analytics/high-risk"
                className="flex items-center gap-4 p-4 rounded-lg border border-[#dbe6dd] dark:border-[#2a4d31] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
                <div>
                  <p className="font-bold text-[#111812] dark:text-white">
                    High-Risk Analytics
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    View trends & alerts
                  </p>
                </div>
              </a>
              <a
                href="/provider/analytics/drug-flags"
                className="flex items-center gap-4 p-4 rounded-lg border border-[#dbe6dd] dark:border-[#2a4d31] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                  <span className="material-symbols-outlined">flag</span>
                </div>
                <div>
                  <p className="font-bold text-[#111812] dark:text-white">
                    Drug Flag Analytics
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Safety check insights
                  </p>
                </div>
              </a>
              <a
                href="/provider/analytics/sms-error"
                className="flex items-center gap-4 p-4 rounded-lg border border-[#dbe6dd] dark:border-[#2a4d31] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <span className="material-symbols-outlined">dns</span>
                </div>
                <div>
                  <p className="font-bold text-[#111812] dark:text-white">
                    System Health
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SMS & Sync Logs
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default AdminDashboard;
