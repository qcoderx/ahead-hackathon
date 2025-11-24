/**
 * Utility to map API response to risk level for debugging
 */

export const mapRiskLevel = (apiResponse: any): "low" | "moderate" | "high" | "critical" => {
  let overallRisk: "low" | "moderate" | "high" | "critical" = "low";

  const riskCat = (apiResponse.risk_category || "").toLowerCase();
  const message = (apiResponse.message || "").toLowerCase();
  
  console.log("Risk Mapping Debug:", {
    is_safe: apiResponse.is_safe,
    risk_category: apiResponse.risk_category,
    message: apiResponse.message,
    drug_name: apiResponse.drug_name
  });
  
  // Check if drug is not safe first
  if (!apiResponse.is_safe) {
    // Check for critical/contraindicated keywords
    if (
      riskCat.includes("x") ||
      riskCat.includes("critical") ||
      riskCat.includes("contraindicated") ||
      riskCat.includes("unsafe") ||
      message.includes("contraindicated") ||
      message.includes("should not be used") ||
      message.includes("avoid")
    ) {
      overallRisk = "critical";
    } else if (
      riskCat.includes("high") ||
      riskCat.includes("severe") ||
      riskCat.includes("cautious") ||
      message.includes("caution") ||
      message.includes("risk") ||
      message.includes("dangerous")
    ) {
      overallRisk = "high";
    } else if (
      riskCat.includes("moderate") ||
      riskCat.includes("monitor") ||
      message.includes("monitor")
    ) {
      overallRisk = "moderate";
    } else {
      // If not safe but no specific category, default to moderate
      overallRisk = "moderate";
    }
  }

  console.log("Mapped risk level:", overallRisk);
  return overallRisk;
};