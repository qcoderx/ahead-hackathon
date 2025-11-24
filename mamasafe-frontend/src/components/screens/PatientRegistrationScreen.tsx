import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Baby, Stethoscope, MapPin } from "lucide-react";
import { useTranslation } from "../../contexts/TranslationContext";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";
import { Select } from "../ui/Select";

interface PatientFormData {
  firstName: string;
  lastName: string;
  age: string;
  phoneNumber: string;
  location: string;
  gestationalWeek: string;
  lastMenstrualPeriod: string;
  expectedDueDate: string;
  highRiskPregnancy: string;
  knownAllergies: string;
  currentMedications: string;
  previousPregnancies: string;
  knownComplications: string;
  weight: string;
  height: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  consultationReason: string;
  diagnosis: string;
  notes: string;
}

interface PatientRegistrationScreenProps {
  onBack: () => void;
  onRegisterSuccess: (patientData: PatientFormData) => void;
}

export const PatientRegistrationScreen: React.FC<
  PatientRegistrationScreenProps
> = ({ onBack, onRegisterSuccess }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    location: "",
    gestationalWeek: "",
    lastMenstrualPeriod: "",
    expectedDueDate: "",
    highRiskPregnancy: "no",
    knownAllergies: "",
    currentMedications: "",
    previousPregnancies: "",
    knownComplications: "",
    weight: "",
    height: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    consultationReason: "",
    diagnosis: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<PatientFormData>>({});

  const handleInputChange = (field: keyof PatientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PatientFormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { createPatient, updateEncounter } = await import("../../api");

      // Calculate date of birth from age
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - parseInt(formData.age);
      const dateOfBirth = `${birthYear}-01-01`;

      const patientData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: dateOfBirth,
        gender: "Female", // Fixed to Title Case for backend validation
        address: formData.location,
        phone_number: formData.phoneNumber,
        allergies: formData.knownAllergies ? [formData.knownAllergies] : [],
      };

      type CreatePatientResponse = { patient_id?: number; [key: string]: any };
      const response = (await createPatient(
        patientData
      )) as CreatePatientResponse;
      console.log("Patient created:", response);

      if (response && response.patient_id) {
        const patientIdNumber = response.patient_id;
        console.log("Patient created with ID:", patientIdNumber);
        
        await updateEncounter({
          patient_id: patientIdNumber,
          weight: formData.weight,
          height: formData.height,
          blood_pressure: formData.bloodPressure,
          heart_rate: formData.heartRate,
          temperature: formData.temperature,
          consultation_reason: formData.consultationReason,
          diagnosis: formData.diagnosis,
          notes: formData.notes,
          medications: formData.currentMedications
            ? [formData.currentMedications]
            : [],
          allergies: formData.knownAllergies ? [formData.knownAllergies] : [],
          previous_complications: formData.knownComplications
            ? [formData.knownComplications]
            : [],
        });
        console.log("Encounter created");
        
        // Show success message
        alert(`Patient registered successfully! Patient ID: ${patientIdNumber}`);
      } else {
        console.error("No patient_id in response:", response);
        alert("Patient created but no ID returned. Please check with administrator.");
      }

      onRegisterSuccess(formData);
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ firstName: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendSMSInvite = async () => {
    if (!formData.phoneNumber.trim()) {
      setErrors({ phoneNumber: "Phone number is required for SMS invite" });
      return;
    }

    try {
      const { invitePatient } = await import("../../api");
      // Generate a temporary patient ID for SMS invite
      const tempPatientId = `temp_${Date.now()}`;
      await invitePatient(tempPatientId, formData.phoneNumber);
      alert("SMS invite sent successfully!");
    } catch (error) {
      console.error("SMS invite failed:", error);
      alert("Failed to send SMS invite. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4"
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">
            {t("registerNewPatient")}
          </h1>
          <div className="w-9" />
        </div>
      </motion.div>

      <div className="px-4 py-6 space-y-6 pb-32">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-primary mr-3" />
              <h3 className="text-lg font-bold text-gray-900">
                {t("personalInformation")}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t("firstName")}
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(value) => handleInputChange("firstName", value)}
                  error={errors.firstName}
                  required
                />
                <Input
                  label={t("lastName")}
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(value) => handleInputChange("lastName", value)}
                  error={errors.lastName}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t("age")}
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(value) => handleInputChange("age", value)}
                  error={errors.age}
                  required
                />
                <Input
                  label={t("phoneNumber")}
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={(value) => handleInputChange("phoneNumber", value)}
                  error={errors.phoneNumber}
                  required
                />
              </div>

              <Input
                label={t("location")}
                placeholder="Enter patient's location"
                value={formData.location}
                onChange={(value) => handleInputChange("location", value)}
                error={errors.location}
                required
              />
            </div>
          </Card>
        </motion.div>

        {/* Pregnancy Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-5">
            <div className="flex items-center mb-4">
              <Baby className="w-5 h-5 text-primary mr-3" />
              <h3 className="text-lg font-bold text-gray-900">
                {t("pregnancyInformation")}
              </h3>
            </div>

            <div className="space-y-4">
              <Input
                label={t("gestationalWeek")}
                type="number"
                placeholder="e.g., 24"
                value={formData.gestationalWeek}
                onChange={(value) =>
                  handleInputChange("gestationalWeek", value)
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t("lastMenstrualPeriod")}
                  type="date"
                  value={formData.lastMenstrualPeriod}
                  onChange={(value) =>
                    handleInputChange("lastMenstrualPeriod", value)
                  }
                />
                <Input
                  label={t("expectedDueDate")}
                  type="date"
                  value={formData.expectedDueDate}
                  onChange={(value) =>
                    handleInputChange("expectedDueDate", value)
                  }
                />
              </div>

              <Select
                label={t("highRiskPregnancy")}
                value={formData.highRiskPregnancy}
                onChange={(value) =>
                  handleInputChange("highRiskPregnancy", value)
                }
                options={[
                  { value: "no", label: t("no") },
                  { value: "yes", label: t("yes") },
                ]}
              />
            </div>
          </Card>
        </motion.div>

        {/* Medical History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-5">
            <div className="flex items-center mb-4">
              <Stethoscope className="w-5 h-5 text-primary mr-3" />
              <h3 className="text-lg font-bold text-gray-900">
                {t("medicalHistory")}
              </h3>
            </div>

            <div className="space-y-4">
              <Input
                label={t("knownAllergies")}
                placeholder="e.g., Penicillin, Peanuts"
                value={formData.knownAllergies}
                onChange={(value) => handleInputChange("knownAllergies", value)}
              />

              <Input
                label={t("currentMedications")}
                placeholder="List any medications"
                value={formData.currentMedications}
                onChange={(value) =>
                  handleInputChange("currentMedications", value)
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t("previousPregnancies")}
                  type="number"
                  placeholder="Enter count"
                  value={formData.previousPregnancies}
                  onChange={(value) =>
                    handleInputChange("previousPregnancies", value)
                  }
                />
                <Input
                  label={t("knownComplications")}
                  placeholder="e.g., Preeclampsia"
                  value={formData.knownComplications}
                  onChange={(value) =>
                    handleInputChange("knownComplications", value)
                  }
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Vitals & Encounter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-5">
            <div className="flex items-center mb-4">
              <Stethoscope className="w-5 h-5 text-primary mr-3" />
              <h3 className="text-lg font-bold text-gray-900">
                Vitals & Encounter
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Input
                  label="Weight (kg)"
                  type="number"
                  placeholder="e.g. 65"
                  value={formData.weight}
                  onChange={(value) => handleInputChange("weight", value)}
                />
                <Input
                  label="Height (cm)"
                  type="number"
                  placeholder="e.g. 165"
                  value={formData.height}
                  onChange={(value) => handleInputChange("height", value)}
                />
                <Input
                  label="BP (mmHg)"
                  placeholder="e.g. 120/80"
                  value={formData.bloodPressure}
                  onChange={(value) =>
                    handleInputChange("bloodPressure", value)
                  }
                />
                <Input
                  label="Heart Rate (bpm)"
                  type="number"
                  placeholder="e.g. 72"
                  value={formData.heartRate}
                  onChange={(value) => handleInputChange("heartRate", value)}
                />
                <Input
                  label="Temp (°C)"
                  type="number"
                  placeholder="e.g. 36.5"
                  value={formData.temperature}
                  onChange={(value) => handleInputChange("temperature", value)}
                />
              </div>

              <Input
                label="Consultation Reason"
                placeholder="Reason for visit"
                value={formData.consultationReason}
                onChange={(value) =>
                  handleInputChange("consultationReason", value)
                }
              />

              <Input
                label="Diagnosis"
                placeholder="Initial diagnosis"
                value={formData.diagnosis}
                onChange={(value) => handleInputChange("diagnosis", value)}
              />

              <Input
                label="Notes"
                placeholder="Additional notes"
                value={formData.notes}
                onChange={(value) => handleInputChange("notes", value)}
              />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4"
      >
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            onClick={handleRegister}
            loading={isSubmitting}
            className="w-full shadow-lg"
          >
            {t("registerPatient")}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleSendSMSInvite}
            className="w-full"
          >
            {t("sendSMSInvite")}
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          {t("hipaaCompliant")}
        </p>
      </motion.div>
    </div>
  );
};
