import React from "react";
import { motion } from "framer-motion";
import PatientLayout from "../layouts/PatientLayout";

const PatientDashboard = () => {
  return (
    <PatientLayout>
      {/* Alerts/Warnings Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
        className="flex items-center gap-4 rounded-lg p-4 bg-danger/10 text-danger border border-danger/20"
      >
        <span className="material-symbols-outlined text-2xl">warning</span>
        <div className="flex flex-col flex-1">
          <p className="text-text-main text-base font-bold leading-tight">
            High Blood Pressure noted on last visit
          </p>
          <p className="text-text-subtle text-sm font-normal leading-normal">
            Please ensure the patient attends the next scheduled appointment for
            follow-up.
          </p>
        </div>
      </motion.div>

      {/* ProfileHeader */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex p-6 rounded-lg bg-white dark:bg-gray-800 border border-border-light dark:border-gray-700 @container"
      >
        <div className="flex w-full flex-col gap-6 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
          <div className="flex gap-6 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsYpsE9PqSBwXm5ycjC-QXDcXcZfE8N9sBKxjKZ_Dpp3cbpuOfogiIYob7xiOc6IoqbZFOZhQYWtUmzavK0BGRsjV4V24tmmQ9ovE7SSSP6_8_zb2rOnGFNtkobmcBeq9No362tAKS9xe6RmRi7W33yY74CWre8pzSi0ER8sf0Fso00Vv6u9bGYV6vNECnnZvatMe6dMWhqk7nes_WYz_MPct_OR11f08BreIwjHtwYQPKaXBxYhAVHf5-1HMVFQ1TgSX8265R5eo")',
              }}
            ></motion.div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-text-main text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]">
                Ayomide Williams
              </p>
              <p className="text-text-subtle text-base font-normal leading-normal">
                28 years old, Kuje Village
              </p>
              <p className="text-text-subtle text-base font-normal leading-normal">
                Gravida: 2, Parity: 1
              </p>
              <p className="text-text-subtle text-base font-normal leading-normal">
                EDD: 15th December 2024
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* SectionHeader */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-text-main text-xl font-bold leading-tight tracking-[-0.015em] px-2 pt-2"
          >
            Key Health Indicators
          </motion.h2>

          {/* Stats */}
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              {
                icon: "cardiology",
                label: "Blood Pressure",
                value: "142/90 mmHg",
                color: "text-danger",
              },
              {
                icon: "monitor_weight",
                label: "Weight",
                value: "72 kg",
                color: "text-text-main",
              },
              {
                icon: "bloodtype",
                label: "Blood Group",
                value: "O+",
                color: "text-text-main",
              },
              {
                icon: "opacity",
                label: "Hemoglobin",
                value: "11.2 g/dL",
                color: "text-text-main",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03, y: -3 }}
                className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center gap-2 text-text-subtle">
                  <span className="material-symbols-outlined">{stat.icon}</span>
                  <p className="text-text-main text-base font-medium leading-normal">
                    {stat.label}
                  </p>
                </div>
                <p
                  className={`${stat.color} tracking-light text-3xl font-bold leading-tight`}
                >
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* SectionHeader */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="text-text-main text-xl font-bold leading-tight tracking-[-0.015em] px-2 pt-5"
          >
            Visit History
          </motion.h2>

          {/* Timeline/Visit History Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.7,
                },
              },
            }}
            className="flex flex-col gap-4"
          >
            {[
              {
                icon: "stethoscope",
                title: "Routine Check-up",
                location: "Kuje Primary Health Center",
                date: "10th August 2024",
                details:
                  "Key Findings: Fetal Heart Rate: 145bpm. Patient reports good fetal movement. BP elevated. Advised on salt reduction.",
              },
              {
                icon: "radiology",
                title: "Ultrasound Scan",
                location: "Kuje Primary Health Center",
                date: "25th July 2024",
                details:
                  "Fetal development normal. Estimated weight: 1.8kg. Placenta position normal.",
              },
              {
                icon: "vaccines",
                title: "Tetanus Vaccination",
                location: "Kuje Primary Health Center",
                date: "10th July 2024",
                details:
                  "Second dose of Tetanus Toxoid administered. No adverse reactions reported.",
              },
            ].map((visit, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                whileHover={{ scale: 1.01, x: 5 }}
                className="flex flex-col gap-4 p-5 rounded-lg border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-12 rounded-full bg-primary-light/20 text-primary-light">
                      <span className="material-symbols-outlined text-2xl">
                        {visit.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-text-main text-base font-bold leading-tight">
                        {visit.title}
                      </p>
                      <p className="text-text-subtle text-sm font-normal leading-normal">
                        {visit.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-text-subtle text-sm font-medium">
                    {visit.date}
                  </p>
                </div>
                <div className="pl-16 border-l-2 border-dashed border-border-light ml-6">
                  <p className="text-text-subtle text-sm font-normal leading-relaxed -ml-16 pl-16 pb-2">
                    {visit.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-6"
        >
          {/* Next Appointment Card */}
          <div className="flex flex-col gap-4 p-6 rounded-lg border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-text-main text-lg font-bold leading-tight">
              Next Appointment
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center size-16 rounded-lg bg-primary/10 text-primary">
                <div className="text-center">
                  <p className="text-2xl font-bold">20</p>
                  <p className="text-xs">NOV</p>
                </div>
              </div>
              <div>
                <p className="text-text-main font-semibold">Antenatal Check</p>
                <p className="text-text-subtle text-sm">10:00 AM</p>
                <p className="text-text-subtle text-sm">Dr. Sarah Johnson</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View Details
            </motion.button>
          </div>

          {/* Current Medications */}
          <div className="flex flex-col gap-4 p-6 rounded-lg border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-text-main text-lg font-bold leading-tight">
              Current Medications
            </h3>
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
              className="flex flex-col gap-3"
            >
              {[
                { name: "Folic Acid", dosage: "400mcg daily" },
                { name: "Iron Supplement", dosage: "65mg daily" },
                { name: "Prenatal Vitamins", dosage: "1 tablet daily" },
              ].map((med, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <span className="material-symbols-outlined text-primary">
                    medication
                  </span>
                  <div>
                    <p className="text-text-main font-semibold text-sm">
                      {med.name}
                    </p>
                    <p className="text-text-subtle text-xs">{med.dosage}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-3">
            <h3 className="text-text-main text-lg font-bold leading-tight px-2">
              Quick Actions
            </h3>
            {[
              { icon: "calendar_month", label: "Book Appointment" },
              { icon: "chat", label: "Message Provider" },
              { icon: "download", label: "Download Records" },
            ].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">
                  {action.icon}
                </span>
                <span className="text-text-main font-medium">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
