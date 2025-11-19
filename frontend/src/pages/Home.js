import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* TopNavBar */}
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-700 px-4 sm:px-10 py-3"
            >
              <div className="flex items-center gap-4 text-slate-900 dark:text-white">
                <div className="size-8 text-green-500">
                  <svg
                    fill="none"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                      fill="currentColor"
                    ></path>
                    <path
                      clipRule="evenodd"
                      d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                  MamaSafe
                </h2>
              </div>
              <div className="flex flex-1 justify-end">
                <div className="flex items-center gap-2">
                  <button className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal bg-transparent border-none cursor-pointer">
                    English
                  </button>
                  <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 text-slate-800 dark:text-slate-200 min-w-0 w-10">
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </button>
                </div>
              </div>
            </motion.header>
            <main className="flex-grow">
              {/* PageHeading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center py-16 px-4"
              >
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                    Welcome to MamaSafe
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                    Please select your role to continue.
                  </p>
                </div>
              </motion.div>
              {/* Role Selection Cards */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.4,
                    },
                  },
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to="/provider/login"
                    className="group flex flex-col items-center justify-center gap-4 text-center p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/50 h-full"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center justify-center size-24 bg-primary/20 rounded-full text-primary"
                    >
                      <span className="material-symbols-outlined !text-6xl">
                        stethoscope
                      </span>
                    </motion.div>
                    <div>
                      <p className="text-slate-900 dark:text-white text-xl font-bold leading-normal">
                        Provider / Admin
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal mt-2">
                        For midwives, nurses, CHWs, and doctors to manage
                        patient care and medication.
                      </p>
                    </div>
                  </Link>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to="/patient/login"
                    className="group flex flex-col items-center justify-center gap-4 text-center p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/50 h-full"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center justify-center size-24 bg-primary/20 rounded-full text-primary"
                    >
                      <span className="material-symbols-outlined !text-6xl">
                        groups
                      </span>
                    </motion.div>
                    <div>
                      <p className="text-slate-900 dark:text-white text-xl font-bold leading-normal">
                        Patient Companion
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal mt-2">
                        For family or support persons to access patient
                        information and educational materials.
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            </main>
            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col gap-6 px-5 py-10 mt-16 text-center @container border-t border-slate-200 dark:border-slate-700"
            >
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <button className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal min-w-40 hover:text-primary dark:hover:text-primary bg-transparent border-none cursor-pointer">
                  Help & Support
                </button>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                Version 1.0
              </p>
            </motion.footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
