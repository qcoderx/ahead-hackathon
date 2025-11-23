import React from "react";
import { motion } from "framer-motion";
import PatientLayout from "../layouts/PatientLayout";

const PatientRiskResult = () => {
  return (
    <PatientLayout>
      <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
        {/* Safety Status Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
          className="p-4 rounded-xl @container bg-caution/10 dark:bg-caution/20 border border-caution/50 text-slate-800 dark:text-slate-200"
        >
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
        </motion.div>

        {/* Medication Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-2 bg-white dark:bg-slate-900/50 rounded-lg p-2 sm:p-4 border border-border-light dark:border-gray-700"
        >
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-2 text-text-main">
            Medication Details
          </h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3,
                },
              },
            }}
            className="flex flex-col divide-y divide-slate-200 dark:divide-slate-700"
          >
            {/* List Item: Safe */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              whileHover={{ scale: 1.01, x: 5 }}
              className="flex gap-4 px-4 py-4 justify-between items-center"
            >
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
            </motion.div>

            {/* List Item: Caution */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              whileHover={{ scale: 1.01, x: 5 }}
              className="flex gap-4 px-4 py-4 justify-between items-center"
            >
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
            </motion.div>

            {/* List Item: Unsafe */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              whileHover={{ scale: 1.01, x: 5 }}
              className="flex gap-4 px-4 py-4 justify-between items-center"
            >
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
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Next Steps & Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.6,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Next Steps */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white dark:bg-slate-900/50 rounded-lg p-6 flex flex-col gap-3 border border-border-light dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-text-main">
              What to do next
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Based on these results, please talk to a nurse, doctor, or
              community health worker. Show them this screen or a printout of
              these results. It is important to discuss the herbal remedy before
              you take it.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white dark:bg-slate-900/50 rounded-lg p-6 flex flex-col gap-4 border border-border-light dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-text-main">Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold"
              >
                <span className="material-symbols-outlined">print</span>
                Print Results
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold"
              >
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PatientLayout>
  );
};

export default PatientRiskResult;
