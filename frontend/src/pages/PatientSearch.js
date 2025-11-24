import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProviderLayout from "../layouts/ProviderLayout";

const PatientSearch = () => {
  const recentPatients = [
    { name: "Amina Okoro", id: "MS-12345", lastVisit: "2 days ago" },
    { name: "Fatima Mensah", id: "MS-67890", lastVisit: "5 days ago" },
    { name: "Grace Nkrumah", id: "MS-11223", lastVisit: "1 week ago" },
  ];

  return (
    <ProviderLayout>
      <div className="mx-auto max-w-4xl">
        {/* PageHeading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-neutral-dark dark:text-neutral-light text-4xl font-black leading-tight tracking-[-0.033em]">
              Find a Patient
            </h1>
            <p className="text-neutral-medium text-base font-normal leading-normal mt-2">
              Enter at least one piece of information to find a patient.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/provider/patient-registration"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined">person_add</span>
              Add New Patient
            </Link>
          </motion.div>
        </motion.div>
        {/* Search Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-light/50 dark:border-neutral-dark/50 shadow-sm p-6 lg:p-8"
        >
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient ID */}
            <div className="flex flex-col">
              <label
                className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                htmlFor="patient-id"
              >
                Patient ID
              </label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                id="patient-id"
                placeholder="e.g., MS-12345"
                type="text"
              />
            </div>
            {/* Phone Number */}
            <div className="flex flex-col">
              <label
                className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                htmlFor="phone-number"
              >
                Phone Number
              </label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                id="phone-number"
                placeholder="e.g., 2567..."
                type="text"
              />
            </div>
            {/* Full Name */}
            <div className="flex flex-col col-span-1 md:col-span-2">
              <label
                className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                htmlFor="full-name"
              >
                Full Name
              </label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                id="full-name"
                placeholder="e.g., Jane Doe"
                type="text"
              />
            </div>
            {/* Actions */}
            <div className="flex items-center justify-end gap-4 col-span-1 md:col-span-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-neutral-medium font-medium text-sm px-4 py-2 rounded-lg hover:bg-neutral-light dark:hover:bg-white/10"
                type="reset"
              >
                Clear Form
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 h-12 px-6 bg-primary text-white rounded-lg font-bold text-base hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                type="submit"
              >
                <span className="material-symbols-outlined">search</span>
                Search Patient
              </motion.button>
            </div>
          </form>
        </motion.div>
        {/* Recent Patients Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-light tracking-tight mb-4">
            Recent Patients
          </h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4,
                },
              },
            }}
            className="space-y-4"
          >
            {/* Recent Patient Item 1 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <Link
                to="/provider/patient-profile"
                className="flex items-center justify-between p-4 bg-white dark:bg-neutral-dark rounded-lg border border-neutral-light/50 dark:border-neutral-dark/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSG-hORJHl7JFKKGWNOQ7NZ4jcmnCfdAlKbsS2Ix4OGxq7gcn-SK2bZgPYMXBgtwPJ2Y9E_wXPeFeWJbr9CYFkzCiOrWivoEmr-sj8JIR32Lu1Qvc-tBDSORoWT5O12u6Bx7SbERw_wx65-zEA2SZHNyH5c9MfIbH0xSqaYCbn32mvT0W3lShDUQ35ZnQh9-QELf2SF3lVOrYJsCl7xxI7hfhoaaDA7rsZ38_POxOu7xmGNfqpiYSiPqLd9ZSOGyMKgX6wDaFD3sw")',
                    }}
                  ></div>
                  <div>
                    <p className="font-semibold text-neutral-dark dark:text-neutral-light">
                      Amina Okoro
                    </p>
                    <p className="text-sm text-neutral-medium">ID: MS-12345</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-medium">
                    Viewed 2 hours ago
                  </p>
                </div>
              </Link>
            </motion.div>
            {/* Recent Patient Item 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <Link
                to="/provider/patient-profile"
                className="flex items-center justify-between p-4 bg-white dark:bg-neutral-dark rounded-lg border border-neutral-light/50 dark:border-neutral-dark/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8fKSY0iEMNJeR6_WD_i-COYa6fSbQS7tyzAP1DR98vKuzTFaRPQpQTHeyZUPPKO0YqLyFodXgm7WZnzivQZRA4p7W3H3hgwvcJYs97Xrm342D1oiLGTCsohJoKneshdszVgU_HPAMiqHBE_7y7M_mjt-U7gq4bApAEuXRJzJ6XPUSBmDDQ63hi6fD42m39pSfLZZHxsX3TQVLy2weSOm-fmSati-S0OXKhRZOdBr48qEVufJz__DgoPJTIHWauU-H_uJSA57I5rc")',
                    }}
                  ></div>
                  <div>
                    <p className="font-semibold text-neutral-dark dark:text-neutral-light">
                      Fatima Bello
                    </p>
                    <p className="text-sm text-neutral-medium">ID: MS-67890</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-medium">
                    Viewed yesterday
                  </p>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </ProviderLayout>
  );
};

export default PatientSearch;
