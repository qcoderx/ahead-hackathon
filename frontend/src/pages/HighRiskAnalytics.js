import React from "react";
import ProviderLayout from "../layouts/ProviderLayout";

const HighRiskAnalytics = () => {
  return (
    <ProviderLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111812] dark:text-white text-3xl font-black leading-tight tracking-tight">
            High-Risk Cases Analytics
          </h1>
          <p className="text-[#618968] dark:text-gray-400 text-base font-normal leading-normal">
            Detailed insights into high-risk patient trends and alerts.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]">
            <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
              Active High-Risk Patients
            </p>
            <p className="text-[#111812] dark:text-white tracking-light text-4xl font-bold leading-tight">
              42
            </p>
            <p className="text-[#e72608] text-base font-medium leading-normal flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">
                arrow_upward
              </span>
              +5 this week
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]">
            <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
              Unresolved Alerts
            </p>
            <p className="text-[#111812] dark:text-white tracking-light text-4xl font-bold leading-tight">
              8
            </p>
            <p className="text-[#e72608] text-base font-medium leading-normal flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">warning</span>
              Requires Action
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]">
            <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
              Avg. Response Time
            </p>
            <p className="text-[#111812] dark:text-white tracking-light text-4xl font-bold leading-tight">
              2.5 hrs
            </p>
            <p className="text-[#078825] text-base font-medium leading-normal flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">
                arrow_downward
              </span>
              -15% vs last month
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Risk Factor Distribution */}
          <div className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Risk Factor Distribution
            </h3>
            <div className="flex items-center justify-center min-h-[250px]">
              {/* Placeholder for a Pie Chart - using CSS/SVG for visual */}
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-blue-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray="40, 100"
                  ></path>
                  <path
                    className="stroke-current text-red-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray="30, 100"
                    strokeDashoffset="-40"
                  ></path>
                  <path
                    className="stroke-current text-yellow-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray="30, 100"
                    strokeDashoffset="-70"
                  ></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Factors
                  </span>
                </div>
              </div>
              <div className="ml-8 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-[#111812] dark:text-gray-300">
                    Preeclampsia (40%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-[#111812] dark:text-gray-300">
                    Hemorrhage Risk (30%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-[#111812] dark:text-gray-300">
                    Gestational Diabetes (30%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trend Line Chart */}
          <div className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              High-Risk Identifications (Last 6 Months)
            </h3>
            <div className="flex items-end justify-between h-[250px] gap-2 pt-4">
              {[30, 45, 35, 60, 50, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 w-full"
                >
                  <div className="w-full bg-red-100 dark:bg-red-900/30 rounded-t-md relative group">
                    <div
                      style={{ height: `${h}%` }}
                      className="absolute bottom-0 w-full bg-red-500 rounded-t-md transition-all duration-500"
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed List */}
        <div className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
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
              <tbody className="divide-y divide-[#dbe6dd] dark:divide-[#2a4d31]">
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-3 px-4 font-medium text-[#111812] dark:text-white">
                    Sarah Connor
                  </td>
                  <td className="py-3 px-4 text-red-600 font-medium">
                    Severe Hypertension
                  </td>
                  <td className="py-3 px-4">Dr. Silberman</td>
                  <td className="py-3 px-4">Today, 09:41 AM</td>
                  <td className="py-3 px-4">
                    <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs font-bold">
                      Critical
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:underline font-medium">
                      View Profile
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-3 px-4 font-medium text-[#111812] dark:text-white">
                    Ellen Ripley
                  </td>
                  <td className="py-3 px-4 text-orange-600 font-medium">
                    Abnormal Fetal Heart Rate
                  </td>
                  <td className="py-3 px-4">Nurse Bishop</td>
                  <td className="py-3 px-4">Yesterday</td>
                  <td className="py-3 px-4">
                    <span className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full text-xs font-bold">
                      Monitoring
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:underline font-medium">
                      View Profile
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-3 px-4 font-medium text-[#111812] dark:text-white">
                    Dana Scully
                  </td>
                  <td className="py-3 px-4 text-yellow-600 font-medium">
                    Gestational Diabetes
                  </td>
                  <td className="py-3 px-4">Dr. Mulder</td>
                  <td className="py-3 px-4">Nov 15, 2024</td>
                  <td className="py-3 px-4">
                    <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-bold">
                      Stable
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:underline font-medium">
                      View Profile
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default HighRiskAnalytics;
