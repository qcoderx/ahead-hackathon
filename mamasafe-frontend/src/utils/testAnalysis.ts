/**
 * Test utility to create sample analysis data for debugging
 */

export const createTestAnalysis = (drugName: string = "Ibuprofen", riskLevel: "low" | "moderate" | "high" | "critical" = "high") => {
  return {
    patientId: "TEST-001",
    patientName: "Test Patient",
    drugName: drugName,
    dosage: "400mg",
    category: "NSAID",
    riskCategory: riskLevel === "critical" ? "Contraindicated" : riskLevel === "high" ? "High Risk" : "Moderate Risk",
    emoji: riskLevel === "low" ? "✅" : riskLevel === "moderate" ? "⚠️" : riskLevel === "high" ? "🚨" : "🚫",
    description: riskLevel === "critical" 
      ? "This medication is contraindicated during pregnancy and should not be used."
      : riskLevel === "high"
      ? "This medication poses significant risks during pregnancy."
      : "This medication requires careful monitoring during pregnancy.",
    details: {
      risks: riskLevel === "critical" 
        ? ["Severe fetal complications", "Premature closure of ductus arteriosus"]
        : ["Potential complications", "Requires monitoring"],
      actions: riskLevel === "critical"
        ? ["Do not administer", "Consult specialist immediately"]
        : ["Monitor closely", "Consider alternatives"],
      monitoring: riskLevel === "critical"
        ? "Immediate specialist consultation required"
        : "Enhanced monitoring required"
    },
    drugs: [{ id: "1", name: drugName, type: "primary" as const }],
    interactions: [],
    analysisDate: new Date().toISOString(),
    overallRisk: riskLevel
  };
};