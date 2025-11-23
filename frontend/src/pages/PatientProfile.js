import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProviderLayout from "../layouts/ProviderLayout";

const PatientProfile = () => {
  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        {/* Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-yellow-100 dark:bg-yellow-900/40 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-4 rounded-r-lg mb-6"
          role="alert"
        >
          <p className="text-sm font-normal leading-normal">
            Data from Dorra EMR, last updated: 24/07/2024 10:30 AM. This is a
            read-only view.
          </p>
        </motion.div>

        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          <button className="text-primary dark:text-blue-300 text-base font-medium leading-normal bg-transparent border-none cursor-pointer">
            Patients
          </button>
          <span className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
            /
          </span>
          <button className="text-primary dark:text-blue-300 text-base font-medium leading-normal bg-transparent border-none cursor-pointer">
            Jane Doe
          </button>
          <span className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
            /
          </span>
          <span className="text-gray-800 dark:text-white text-base font-medium leading-normal">
            Medical History
          </span>
        </motion.div>

        {/* ProfileHeader */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6"
        >
          <div className="flex w-full flex-col gap-4 @container @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
            <div className="flex gap-4 items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24"
                data-alt="Profile photo of Jane Doe"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBCk0NxQNlUorGf-jmCMrY9OppoPfUVaig5ppuPXtq7f2DGuUzcrdt2NJPt-KSdm-oC0baYozfpFKSHBx-2ZeFapl8kOsM5QntIbfRlz3aKsnxISiq1BYPsR_pRvYTPIGlFL9jrBTnvoLG28eFnm0jjryKFlmRg73n78iRVyfj8dMsiYwJ6GNpbtx0yvf0mVMeE8BP89o9xvwFyzk-52xBzYJvlmOqk7HQkRW6WVjGk2Dx74HRybavNHctAyoymqIkX22m4ppE8nns')",
                }}
              ></motion.div>
              <div className="flex flex-col justify-center">
                <p className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Jane Doe, 32
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  Patient ID: MS-12345
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  DOB: 15/08/1991
                </p>
              </div>
            </div>
            <div className="flex w-full max-w-[480px] gap-3 @[480px]:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-[0.015em] flex-1 @[480px]:flex-auto hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span className="truncate">Print Summary</span>
              </motion.button>
              <Link
                to="/provider/patient-search"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 @[480px]:flex-auto hover:bg-primary/90 transition-colors"
              >
                <span className="truncate">Back to List</span>
              </Link>
            </div>
          </div>
        </motion.header>

        {/* Status Tags */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
          className="flex gap-3 mb-6 flex-wrap"
        >
          {[
            { text: "Pregnant", color: "green" },
            { text: "High-Risk", color: "red" },
            { text: "Allergy: Penicillin", color: "red" },
          ].map((tag, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-${tag.color}-100 dark:bg-${tag.color}-900/40 text-${tag.color}-800 dark:text-${tag.color}-200 px-4`}
            >
              <p className="text-sm font-medium leading-normal">{tag.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabbed Navigation and Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full lg:w-1/4"
          >
            <ul className="flex lg:flex-col bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm space-y-1">
              {[
                "Overview",
                "Medical History",
                "Medications",
                "Appointments",
              ].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} className="w-full">
                  <a
                    className={`block py-2 px-4 rounded-lg ${
                      index === 0
                        ? "bg-primary/20 text-primary dark:text-white dark:bg-primary/30"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    } text-sm font-bold transition-colors`}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-full lg:w-3/4"
          >
            <div className="space-y-6">
              {/* Overview Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Blood Type", value: "O+" },
                    { label: "Gestational Age", value: "24 weeks" },
                    { label: "EDD", value: "15/12/2024" },
                    { label: "Last Visit", value: "20/07/2024" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="border-l-4 border-primary pl-4"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.label}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Medical History Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Medical History
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
                        delayChildren: 0.8,
                      },
                    },
                  }}
                  className="space-y-4"
                >
                  {[
                    {
                      date: "20/07/2024",
                      event: "Routine Antenatal Check",
                      status: "Completed",
                    },
                    {
                      date: "15/06/2024",
                      event: "Ultrasound Scan",
                      status: "Completed",
                    },
                    {
                      date: "01/05/2024",
                      event: "First Antenatal Visit",
                      status: "Completed",
                    },
                  ].map((record, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {record.event}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {record.date}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                        {record.status}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* Current Medications Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Current Medications
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
                        delayChildren: 1.0,
                      },
                    },
                  }}
                  className="space-y-3"
                >
                  {[
                    {
                      name: "Folic Acid",
                      dosage: "400mcg daily",
                      safety: "Safe",
                    },
                    {
                      name: "Iron Supplement",
                      dosage: "65mg daily",
                      safety: "Safe",
                    },
                    {
                      name: "Prenatal Vitamins",
                      dosage: "1 tablet daily",
                      safety: "Safe",
                    },
                  ].map((med, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {med.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {med.dosage}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                        {med.safety}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            </div>
          </motion.div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default PatientProfile;
