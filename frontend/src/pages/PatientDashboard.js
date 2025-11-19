import React from "react";
import PatientLayout from "../layouts/PatientLayout";

const PatientDashboard = () => {
  return (
    <PatientLayout>
      {/* Alerts/Warnings Banner */}
      <div className="flex items-center gap-4 rounded-lg p-4 bg-danger/10 text-danger border border-danger/20">
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
      </div>
      {/* ProfileHeader */}
      <div className="flex p-6 rounded-lg bg-white dark:bg-gray-800 border border-border-light dark:border-gray-700 @container">
        <div className="flex w-full flex-col gap-6 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
          <div className="flex gap-6 items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsYpsE9PqSBwXm5ycjC-QXDcXcZfE8N9sBKxjKZ_Dpp3cbpuOfogiIYob7xiOc6IoqbZFOZhQYWtUmzavK0BGRsjV4V24tmmQ9ovE7SSSP6_8_zb2rOnGFNtkobmcBeq9No362tAKS9xe6RmRi7W33yY74CWre8pzSi0ER8sf0Fso00Vv6u9bGYV6vNECnnZvatMe6dMWhqk7nes_WYz_MPct_OR11f08BreIwjHtwYQPKaXBxYhAVHf5-1HMVFQ1TgSX8265R5eo")',
              }}
            ></div>
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* SectionHeader */}
          <h2 className="text-text-main text-xl font-bold leading-tight tracking-[-0.015em] px-2 pt-2">
            Key Health Indicators
          </h2>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-2 text-text-subtle">
                <span className="material-symbols-outlined">cardiology</span>
                <p className="text-text-main text-base font-medium leading-normal">
                  Blood Pressure
                </p>
              </div>
              <p className="text-danger tracking-light text-3xl font-bold leading-tight">
                142/90 mmHg
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-2 text-text-subtle">
                <span className="material-symbols-outlined">
                  monitor_weight
                </span>
                <p className="text-text-main text-base font-medium leading-normal">
                  Weight
                </p>
              </div>
              <p className="text-text-main tracking-light text-3xl font-bold leading-tight">
                72 kg
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-2 text-text-subtle">
                <span className="material-symbols-outlined">bloodtype</span>
                <p className="text-text-main text-base font-medium leading-normal">
                  Blood Group
                </p>
              </div>
              <p className="text-text-main tracking-light text-3xl font-bold leading-tight">
                O+
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-2 text-text-subtle">
                <span className="material-symbols-outlined">opacity</span>
                <p className="text-text-main text-base font-medium leading-normal">
                  Hemoglobin
                </p>
              </div>
              <p className="text-text-main tracking-light text-3xl font-bold leading-tight">
                11.2 g/dL
              </p>
            </div>
          </div>
          {/* SectionHeader */}
          <h2 className="text-text-main text-xl font-bold leading-tight tracking-[-0.015em] px-2 pt-5">
            Visit History
          </h2>
          {/* Timeline/Visit History Section */}
          <div className="flex flex-col gap-4">
            {/* Visit Summary Card 1 */}
            <div className="flex flex-col gap-4 p-5 rounded-lg border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-primary-light/20 text-primary-light">
                    <span className="material-symbols-outlined text-2xl">
                      stethoscope
                    </span>
                  </div>
                  <div>
                    <p className="text-text-main text-base font-bold leading-tight">
                      Routine Check-up
                    </p>
                    <p className="text-text-subtle text-sm font-normal leading-normal">
                      Kuje Primary Health Center
                    </p>
                  </div>
                </div>
                <p className="text-text-subtle text-sm font-medium">
                  10th August 2024
                </p>
              </div>
              <div className="pl-16 border-l-2 border-dashed border-border-light ml-6">
                <p className="text-text-subtle text-sm font-normal leading-relaxed -ml-16 pl-16 pb-2">
                  Key Findings: Fetal Heart Rate: 145bpm. Patient reports good
                  fetal movement. BP elevated. Advised on salt reduction.
                </p>
              </div>
            </div>
            {/* Visit Summary Card 2 */}
            <div className="flex flex-col gap-4 p-5 rounded-lg border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-primary-light/20 text-primary-light">
                    <span className="material-symbols-outlined text-2xl">
                      radiology
                    </span>
                  </div>
                  <div>
                    <p className="text-text-main text-base font-bold leading-tight">
                      Ultrasound Scan
                    </p>
                    <p className="text-text-subtle text-sm font-normal leading-normal">
                      Gwagwalada General Hospital
                    </p>
                  </div>
                </div>
                <p className="text-text-subtle text-sm font-medium">
                  20th July 2024
                </p>
              </div>
              <div className="pl-16 border-l-2 border-dashed border-border-light ml-6">
                <p className="text-text-subtle text-sm font-normal leading-relaxed -ml-16 pl-16 pb-2">
                  Key Findings: Anomaly scan performed. All structures appear
                  normal for gestational age. Estimated fetal weight is 1.2kg.
                </p>
              </div>
            </div>
            {/* Visit Summary Card 3 */}
            <div className="flex flex-col gap-4 p-5 rounded-lg border border-border-light bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-primary-light/20 text-primary-light">
                    <span className="material-symbols-outlined text-2xl">
                      stethoscope
                    </span>
                  </div>
                  <div>
                    <p className="text-text-main text-base font-bold leading-tight">
                      Routine Check-up
                    </p>
                    <p className="text-text-subtle text-sm font-normal leading-normal">
                      Kuje Primary Health Center
                    </p>
                  </div>
                </div>
                <p className="text-text-subtle text-sm font-medium">
                  10th July 2024
                </p>
              </div>
              <div className="pl-16 border-l-2 border-dashed border-border-light ml-6 border-transparent">
                <p className="text-text-subtle text-sm font-normal leading-relaxed -ml-16 pl-16 pb-2">
                  Key Findings: Patient feeling well. Fundal height consistent
                  with dates. BP normal at this visit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Next Appointment Card */}
          <div className="p-6 rounded-lg bg-warning/10 border border-warning/20">
            <h3 className="text-xl font-bold text-text-main mb-4">
              Next Appointment
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-warning text-2xl">
                  calendar_month
                </span>
                <p className="text-text-main font-medium">
                  10th September 2024
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-warning text-2xl">
                  schedule
                </span>
                <p className="text-text-main font-medium">10:00 AM</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-warning text-2xl">
                  location_on
                </span>
                <p className="text-text-main font-medium">
                  Kuje Primary Health Center
                </p>
              </div>
            </div>
          </div>
          {/* Medication Card */}
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-border-light dark:border-gray-700">
            <h3 className="text-xl font-bold text-text-main mb-4">
              Medications & Supplements
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-light">
                  pill
                </span>
                <span className="text-text-subtle">Folic Acid</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-light">
                  pill
                </span>
                <span className="text-text-subtle">Iron Tablets</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-light">
                  pill
                </span>
                <span className="text-text-subtle">Vitamin B-Complex</span>
              </li>
            </ul>
          </div>
          {/* Risk Factors Card */}
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-border-light dark:border-gray-700">
            <h3 className="text-xl font-bold text-text-main mb-4">
              Risk Factors
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-danger mt-1">
                  error
                </span>
                <span className="text-text-subtle">
                  History of High Blood Pressure
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
