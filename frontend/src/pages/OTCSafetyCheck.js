import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PatientLayout from "../layouts/PatientLayout";

const OTCSafetyCheck = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    if (query.includes("paracetamol")) {
      setResult("safe");
    } else if (query.includes("ibuprofen")) {
      setResult("caution");
    } else if (query.includes("isotretinoin")) {
      setResult("unsafe");
    } else {
      setResult("not-found");
    }
  };

  return (
    <PatientLayout>
      <div className="flex flex-col flex-1 items-center justify-center py-12 sm:py-24">
        {/* PageHeading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center text-center gap-3 p-4 w-full max-w-2xl"
        >
          <div className="flex w-full flex-col items-center gap-3">
            <p className="text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl text-text-light dark:text-text-dark">
              Medication Safety Check
            </p>
            <p className="text-base font-normal leading-normal text-gray-600 dark:text-gray-400">
              Enter the name of the over-the-counter medicine below.
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSearch}
          className="flex flex-col items-center gap-4 px-4 py-8 w-full max-w-lg"
        >
          {/* TextField */}
          <div className="w-full">
            <label className="flex flex-col w-full">
              <p className="text-base font-medium leading-normal pb-2 text-text-light dark:text-text-dark">
                Drug Name
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-4 text-base font-normal leading-normal"
                placeholder="e.g., Paracetamol"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>

          {/* SingleButton */}
          <div className="flex justify-start w-full pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              <span className="truncate">Check Safety</span>
            </motion.button>
          </div>
        </motion.form>

        {/* Results Display Area */}
        <div className="w-full max-w-2xl mt-8 space-y-6">
          <AnimatePresence mode="wait">
            {/* Safe Result */}
            {result === "safe" && (
              <motion.div
                key="safe"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                className="p-4"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 rounded-lg bg-white dark:bg-black/20 p-6 shadow-md border border-primary/30">
                  <div className="flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined text-4xl">
                      check_circle
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold leading-tight text-text-light dark:text-text-dark">
                      Safe to Use
                    </p>
                    <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">
                      This medication is generally considered safe during
                      pregnancy. Always follow standard dosage instructions and
                      consult your healthcare provider if you have any concerns.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Caution Result */}
            {result === "caution" && (
              <motion.div
                key="caution"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                className="p-4"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 rounded-lg bg-white dark:bg-black/20 p-6 shadow-md border border-caution/30">
                  <div className="flex-shrink-0 text-caution">
                    <span className="material-symbols-outlined text-4xl">
                      warning
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold leading-tight text-text-light dark:text-text-dark">
                      Use with Caution
                    </p>
                    <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">
                      This medication should be used with caution. Please
                      consult a healthcare provider before use to discuss
                      potential risks and benefits.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Unsafe Result */}
            {result === "unsafe" && (
              <motion.div
                key="unsafe"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                className="p-4"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 rounded-lg bg-white dark:bg-black/20 p-6 shadow-md border border-danger/30">
                  <div className="flex-shrink-0 text-danger">
                    <span className="material-symbols-outlined text-4xl">
                      cancel
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold leading-tight text-text-light dark:text-text-dark">
                      Do Not Use
                    </p>
                    <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">
                      This medication is not recommended for use during
                      pregnancy. Please seek professional medical advice for
                      safer alternatives.
                    </p>
                    <Link
                      to="/patient/risk-result"
                      className="text-primary font-bold text-sm mt-2 inline-block"
                    >
                      View Full Report
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* No Results State */}
            {result === "not-found" && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center p-10 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark"
              >
                <span className="material-symbols-outlined text-5xl text-text-muted-light dark:text-text-muted-dark mb-4">
                  search_off
                </span>
                <p className="text-lg font-medium text-text-light dark:text-text-dark">
                  No medication found
                </p>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Please check the spelling or try another name.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PatientLayout>
  );
};

export default OTCSafetyCheck;
