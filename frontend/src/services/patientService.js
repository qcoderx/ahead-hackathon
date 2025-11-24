import api, { USE_MOCK_DATA } from "./api";

// Mock patient data
const MOCK_PATIENTS = [
  {
    id: "1",
    patientId: "MS-12345",
    fullName: "Jane Doe",
    age: 32,
    phone: "08012345678",
    address: "Kuje Village, Abuja",
    bloodType: "O+",
    edd: "2024-12-15",
    gravida: 2,
    parity: 1,
    gestationalAge: "24 weeks",
    lastVisit: "2024-07-20",
    riskLevel: "high",
    allergies: ["Penicillin"],
    currentMedications: [
      { name: "Folic Acid", dosage: "400mcg daily", safety: "Safe" },
      { name: "Iron Supplement", dosage: "65mg daily", safety: "Safe" },
    ],
    vitals: {
      bloodPressure: "142/90 mmHg",
      weight: "72 kg",
      hemoglobin: "11.2 g/dL",
    },
    visitHistory: [
      {
        id: "1",
        date: "2024-08-10",
        type: "Routine Check-up",
        location: "Kuje Primary Health Center",
        findings:
          "Fetal Heart Rate: 145bpm. BP elevated. Advised on salt reduction.",
      },
      {
        id: "2",
        date: "2024-07-25",
        type: "Ultrasound Scan",
        location: "Kuje Primary Health Center",
        findings: "Fetal development normal. Estimated weight: 1.8kg.",
      },
    ],
  },
  {
    id: "2",
    patientId: "MS-67890",
    fullName: "Sarah Connor",
    age: 28,
    phone: "08098765432",
    address: "Gwagwalada, Abuja",
    bloodType: "A+",
    edd: "2025-01-20",
    gravida: 1,
    parity: 0,
    gestationalAge: "16 weeks",
    lastVisit: "2024-11-15",
    riskLevel: "low",
    allergies: [],
    currentMedications: [
      { name: "Prenatal Vitamins", dosage: "1 tablet daily", safety: "Safe" },
    ],
    vitals: {
      bloodPressure: "120/80 mmHg",
      weight: "65 kg",
      hemoglobin: "12.5 g/dL",
    },
  },
];

/**
 * Patient Service
 * Handles patient management operations
 */
const patientService = {
  /**
   * Search patients
   * @param {string} query - Search query
   * @returns {Promise<Array>} List of patients
   */
  async searchPatients(query) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (!query) return MOCK_PATIENTS;

      const lowerQuery = query.toLowerCase();
      return MOCK_PATIENTS.filter(
        (p) =>
          p.fullName.toLowerCase().includes(lowerQuery) ||
          p.patientId.toLowerCase().includes(lowerQuery) ||
          p.phone.includes(query)
      );
    }

    return api.get(`/patients/search?q=${encodeURIComponent(query)}`);
  },

  /**
   * Get patient by ID
   * @param {string} id - Patient ID
   * @returns {Promise<Object>} Patient data
   */
  async getPatient(id) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const patient = MOCK_PATIENTS.find(
        (p) => p.id === id || p.patientId === id
      );
      if (!patient) throw new Error("Patient not found");
      return patient;
    }

    return api.get(`/patients/${id}`);
  },

  /**
   * Register new patient
   * @param {Object} patientData - Patient information
   * @returns {Promise<Object>} Created patient
   */
  async registerPatient(patientData) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newPatient = {
        id: String(MOCK_PATIENTS.length + 1),
        patientId: `MS-${Math.random()
          .toString(36)
          .substr(2, 5)
          .toUpperCase()}`,
        ...patientData,
        riskLevel: "low",
        allergies: [],
        currentMedications: [],
        visitHistory: [],
      };

      MOCK_PATIENTS.push(newPatient);
      return newPatient;
    }

    return api.post("/patients", patientData);
  },

  /**
   * Update patient
   * @param {string} id - Patient ID
   * @param {Object} updates - Updated patient data
   * @returns {Promise<Object>} Updated patient
   */
  async updatePatient(id, updates) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const index = MOCK_PATIENTS.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("Patient not found");

      MOCK_PATIENTS[index] = { ...MOCK_PATIENTS[index], ...updates };
      return MOCK_PATIENTS[index];
    }

    return api.put(`/patients/${id}`, updates);
  },

  /**
   * Get patient visit history
   * @param {string} id - Patient ID
   * @returns {Promise<Array>} Visit history
   */
  async getVisitHistory(id) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const patient = MOCK_PATIENTS.find((p) => p.id === id);
      return patient?.visitHistory || [];
    }

    return api.get(`/patients/${id}/history`);
  },

  /**
   * Get recent patients
   * @param {number} limit - Number of patients to return
   * @returns {Promise<Array>} Recent patients
   */
  async getRecentPatients(limit = 5) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_PATIENTS.slice(0, limit);
    }

    return api.get(`/patients/recent?limit=${limit}`);
  },
};

export default patientService;
