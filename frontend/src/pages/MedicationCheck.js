import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProviderLayout from "../layouts/ProviderLayout";
import { Html5QrcodeScanner } from "html5-qrcode";

const MedicationCheck = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState("");

  useEffect(() => {
    let scanner = null;

    if (isScannerOpen) {
      scanner = new Html5QrcodeScanner(
        "barcode-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          formatsToSupport: [0, 8, 9, 13, 14, 16, 17],
        },
        false
      );

      scanner.render(
        (decodedText) => {
          setScannedBarcode(decodedText);
          setSearchQuery(decodedText);
          setResult("scanned");
          scanner.clear();
          setIsScannerOpen(false);
        },
        (error) => {
          console.warn("Barcode scan error:", error);
        }
      );
    }

    return () => {
      if (scanner) {
        scanner
          .clear()
          .catch((err) => console.error("Scanner cleanup error:", err));
      }
    };
  }, [isScannerOpen]);

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

  const handleBarcodeScan = () => {
    setIsScannerOpen(true);
  };

  const closeScanner = () => {
    setIsScannerOpen(false);
  };

  return (
    <ProviderLayout>
      <div className="mx-auto max-w-4xl">
        {/* PageHeading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-neutral-dark dark:text-neutral-light text-4xl font-black leading-tight tracking-[-0.033em]">
            Medication Safety Check
          </h1>
          <p className="text-neutral-medium text-base font-normal leading-normal mt-2">
            Scan or search for a medication to check its safety for pregnant
            patients.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSearch}
          className="flex flex-col items-center gap-4 bg-white dark:bg-neutral-dark rounded-xl border border-neutral-light/50 dark:border-neutral-dark/50 shadow-sm p-6"
        >
          <div className="w-full">
            <label className="flex flex-col w-full">
              <p className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2 sr-only">
                Medicine Name
              </p>
              <div className="flex w-full flex-1 items-stretch rounded-lg shadow-sm">
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 h-14 placeholder:text-neutral-medium/70 p-4 text-base font-normal leading-normal"
                  placeholder="e.g., Paracetamol"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="flex w-full gap-3 flex-wrap justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] grow gap-2 hover:bg-blue-600"
            >
              <span className="material-symbols-outlined">search</span>
              <span className="truncate">Search</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleBarcodeScan}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white dark:bg-neutral-dark border border-[#dbe6dd] dark:border-neutral-dark/80 text-neutral-dark dark:text-neutral-light text-base font-bold leading-normal tracking-[0.015em] grow gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="material-symbols-outlined">barcode_scanner</span>
              <span className="truncate">Scan Barcode</span>
            </motion.button>
          </div>
        </motion.form>

        {/* Scanner Modal */}
        <AnimatePresence>
          {isScannerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={closeScanner}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-neutral-dark rounded-xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-neutral-dark dark:text-neutral-light">
                    Scan Barcode
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeScanner}
                    className="text-neutral-medium hover:text-neutral-dark dark:hover:text-neutral-light"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </motion.button>
                </div>
                <div id="barcode-reader" className="w-full"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col gap-4 pt-6"
        >
          <h2 className="text-neutral-dark dark:text-neutral-light text-[22px] font-bold leading-tight tracking-[-0.015em]">
            Results
          </h2>

          <AnimatePresence mode="wait">
            {/* Initial State */}
            {!result && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center p-10 bg-white dark:bg-neutral-dark rounded-xl border border-neutral-light/50 dark:border-neutral-dark/50"
              >
                <span className="material-symbols-outlined text-5xl text-neutral-medium mb-4">
                  pill
                </span>
                <p className="text-lg font-medium text-neutral-dark dark:text-neutral-light">
                  Results will appear here
                </p>
                <p className="text-neutral-medium">
                  Start by searching for a medication above.
                </p>
              </motion.div>
            )}

            {/* Scanned Barcode Result */}
            {result === "scanned" && (
              <motion.div
                key="scanned"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-4 p-4 bg-white dark:bg-neutral-dark border border-primary rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
                    <span className="material-symbols-outlined">
                      barcode_scanner
                    </span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-neutral-light">
                      Barcode Scanned Successfully
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      Barcode: {scannedBarcode}
                    </p>
                  </div>
                </div>
                <div className="border-t border-neutral-light/50 dark:border-neutral-dark/50 pt-3">
                  <p className="text-neutral-medium text-sm">
                    The barcode has been scanned successfully. API integration
                    is needed to fetch medication details for this barcode.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Safe Result */}
            {result === "safe" && (
              <motion.div
                key="safe"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col gap-4 p-4 bg-white dark:bg-neutral-dark border border-green-500 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-green-500 text-white">
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-neutral-light">
                      Paracetamol
                    </h3>
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                      Safe During Pregnancy & Breastfeeding
                    </p>
                  </div>
                  <Link
                    to="/provider/risk-result"
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    View Details
                  </Link>
                </div>
                <div className="border-t border-neutral-light/50 dark:border-neutral-dark/50 pt-3">
                  <p className="text-neutral-medium text-sm">
                    Considered safe for use throughout pregnancy and
                    breastfeeding at recommended doses.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Caution Result */}
            {result === "caution" && (
              <motion.div
                key="caution"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col gap-4 p-4 bg-white dark:bg-neutral-dark border border-yellow-500 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-yellow-500 text-white">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-neutral-light">
                      Ibuprofen
                    </h3>
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                      Use with Caution
                    </p>
                  </div>
                  <Link
                    to="/provider/risk-result"
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    View Details
                  </Link>
                </div>
                <div className="border-t border-neutral-light/50 dark:border-neutral-dark/50 pt-3">
                  <p className="text-neutral-medium text-sm">
                    Avoid during the third trimester of pregnancy. Use with
                    caution under medical supervision.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Unsafe Result */}
            {result === "unsafe" && (
              <motion.div
                key="unsafe"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col gap-4 p-4 bg-white dark:bg-neutral-dark border border-red-500 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-red-500 text-white">
                    <span className="material-symbols-outlined">cancel</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-neutral-light">
                      Isotretinoin
                    </h3>
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      Unsafe / Contraindicated
                    </p>
                  </div>
                  <Link
                    to="/provider/risk-result"
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    View Details
                  </Link>
                </div>
                <div className="border-t border-neutral-light/50 dark:border-neutral-dark/50 pt-3">
                  <p className="text-neutral-medium text-sm">
                    Highly teratogenic and is strictly contraindicated during
                    pregnancy.
                  </p>
                </div>
              </motion.div>
            )}

            {/* No Results State */}
            {result === "not-found" && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center p-10 bg-white dark:bg-neutral-dark rounded-xl border border-neutral-light/50 dark:border-neutral-dark/50"
              >
                <span className="material-symbols-outlined text-5xl text-neutral-medium mb-4">
                  search_off
                </span>
                <p className="text-lg font-medium text-neutral-dark dark:text-neutral-light">
                  No medication found
                </p>
                <p className="text-neutral-medium">
                  Please check the spelling or try another name.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </ProviderLayout>
  );
};

export default MedicationCheck;
