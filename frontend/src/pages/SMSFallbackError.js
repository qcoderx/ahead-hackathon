import React from "react";
import ProviderLayout from "../layouts/ProviderLayout";

const SMSFallbackError = () => {
  return (
    <ProviderLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111812] dark:text-white text-3xl font-black leading-tight tracking-tight">
            SMS Fallback & Error Logs
          </h1>
          <p className="text-[#618968] dark:text-gray-400 text-base font-normal leading-normal">
            System health monitoring and offline synchronization logs.
          </p>
        </div>

        {/* System Health Banner */}
        <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 flex items-start gap-4">
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
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]">
            <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
              SMS Sent (24h)
            </p>
            <p className="text-[#111812] dark:text-white tracking-light text-4xl font-bold leading-tight">
              1,842
            </p>
            <p className="text-[#078825] text-sm font-medium leading-normal">
              99.2% Delivery Rate
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]">
            <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
              Failed / Retrying
            </p>
            <p className="text-[#111812] dark:text-white tracking-light text-4xl font-bold leading-tight">
              14
            </p>
            <p className="text-yellow-600 text-sm font-medium leading-normal">
              Auto-retrying in 5m
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c1b] border border-[#dbe6dd] dark:border-[#2a4d31]">
            <p className="text-[#111812] dark:text-gray-300 text-base font-medium leading-normal">
              Offline Sync Events
            </p>
            <p className="text-[#111812] dark:text-white tracking-light text-4xl font-bold leading-tight">
              328
            </p>
            <p className="text-blue-600 text-sm font-medium leading-normal">
              Last sync: 2 mins ago
            </p>
          </div>
        </div>

        {/* Error Logs */}
        <div className="flex flex-col gap-4 rounded-xl border border-[#dbe6dd] dark:border-[#2a4d31] bg-white dark:bg-[#182c1b] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#111812] dark:text-white">
              Recent Error Logs
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                Export Logs
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                Clear Resolved
              </button>
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
              <tbody className="divide-y divide-[#dbe6dd] dark:divide-[#2a4d31]">
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    2024-11-19 10:23:45
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                      SMS_GATEWAY_TIMEOUT
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#111812] dark:text-white">
                    Connection timed out to Provider A
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-bold">
                      Retrying
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    3/5
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    2024-11-19 09:15:22
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                      SYNC_CONFLICT
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#111812] dark:text-white">
                    Patient ID P-4421 record version mismatch
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs font-bold">
                      Failed
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    0
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    2024-11-19 08:45:10
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                      INVALID_NUMBER
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#111812] dark:text-white">
                    Failed to send alert to +254700...
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-bold">
                      Resolved
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    -
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

export default SMSFallbackError;
