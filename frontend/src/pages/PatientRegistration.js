import React, { useState } from "react";
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
    // TODO: Implement actual registration logic here (API call)
    console.log("Registering patient:", formData);
    alert("Patient registered successfully! (Mock)");
    navigate("/provider/patient-search");
  };

  return (
    <ProviderLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-neutral-dark dark:text-neutral-light text-4xl font-black leading-tight tracking-[-0.033em]">
            Register New Patient
          </h1>
          <p className="text-neutral-medium text-base font-normal leading-normal mt-2">
            Enter patient details to create a new record.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-light/50 dark:border-neutral-dark/50 shadow-sm p-6 lg:p-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <div className="flex flex-col">
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
            </div>

            {/* Patient ID */}
            <div className="flex flex-col">
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
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
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
            </div>

            {/* Age */}
            <div className="flex flex-col">
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
            </div>

            {/* Address */}
            <div className="flex flex-col md:col-span-2">
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
            </div>

            {/* EDD */}
            <div className="flex flex-col">
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
            </div>

            {/* Gravida & Parity */}
            <div className="flex flex-col md:flex-row gap-6">
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
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 col-span-1 md:col-span-2 mt-4">
              <button
                className="text-neutral-medium font-medium text-sm px-4 py-2 rounded-lg hover:bg-neutral-light dark:hover:bg-white/10"
                type="button"
                onClick={() => navigate("/provider/patient-search")}
              >
                Cancel
              </button>
              <button
                className="flex items-center justify-center gap-2 h-12 px-6 bg-primary text-white rounded-lg font-bold text-base hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                type="submit"
              >
                <span className="material-symbols-outlined">person_add</span>
                Register Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default PatientRegistration;
