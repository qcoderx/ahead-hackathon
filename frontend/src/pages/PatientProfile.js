import React from "react";
import { Link } from "react-router-dom";
import ProviderLayout from "../layouts/ProviderLayout";

const PatientProfile = () => {
  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        {/* MetaText / Alert Banner */}
        <div
          className="bg-yellow-100 dark:bg-yellow-900/40 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-4 rounded-r-lg mb-6"
          role="alert"
        >
          <p className="text-sm font-normal leading-normal">
            Data from Dorra EMR, last updated: 24/07/2024 10:30 AM. This is a
            read-only view.
          </p>
        </div>
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 mb-4">
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
        </div>
        {/* ProfileHeader */}
        <header className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6">
          <div className="flex w-full flex-col gap-4 @container @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
            <div className="flex gap-4 items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24"
                data-alt="Profile photo of Jane Doe"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBCk0NxQNlUorGf-jmCMrY9OppoPfUVaig5ppuPXtq7f2DGuUzcrdt2NJPt-KSdm-oC0baYozfpFKSHBx-2ZeFapl8kOsM5QntIbfRlz3aKsnxISiq1BYPsR_pRvYTPIGlFL9jrBTnvoLG28eFnm0jjryKFlmRg73n78iRVyfj8dMsiYwJ6GNpbtx0yvf0mVMeE8BP89o9xvwFyzk-52xBzYJvlmOqk7HQkRW6WVjGk2Dx74HRybavNHctAyoymqIkX22m4ppE8nns')",
                }}
              ></div>
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
              <button
                onClick={() => window.print()}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-[0.015em] flex-1 @[480px]:flex-auto hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span className="truncate">Print Summary</span>
              </button>
              <Link
                to="/provider/patient-search"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 @[480px]:flex-auto hover:bg-primary/90 transition-colors"
              >
                <span className="truncate">Back to List</span>
              </Link>
            </div>
          </div>
        </header>
        {/* Chips / Status Tags */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 px-4">
            <p className="text-sm font-medium leading-normal">Pregnant</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 px-4">
            <p className="text-sm font-medium leading-normal">High-Risk</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 px-4">
            <p className="text-sm font-medium leading-normal">
              Allergy: Penicillin
            </p>
          </div>
        </div>
        {/* Tabbed Navigation and Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation on the left */}
          <div className="w-full lg:w-1/4">
            <ul className="flex lg:flex-col bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm space-y-1">
              <li className="w-full">
                <a
                  className="block py-2 px-4 rounded-lg bg-primary/20 text-primary dark:text-white dark:bg-primary/30 text-sm font-bold"
                  href="#overview"
                >
                  Overview
                </a>
              </li>
              <li className="w-full">
                <a
                  className="block py-2 px-4 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium"
                  href="#visit-history"
                >
                  Visit History
                </a>
              </li>
              <li className="w-full">
                <a
                  className="block py-2 px-4 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium"
                  href="#allergies"
                >
                  Allergies
                </a>
              </li>
              <li className="w-full">
                <a
                  className="block py-2 px-4 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium"
                  href="#medical-history"
                >
                  Medical History
                </a>
              </li>
            </ul>
          </div>
          {/* Content on the right */}
          <div className="w-full lg:w-3/4">
            {/* Overview Section */}
            <div className="space-y-6" id="overview">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Pregnancy Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    Pregnant
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gestational Age
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    28 weeks, 3 days
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estimated Due Date (EDD)
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    15/10/2024
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Past Obstetric History
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    G2 P1 A0
                  </p>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white pt-4">
                Visit History (Recent)
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Routine Antenatal Check-up
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Dr. Emily Carter - St. Luke's Clinic
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        15/07/2024
                      </p>
                    </div>
                  </li>
                  <li className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Ultrasound Scan
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Radiology Dept - St. Luke's Clinic
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        01/06/2024
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white pt-4">
                Medical History
              </h2>
              <div className="space-y-4">
                {/* Accordion Panel 1 */}
                <details className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-medium text-gray-900 dark:text-white">
                    <span>Chronic Conditions</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">
                        expand_more
                      </span>
                    </span>
                  </summary>
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 text-gray-600 dark:text-gray-300">
                    <p>
                      Hypertension, diagnosed 2021. Managed with medication.
                    </p>
                  </div>
                </details>
                {/* Accordion Panel 2 */}
                <details className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-medium text-gray-900 dark:text-white">
                    <span>Surgical History</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">
                        expand_more
                      </span>
                    </span>
                  </summary>
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 text-gray-600 dark:text-gray-300">
                    <p>Appendectomy, 2015. No complications.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default PatientProfile;
