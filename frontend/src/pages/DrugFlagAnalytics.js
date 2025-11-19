import React from "react";
import ProviderLayout from "../layouts/ProviderLayout";

const DrugFlagAnalytics = () => {
  return (
    <ProviderLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111812] dark:text-white text-3xl font-black leading-tight tracking-tight">
            Drug Flag Analytics
          </h1>
          <p className="text-[#618968] dark:text-gray-400 text-base font-normal leading-normal">
            Monitoring medication safety checks and interaction alerts.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]">
            <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
              Total Checks (Today)
            </p>
            <p className="text-[#111812] dark:text-white tracking-light text-4xl font-bold leading-tight">
              156
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]">
            <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
              Red Flags (Unsafe)
            </p>
            <p className="text-red-600 dark:text-red-400 tracking-light text-4xl font-bold leading-tight">
              12
            </p>
            <p className="text-sm text-gray-500">7.6% of checks</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]">
            <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
              Yellow Flags (Caution)
            </p>
            <p className="text-yellow-600 dark:text-yellow-400 tracking-light text-4xl font-bold leading-tight">
              28
            </p>
            <p className="text-sm text-gray-500">17.9% of checks</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]">
            <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
              Most Flagged Drug
            </p>
            <p
              className="text-[#111812] dark:text-white tracking-light text-2xl font-bold leading-tight truncate"
              title="Ibuprofen (Third Trimester)"
            >
              Ibuprofen
            </p>
            <p className="text-sm text-gray-500">Third Trimester Risk</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Flag Categories */}
          <div className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Flag Categories
            </h3>
            <div className="flex flex-col gap-3 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                  <span>Teratogenic Risk</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                  <span>Drug-Drug Interaction</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-orange-500 h-2.5 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                  <span>Dosage Warning</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{ width: "15%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium dark:text-gray-300">
                  <span>Allergy Conflict</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Weekly Safety Checks
            </h3>
            <div className="flex items-end justify-between h-[200px] gap-2 pt-4">
              {[120, 145, 135, 160, 150, 180, 156].map((h, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 w-full"
                >
                  <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-md relative group">
                    <div
                      style={{ height: `${(h / 200) * 100}%` }}
                      className="absolute bottom-0 w-full bg-primary rounded-t-md transition-all duration-500"
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Flags Table */}
        <div className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
          <h3 className="text-lg font-bold text-[#111812] dark:text-white">
            Recent Safety Flags
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#dbe6dd] dark:border-[#2a4d31] text-[#618968] dark:text-gray-400">
                <tr>
                  <th className="py-3 px-4 font-medium">Drug Name</th>
                  <th className="py-3 px-4 font-medium">Patient ID</th>
                  <th className="py-3 px-4 font-medium">Issue</th>
                  <th className="py-3 px-4 font-medium">Severity</th>
                  <th className="py-3 px-4 font-medium">Action Taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dbe6dd] dark:divide-[#2a4d31]">
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-3 px-4 font-medium text-[#111812] dark:text-white">
                    Warfarin
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    P-10293
                  </td>
                  <td className="py-3 px-4">Teratogenic Risk</td>
                  <td className="py-3 px-4">
                    <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs font-bold">
                      High
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    Prescription Blocked
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-3 px-4 font-medium text-[#111812] dark:text-white">
                    Aspirin
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    P-44512
                  </td>
                  <td className="py-3 px-4">Bleeding Risk (3rd Tri)</td>
                  <td className="py-3 px-4">
                    <span className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full text-xs font-bold">
                      Medium
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    Alternative Suggested
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-3 px-4 font-medium text-[#111812] dark:text-white">
                    Amoxicillin
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    P-99210
                  </td>
                  <td className="py-3 px-4">Patient Allergy</td>
                  <td className="py-3 px-4">
                    <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs font-bold">
                      High
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    Prescription Blocked
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

export default DrugFlagAnalytics;
