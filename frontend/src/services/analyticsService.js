import api, { USE_MOCK_DATA } from "./api";

// Mock analytics data
const MOCK_ANALYTICS = {
  dashboard: {
    totalPatients: 1247,
    activePregnancies: 342,
    highRiskCases: 42,
    medicationChecks: 156,
    recentActivity: [
      {
        id: "1",
        type: "New Patient",
        patient: "Jane Doe",
        time: "2 hours ago",
      },
      {
        id: "2",
        type: "Medication Check",
        patient: "Sarah Connor",
        time: "3 hours ago",
      },
      {
        id: "3",
        type: "High Risk Alert",
        patient: "Mary Johnson",
        time: "5 hours ago",
      },
    ],
  },
  drugFlags: {
    totalChecks: 156,
    redFlags: 12,
    yellowFlags: 28,
    mostFlaggedDrug: "Ibuprofen",
    categories: [
      { name: "Teratogenic Risk", value: 45, color: "red" },
      { name: "Drug-Drug Interaction", value: 30, color: "orange" },
      { name: "Dosage Warning", value: 15, color: "yellow" },
      { name: "Breastfeeding Risk", value: 10, color: "blue" },
    ],
    recentFlags: [
      { drug: "Ibuprofen", risk: "High", time: "2 hours ago" },
      { drug: "Aspirin", risk: "Medium", time: "4 hours ago" },
      { drug: "Codeine", risk: "High", time: "6 hours ago" },
      { drug: "Warfarin", risk: "High", time: "8 hours ago" },
    ],
    topFlaggedDrugs: [
      { name: "Ibuprofen", flags: 45, risk: "High", category: "NSAID" },
      { name: "Aspirin", flags: 32, risk: "Medium", category: "Antiplatelet" },
      { name: "Codeine", flags: 28, risk: "High", category: "Opioid" },
      { name: "Warfarin", flags: 24, risk: "High", category: "Anticoagulant" },
      { name: "Metformin", flags: 18, risk: "Low", category: "Antidiabetic" },
    ],
  },
  highRisk: {
    activeHighRisk: 42,
    unresolvedAlerts: 8,
    avgResponseTime: "2.5 hrs",
    riskFactors: [
      { factor: "Preeclampsia", percentage: 40 },
      { factor: "Hemorrhage Risk", percentage: 30 },
      { factor: "Gestational Diabetes", percentage: 30 },
    ],
    monthlyTrend: [
      { month: "Jan", cases: 30 },
      { month: "Feb", cases: 45 },
      { month: "Mar", cases: 35 },
      { month: "Apr", cases: 60 },
      { month: "May", cases: 50 },
      { month: "Jun", cases: 75 },
    ],
    recentAlerts: [
      {
        patient: "Sarah Connor",
        risk: "Severe Hypertension",
        doctor: "Dr. Silberman",
        date: "Today, 09:41 AM",
        status: "Critical",
      },
      {
        patient: "Ellen Ripley",
        risk: "Abnormal Fetal Heart Rate",
        doctor: "Nurse Bishop",
        date: "Yesterday",
        status: "Monitoring",
      },
      {
        patient: "Dana Scully",
        risk: "Gestational Diabetes",
        doctor: "Dr. Mulder",
        date: "Nov 15, 2024",
        status: "Stable",
      },
    ],
  },
  smsLogs: {
    smsSent24h: 1842,
    deliveryRate: 99.2,
    failed: 14,
    offlineSyncEvents: 328,
    systemStatus: "operational",
    gatewayLatency: "240ms",
    recentErrors: [
      {
        timestamp: "2024-11-19 10:23:45",
        type: "SMS_GATEWAY_TIMEOUT",
        message: "Connection timed out to Provider A",
        status: "Retrying",
        retryCount: "3/5",
      },
      {
        timestamp: "2024-11-19 09:15:22",
        type: "SYNC_CONFLICT",
        message: "Patient ID P-4421 record version mismatch",
        status: "Failed",
        retryCount: "0",
      },
      {
        timestamp: "2024-11-19 08:45:10",
        type: "INVALID_NUMBER",
        message: "Failed to send alert to +254700...",
        status: "Resolved",
        retryCount: "-",
      },
    ],
  },
};

/**
 * Analytics Service
 * Handles analytics and statistics
 */
const analyticsService = {
  /**
   * Get dashboard statistics
   * @returns {Promise<Object>} Dashboard data
   */
  async getDashboardStats() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return MOCK_ANALYTICS.dashboard;
    }

    return api.get("/analytics/dashboard");
  },

  /**
   * Get drug flag analytics
   * @returns {Promise<Object>} Drug flag data
   */
  async getDrugFlagAnalytics() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return MOCK_ANALYTICS.drugFlags;
    }

    return api.get("/analytics/drug-flags");
  },

  /**
   * Get high-risk analytics
   * @returns {Promise<Object>} High-risk data
   */
  async getHighRiskAnalytics() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return MOCK_ANALYTICS.highRisk;
    }

    return api.get("/analytics/high-risk");
  },

  /**
   * Get SMS and error logs
   * @returns {Promise<Object>} SMS log data
   */
  async getSMSLogs() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_ANALYTICS.smsLogs;
    }

    return api.get("/analytics/sms-logs");
  },

  /**
   * Get patient dashboard stats
   * @param {string} patientId - Patient ID
   * @returns {Promise<Object>} Patient dashboard data
   */
  async getPatientDashboard(patientId) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      return {
        nextAppointment: {
          date: "2024-11-20",
          time: "10:00 AM",
          type: "Antenatal Check",
          doctor: "Dr. Sarah Johnson",
        },
        healthIndicators: {
          bloodPressure: "142/90 mmHg",
          weight: "72 kg",
          bloodGroup: "O+",
          hemoglobin: "11.2 g/dL",
        },
        currentMedications: [
          { name: "Folic Acid", dosage: "400mcg daily" },
          { name: "Iron Supplement", dosage: "65mg daily" },
          { name: "Prenatal Vitamins", dosage: "1 tablet daily" },
        ],
      };
    }

    return api.get(`/analytics/patient-dashboard/${patientId}`);
  },
};

export default analyticsService;
