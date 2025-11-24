import React, { useState } from "react";
import { motion } from "framer-motion";
import ProviderLayout from "../layouts/ProviderLayout";
import { useNavigate } from "react-router-dom";

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    patientId: "",
    phoneNumber: "",
    age: "",
    address: "",
    edd: "",
    gravida: "",
    parity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering patient:", formData);
    alert("Patient registered successfully! (Mock)");
    navigate("/provider/patient-search");
  };

  return (
    <ProviderLayout>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-neutral-dark dark:text-neutral-light text-4xl font-black leading-tight tracking-[-0.033em]">
            Register New Patient
          </h1>
          <p className="text-neutral-medium text-base font-normal leading-normal mt-2">
            Enter patient details to create a new record.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-light/50 dark:border-neutral-dark/50 shadow-sm p-6 lg:p-8"
        >
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col"
            >
              <label
                className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                required
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g., Jane Doe"
                type="text"
              />
            </motion.div>

            {/* Patient ID */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-col"
            >
              <label
                className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                htmlFor="patientId"
              >
                Patient ID
              </label>
              <input
                required
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                placeholder="e.g., MS-12345"
                type="text"
              />
            </motion.div>

            {/* Phone Number */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col"
            >
              <label
                className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                required
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g., 08012345678"
                type="tel"
              />
            </motion.div>

            {/* Age */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex flex-col"
            >
              <label
                className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                required
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g., 28"
                type="number"
              />
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col md:col-span-2"
            >
              <label
                className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                htmlFor="address"
              >
                Address / Location
              </label>
              <input
                required
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., Kuje Village, Abuja"
                type="text"
              />
            </motion.div>

            {/* EDD */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="flex flex-col"
            >
              <label
                className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                htmlFor="edd"
              >
                Estimated Due Date (EDD)
              </label>
              <input
                required
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                id="edd"
                name="edd"
                value={formData.edd}
                onChange={handleChange}
                type="date"
              />
            </motion.div>

            {/* Gravida & Parity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col md:flex-row gap-6"
            >
              <div className="flex flex-col flex-1">
                <label
                  className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                  htmlFor="gravida"
                >
                  Gravida
                </label>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                  id="gravida"
                  name="gravida"
                  value={formData.gravida}
                  onChange={handleChange}
                  placeholder="e.g., 2"
                  type="number"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label
                  className="text-neutral-dark dark:text-neutral-light text-base font-medium leading-normal pb-2"
                  htmlFor="parity"
                >
                  Parity
                </label>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-dark dark:text-neutral-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6dd] bg-white dark:bg-neutral-dark/50 dark:border-neutral-dark/80 focus:border-primary h-14 placeholder:text-neutral-medium/70 p-[15px] text-base font-normal leading-normal"
                  id="parity"
                  name="parity"
                  value={formData.parity}
                  onChange={handleChange}
                  placeholder="e.g., 1"
                  type="number"
                />
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-center justify-end gap-4 col-span-1 md:col-span-2 mt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-neutral-medium font-medium text-sm px-4 py-2 rounded-lg hover:bg-neutral-light dark:hover:bg-white/10"
                type="button"
                onClick={() => navigate("/provider/patient-search")}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 h-12 px-6 bg-primary text-white rounded-lg font-bold text-base hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                type="submit"
              >
                <span className="material-symbols-outlined">person_add</span>
                Register Patient
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </ProviderLayout>
  );
};

export default PatientRegistration;
