import React from "react";
import PatientLayout from "../layouts/PatientLayout";

const PatientRiskResult = () => {
  return (
    <PatientLayout>
      <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
        {/* Safety Status Banner */}
        <div className="p-4 rounded-xl @container bg-caution/10 dark:bg-caution/20 border border-caution/50 text-slate-800 dark:text-slate-200">
          <div className="flex flex-col items-start justify-start gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center justify-center rounded-full bg-caution/20 shrink-0 size-16">
              <span className="material-symbols-outlined text-caution text-4xl">
                warning
              </span>
            </div>
            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1">
              <p className="text-xl font-bold leading-tight tracking-[-0.015em]">
                Medication Check: Caution Advised
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-normal">
                Please show these results to a healthcare worker to discuss the
                next steps.
              </p>
            </div>
          </div>
        </div>

        {/* Medication Details Section */}
        <div className="flex flex-col gap-2 bg-white dark:bg-slate-900/50 rounded-lg p-2 sm:p-4 border border-border-light dark:border-gray-700">
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-2 text-text-main">
            Medication Details
          </h2>
          <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-700">
            {/* List Item: Safe */}
            <div className="flex gap-4 px-4 py-4 justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="text-safe flex items-center justify-center rounded-lg bg-safe/10 dark:bg-safe/20 shrink-0 size-12">
                  <span className="material-symbols-outlined text-2xl">
                    check_circle
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-text-main">
                    Paracetamol
                  </p>
                  <p className="text-sm font-normal leading-normal text-slate-600 dark:text-slate-400">
                    Follow the prescribed dosage.
                  </p>
                  <p className="text-sm font-medium leading-normal text-safe">
                    Safe to Use
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <div className="flex size-7 items-center justify-center">
                  <div className="size-3 rounded-full bg-safe"></div>
                </div>
              </div>
            </div>
            {/* List Item: Caution */}
            <div className="flex gap-4 px-4 py-4 justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="text-caution flex items-center justify-center rounded-lg bg-caution/10 dark:bg-caution/20 shrink-0 size-12">
                  <span className="material-symbols-outlined text-2xl">
                    warning
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-text-main">
                    Local Herbal Remedy
                  </p>
                  <p className="text-sm font-normal leading-normal text-slate-600 dark:text-slate-400">
                    Please discuss with your healthcare worker before using.
                  </p>
                  <p className="text-sm font-medium leading-normal text-caution">
                    Use with Caution
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <div className="flex size-7 items-center justify-center">
                  <div className="size-3 rounded-full bg-caution"></div>
                </div>
              </div>
            </div>
            {/* List Item: Unsafe */}
            <div className="flex gap-4 px-4 py-4 justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="text-danger flex items-center justify-center rounded-lg bg-danger/10 dark:bg-danger/20 shrink-0 size-12">
                  <span className="material-symbols-outlined text-2xl">
                    dangerous
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-text-main">
                    Ibuprofen (3rd Trimester)
                  </p>
                  <p className="text-sm font-normal leading-normal text-slate-600 dark:text-slate-400">
                    This medication is not safe during pregnancy. Show this to
                    the healthcare worker immediately.
                  </p>
                  <p className="text-sm font-medium leading-normal text-danger">
                    Do Not Use
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <div className="flex size-7 items-center justify-center">
                  <div className="size-3 rounded-full bg-danger"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Next Steps */}
          <div className="bg-white dark:bg-slate-900/50 rounded-lg p-6 flex flex-col gap-3 border border-border-light dark:border-gray-700">
            <h3 className="text-lg font-bold text-text-main">
              What to do next
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Based on these results, please talk to a nurse, doctor, or
              community health worker. Show them this screen or a printout of
              these results. It is important to discuss the herbal remedy before
              you take it.
            </p>
          </div>
          {/* Actions */}
          <div className="bg-white dark:bg-slate-900/50 rounded-lg p-6 flex flex-col gap-4 border border-border-light dark:border-gray-700">
            <h3 className="text-lg font-bold text-text-main">Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold">
                <span className="material-symbols-outlined">print</span>
                Print Results
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold">
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientRiskResult;
