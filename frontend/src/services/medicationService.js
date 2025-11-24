import api, { USE_MOCK_DATA } from "./api";

// Mock medication check results
const MOCK_MEDICATION_RESULTS = {
  paracetamol: {
    drugName: "Paracetamol",
    safety: "safe",
    category: "Safe to Use",
    pregnancyCategory: "B",
    teratogenicRisk: false,
    breastfeedingCompatible: true,
    interactions: [],
    recommendations:
      "Follow the prescribed dosage. Generally safe during pregnancy.",
    alternatives: [],
  },
  ibuprofen: {
    drugName: "Ibuprofen",
    safety: "caution",
    category: "Use with Caution",
    pregnancyCategory: "C/D",
    teratogenicRisk: true,
    breastfeedingCompatible: false,
    interactions: ["Aspirin", "Warfarin"],
    recommendations:
      "Avoid in third trimester. High risk of complications. Consult healthcare provider.",
    alternatives: [
      {
        name: "Paracetamol",
        description: "Recommended as first-line alternative",
      },
      {
        name: "Acetaminophen",
        description: "Safe alternative for pain relief",
      },
    ],
  },
  isotretinoin: {
    drugName: "Isotretinoin",
    safety: "unsafe",
    category: "Do Not Use",
    pregnancyCategory: "X",
    teratogenicRisk: true,
    breastfeedingCompatible: false,
    interactions: [],
    recommendations:
      "This medication is not recommended for use during pregnancy. Severe birth defects risk.",
    alternatives: [
      {
        name: "Topical Treatments",
        description: "Consult dermatologist for pregnancy-safe alternatives",
      },
    ],
  },
};

/**
 * Medication Service
 * Handles medication safety checks and risk assessments
 */
const medicationService = {
  /**
   * Check medication safety
   * @param {Object} medicationData - Medication information
   * @returns {Promise<Object>} Safety assessment
   */
  async checkMedication(medicationData) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const drugName = medicationData.drugName?.toLowerCase() || "";

      // Find matching mock result
      let result = null;
      if (
        drugName.includes("paracetamol") ||
        drugName.includes("acetaminophen")
      ) {
        result = MOCK_MEDICATION_RESULTS.paracetamol;
      } else if (drugName.includes("ibuprofen")) {
        result = MOCK_MEDICATION_RESULTS.ibuprofen;
      } else if (drugName.includes("isotretinoin")) {
        result = MOCK_MEDICATION_RESULTS.isotretinoin;
      } else {
        // Default caution for unknown drugs
        result = {
          drugName: medicationData.drugName,
          safety: "caution",
          category: "Unknown - Consult Healthcare Provider",
          pregnancyCategory: "Unknown",
          teratogenicRisk: null,
          breastfeedingCompatible: null,
          interactions: [],
          recommendations:
            "This medication is not in our database. Please consult a healthcare provider before use.",
          alternatives: [],
        };
      }

      return {
        id: `check-${Date.now()}`,
        ...result,
        checkedAt: new Date().toISOString(),
        patientId: medicationData.patientId,
      };
    }

    return api.post("/medications/check", medicationData);
  },

  /**
   * Check OTC medication safety
   * @param {string} drugName - Drug name
   * @returns {Promise<Object>} Safety assessment
   */
  async checkOTCMedication(drugName) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const lowerDrugName = drugName.toLowerCase();

      if (lowerDrugName.includes("paracetamol")) {
        return {
          result: "safe",
          ...MOCK_MEDICATION_RESULTS.paracetamol,
        };
      } else if (lowerDrugName.includes("ibuprofen")) {
        return {
          result: "caution",
          ...MOCK_MEDICATION_RESULTS.ibuprofen,
        };
      } else if (lowerDrugName.includes("isotretinoin")) {
        return {
          result: "unsafe",
          ...MOCK_MEDICATION_RESULTS.isotretinoin,
        };
      } else {
        return {
          result: "not-found",
          drugName,
          message: "Medication not found in database",
        };
      }
    }

    return api.post("/medications/otc-check", { drugName });
  },

  /**
   * Get risk assessment result
   * @param {string} id - Assessment ID
   * @returns {Promise<Object>} Risk assessment details
   */
  async getRiskResult(id) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      return {
        id,
        medications: [
          {
            name: "Paracetamol",
            safety: "safe",
            status: "Safe to Use",
            details: "Follow the prescribed dosage.",
          },
          {
            name: "Local Herbal Remedy",
            safety: "caution",
            status: "Use with Caution",
            details: "Please discuss with your healthcare worker before using.",
          },
          {
            name: "Ibuprofen (3rd Trimester)",
            safety: "unsafe",
            status: "Do Not Use",
            details:
              "This medication is not safe during pregnancy. Show this to the healthcare worker immediately.",
          },
        ],
        overallRisk: "caution",
        recommendations:
          "Based on these results, please talk to a nurse, doctor, or community health worker.",
      };
    }

    return api.get(`/medications/risk/${id}`);
  },

  /**
   * Get drug interactions
   * @param {Array<string>} drugNames - List of drug names
   * @returns {Promise<Object>} Interaction analysis
   */
  async checkInteractions(drugNames) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const hasIbuprofen = drugNames.some((d) =>
        d.toLowerCase().includes("ibuprofen")
      );
      const hasAspirin = drugNames.some((d) =>
        d.toLowerCase().includes("aspirin")
      );

      return {
        interactions:
          hasIbuprofen && hasAspirin
            ? [
                {
                  drugs: ["Ibuprofen", "Aspirin"],
                  severity: "high",
                  description: "Increased risk of bleeding and gastric issues",
                },
              ]
            : [],
        safe: !(hasIbuprofen && hasAspirin),
      };
    }

    return api.post("/medications/interactions", { drugNames });
  },
};

export default medicationService;
