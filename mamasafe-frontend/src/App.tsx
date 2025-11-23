import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import LanguageSelection from "./components/screens/LanguageSelection";
import AuthScreen from "./components/screens/AuthScreen";
import RegistrationScreen from "./components/screens/RegistrationScreen";
import OfflineAccessScreen from "./components/screens/OfflineAccessScreen";
import PatientPortalScreen from "./components/screens/PatientPortalScreen";
import DashboardScreen from "./components/screens/DashboardScreen";
import SingleDrugCheckScreen from "./components/screens/SingleDrugCheckScreen";
import DrugAnalysisScreen from "./components/screens/DrugAnalysisScreen";
import InteractionResultsScreen from "./components/screens/InteractionResultsScreen";
import MedicationResultsScreen from "./components/screens/MedicationResultsScreen";
import { PatientRegistrationScreen } from "./components/screens/PatientRegistrationScreen";
import { PatientManagementScreen } from "./components/screens/PatientManagementScreen";
import PatientProfileScreen from "./components/screens/PatientProfileScreen";
import AppointmentsScreen from "./components/screens/AppointmentsScreen";
import ReportsScreen from "./components/screens/ReportsScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import ScheduleAppointmentScreen from "./components/screens/ScheduleAppointmentScreen";
import AppointmentDetailsScreen from "./components/screens/AppointmentDetailsScreen";
import { useTranslation } from "./contexts/TranslationContext";
import LoadingScreen from "./components/ui/LoadingScreen";
import { useDashboardStats } from "./hooks/useDashboardStats";
import { usePatients } from "./hooks/usePatients";
import { InteractionAnalysis } from "./types/interactions";

/**
 * Exact replication of the HTML design
 * Every element, color, and spacing matches the original
 */
function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showOfflineAccess, setShowOfflineAccess] = useState(false);
  const [showPatientPortal, setShowPatientPortal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSingleDrugCheck, setShowSingleDrugCheck] = useState(false);
  const [showDrugAnalysis, setShowDrugAnalysis] = useState(false);
  const [showInteractionResults, setShowInteractionResults] = useState(false);
  const [showMedicationResults, setShowMedicationResults] = useState(false);
  const [showPatientRegistration, setShowPatientRegistration] = useState(false);
  const [showPatientManagement, setShowPatientManagement] = useState(false);
  const [showPatientProfile, setShowPatientProfile] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showScheduleAppointment, setShowScheduleAppointment] = useState(false);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [currentAnalysis, setCurrentAnalysis] =
    useState<InteractionAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const {} = useTranslation();

  // Real Data Hooks
  const {
    stats: dashboardStats,
    loading: statsLoading,
    refreshStats,
  } = useDashboardStats();
  const {
    patients: allPatients,
    loading: patientsLoading,
    searchPatientsQuery,
  } = usePatients();

  // Refresh data when dashboard is shown
  useEffect(() => {
    if (showDashboard) {
      refreshStats();
      searchPatientsQuery("");
    }
  }, [showDashboard]);

  const showLoadingAndNavigate = (
    message: string,
    nextAction: () => void,
    delay = 3000
  ) => {
    setIsLoading(true);
    setLoadingMessage(message);
    setTimeout(() => {
      setIsLoading(false);
      nextAction();
    }, delay);
  };

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  if (showLanding) {
    return (
      <LandingPage
        onEnterApp={() => {
          showLoadingAndNavigate("Initializing MamaSafe...", () => {
            setShowLanding(false);
            setShowLanguageSelection(true);
          });
        }}
        onPatientAccess={() => {
          showLoadingAndNavigate("Loading Patient Portal...", () => {
            setShowLanding(false);
            setShowPatientPortal(true);
          });
        }}
      />
    );
  }

  if (showLanguageSelection) {
    return (
      <LanguageSelection
        onLanguageSelect={(language) => {
          console.log("Selected language:", language);
          setShowLanguageSelection(false);
          setShowAuth(true);
        }}
        onClose={() => setShowLanguageSelection(false)}
      />
    );
  }

  if (showAuth) {
    return (
      <AuthScreen
        onLogin={() => {
          setShowAuth(false);
          setShowDashboard(true);
        }}
        onRegister={() => {
          setShowAuth(false);
          setShowRegistration(true);
        }}
        onSMSAccess={() => {
          setShowAuth(false);
          setShowDashboard(true);
        }}
      />
    );
  }

  if (showRegistration) {
    return (
      <RegistrationScreen
        onComplete={() => {
          setShowRegistration(false);
          setShowDashboard(true);
        }}
        onBack={() => {
          setShowRegistration(false);
          setShowAuth(true);
        }}
      />
    );
  }

  if (showOfflineAccess) {
    return (
      <OfflineAccessScreen
        onBack={() => {
          setShowOfflineAccess(false);
          setShowAuth(true);
        }}
      />
    );
  }

  if (showPatientPortal) {
    return (
      <PatientPortalScreen
        onBack={() => {
          setShowPatientPortal(false);
          setShowLanding(true);
        }}
        onAccessRecords={(patientId, phone) => {
          console.log("Patient accessing records:", { patientId, phone });
          setShowPatientPortal(false);
          // Would navigate to patient dashboard
        }}
      />
    );
  }

  if (showAppointmentDetails && selectedAppointment) {
    return (
      <AppointmentDetailsScreen
        appointment={selectedAppointment}
        onBack={() => {
          setShowAppointmentDetails(false);
          setShowAppointments(true);
        }}
        onEdit={() => {
          setShowAppointmentDetails(false);
          setShowScheduleAppointment(true);
        }}
        onCancel={() => {
          console.log("Cancel appointment:", selectedAppointment);
          setShowAppointmentDetails(false);
          setShowAppointments(true);
        }}
        onCall={() => {
          console.log("Call patient for appointment:", selectedAppointment);
        }}
        onMessage={() => {
          console.log("Message patient for appointment:", selectedAppointment);
        }}
      />
    );
  }

  if (showScheduleAppointment) {
    return (
      <ScheduleAppointmentScreen
        patient={selectedPatient}
        onBack={() => {
          setShowScheduleAppointment(false);
          if (selectedPatient) {
            setShowPatientProfile(true);
          } else {
            setShowAppointments(true);
          }
        }}
        onSchedule={(appointmentData) => {
          console.log("Schedule appointment:", appointmentData);
          setShowScheduleAppointment(false);
          setShowAppointments(true);
        }}
      />
    );
  }

  if (showAppointments) {
    return (
      <AppointmentsScreen
        onBack={() => {
          setShowAppointments(false);
          setShowDashboard(true);
        }}
        onNewAppointment={() => {
          setShowAppointments(false);
          setShowScheduleAppointment(true);
        }}
        onAppointmentClick={(appointment) => {
          setSelectedAppointment(appointment);
          setShowAppointments(false);
          setShowAppointmentDetails(true);
        }}
      />
    );
  }

  if (showReports) {
    return (
      <ReportsScreen
        onBack={() => {
          setShowReports(false);
          setShowDashboard(true);
        }}
      />
    );
  }

  if (showSettings) {
    return (
      <SettingsScreen
        onBack={() => {
          setShowSettings(false);
          setShowDashboard(true);
        }}
        onLogout={() => {
          setShowSettings(false);
          setShowLanding(true);
        }}
      />
    );
  }

  if (showPatientProfile && selectedPatient) {
    return (
      <PatientProfileScreen
        patient={selectedPatient}
        onBack={() => {
          setShowPatientProfile(false);
          setShowPatientManagement(true);
        }}
        onEdit={() => {
          console.log("Edit patient:", selectedPatient);
        }}
        onCall={() => {
          console.log("Call patient:", selectedPatient);
        }}
        onArchive={() => {
          console.log("Archive patient:", selectedPatient);
        }}
      />
    );
  }

  if (showPatientManagement) {
    return (
      <PatientManagementScreen
        patients={allPatients}
        stats={{
          totalPatients: dashboardStats.activePatients,
          highRisk: allPatients.filter((p) => p.riskLevel === "high-risk")
            .length,
          dueForCheckup: dashboardStats.upcoming,
          recentRegistrations: dashboardStats.activeChange,
        }}
        onBack={() => {
          setShowPatientManagement(false);
          setShowDashboard(true);
        }}
        onAddPatient={() => {
          setShowPatientManagement(false);
          setShowPatientRegistration(true);
        }}
        onMedicationCheck={() => {
          setShowPatientManagement(false);
          setShowSingleDrugCheck(true);
        }}
        onViewPatient={(patient) => {
          setSelectedPatient(patient);
          setShowPatientManagement(false);
          setShowPatientProfile(true);
        }}
        onEditPatient={(patient) => {
          console.log("Edit patient:", patient);
        }}
        onMessagePatient={(patient) => {
          console.log("Message patient:", patient);
        }}
        onDrugAnalysis={() => {
          setShowPatientManagement(false);
          setShowDrugAnalysis(true);
        }}
        onLogout={() => {
          setShowPatientManagement(false);
          setShowLanding(true);
        }}
      />
    );
  }

  if (showPatientRegistration) {
    return (
      <PatientRegistrationScreen
        onBack={() => {
          setShowPatientRegistration(false);
          setShowPatientManagement(true);
        }}
        onRegisterSuccess={(patientData) => {
          console.log("Patient registered:", patientData);
          showLoadingAndNavigate("Registering patient...", () => {
            searchPatientsQuery(""); // Refresh patient list
            setShowPatientRegistration(false);
            setShowPatientManagement(true);
          });
        }}
      />
    );
  }

  if (showMedicationResults) {
    return (
      <MedicationResultsScreen
        analysis={currentAnalysis}
        onBack={() => {
          setShowMedicationResults(false);
          setShowDashboard(true);
        }}
        onSavePrescription={() => {
          console.log("Saving prescription:", currentAnalysis);
          if (currentAnalysis) {
            const reports = JSON.parse(
              localStorage.getItem("mamasafe_reports") || "[]"
            );
            reports.unshift({
              id: `R-${Date.now()}`,
              patientName: currentAnalysis.patientName || "Unknown",
              patientId: currentAnalysis.patientId || "Unknown",
              date: new Date().toLocaleDateString(),
              type: "Medication Safety",
              riskLevel: currentAnalysis.riskCategory || "Low",
              summary: currentAnalysis.description || "No summary",
            });
            localStorage.setItem("mamasafe_reports", JSON.stringify(reports));
            alert("Report saved successfully!");
          }
        }}
        onSMSPatient={() => {
          console.log("Sending SMS to patient:", currentAnalysis?.patientName);
        }}
        onAlertPatient={() => {
          console.log("Alerting patient about risks:", currentAnalysis);
        }}
        onCallSpecialist={() => {
          console.log("Calling specialist for:", currentAnalysis);
        }}
      />
    );
  }

  if (showInteractionResults) {
    return (
      <InteractionResultsScreen
        analysis={currentAnalysis}
        onBack={() => {
          setShowInteractionResults(false);
          setShowDrugAnalysis(true);
        }}
        onAddDrug={() => {
          setShowInteractionResults(false);
          setShowDrugAnalysis(true);
        }}
        onAlertProvider={(analysis) => {
          console.log("Alerting provider about:", analysis);
        }}
        onSaveToRecords={(analysis) => {
          console.log("Saving to patient records:", analysis);
          if (analysis) {
            const reports = JSON.parse(
              localStorage.getItem("mamasafe_reports") || "[]"
            );
            reports.unshift({
              id: `R-${Date.now()}`,
              patientName: analysis.patientName || "Unknown",
              patientId: analysis.patientId || "Unknown",
              date: new Date().toLocaleDateString(),
              type: "Interaction Check",
              riskLevel:
                analysis.overallRisk === "critical"
                  ? "Critical"
                  : analysis.overallRisk === "high"
                  ? "High"
                  : analysis.overallRisk === "moderate"
                  ? "Medium"
                  : "Low",
              summary: `Interaction check for ${analysis.drugs
                .map((d) => d.name)
                .join(", ")}`,
            });
            localStorage.setItem("mamasafe_reports", JSON.stringify(reports));
            alert("Interaction report saved successfully!");
          }
        }}
      />
    );
  }

  if (showDrugAnalysis) {
    return (
      <DrugAnalysisScreen
        patient={selectedPatient}
        onBack={() => {
          setShowDrugAnalysis(false);
          setShowDashboard(true);
        }}
        onAnalyze={(patientId, drugs, result) => {
          console.log("Analyzing drugs for patient:", {
            patientId,
            drugs,
            result,
          });

          if (result) {
            const mappedResult: InteractionAnalysis = {
              patientId: patientId,
              patientName:
                selectedPatient?.name || result.patientName || "Unknown",
              drugs: drugs.map((d) => ({ ...d, type: "primary" })),
              interactions: result.interactions.map((i) => ({
                id: i.id,
                severity: i.severity as any,
                title: `Interaction between ${i.drug1.name} and ${i.drug2.name}`,
                description: i.description,
                risk: i.clinicalImpact,
                recommendation: i.recommendations[0] || "Monitor closely",
                action: "Consult specialist",
                drugs: [i.drug1.name, i.drug2.name],
              })),
              overallRisk:
                result.criticalCount > 0
                  ? "critical"
                  : result.majorCount > 0
                  ? "high"
                  : result.moderateCount > 0
                  ? "moderate"
                  : "low",
              analysisDate: result.timestamp || new Date().toISOString(),
            };
            setCurrentAnalysis(mappedResult);
          }

          showLoadingAndNavigate("Analyzing drug interactions...", () => {
            setShowDrugAnalysis(false);
            setShowInteractionResults(true);
          });
        }}
      />
    );
  }

  if (showSingleDrugCheck) {
    return (
      <SingleDrugCheckScreen
        patient={selectedPatient}
        onBack={() => {
          setShowSingleDrugCheck(false);
          setShowDashboard(true);
        }}
        onAnalyze={(drugName, symptoms, result) => {
          console.log("Analyzing drug:", { drugName, symptoms, result });

          if (result) {
            const mappedResult: InteractionAnalysis = {
              patientId: selectedPatient?.patientId || "MS-837492",
              patientName: selectedPatient?.name || "Jessica Alba",
              drugName: result.drug_name,
              category: "Antibiotic", // Placeholder or derived
              riskCategory: result.risk_category,
              emoji: result.is_safe ? "✅" : "⚠️",
              description: result.message,
              details: {
                risks: [result.personalized_notes],
                actions: result.alternative_drug
                  ? [`Consider alternative: ${result.alternative_drug}`]
                  : [],
                monitoring: "Routine monitoring",
              },
              drugs: [{ id: "1", name: result.drug_name, type: "primary" }],
              interactions: [],
              analysisDate: new Date().toISOString(),
              overallRisk: result.risk_category.toLowerCase() as any,
            };
            setCurrentAnalysis(mappedResult);
          }

          showLoadingAndNavigate("Analyzing drug safety...", () => {
            setShowSingleDrugCheck(false);
            setShowMedicationResults(true);
          });
        }}
        onViewHistory={() => console.log("View history")}
      />
    );
  }

  if (showDashboard) {
    return (
      <DashboardScreen
        stats={dashboardStats}
        recentPatients={allPatients.slice(0, 5).map((p) => ({
          id: p.id,
          name: p.name,
          room: p.location, // Mapping location to room for dashboard display
          status:
            p.riskLevel === "safe"
              ? "stable"
              : p.riskLevel === "high-risk"
              ? "critical"
              : "needs-attention",
          avatar: p.avatar || "",
        }))}
        onPatientClick={(patient) => {
          console.log("Patient clicked:", patient);
          setSelectedPatient(patient);
          setShowDashboard(false);
          setShowPatientProfile(true);
        }}
        onMedicationCheck={(patientId, medication) => {
          console.log("Medication check:", { patientId, medication });
          const patient = allPatients.find(
            (p) => p.id === patientId || p.patientId === patientId
          );
          if (patient) {
            setSelectedPatient(patient);
          }
          setShowDashboard(false);
          setShowSingleDrugCheck(true);
        }}
        onDrugAnalysis={() => {
          console.log("Drug Analysis clicked");
          setShowDashboard(false);
          setShowDrugAnalysis(true);
        }}
        onNewPatient={() => {
          console.log("Dashboard New Patient clicked");
          setShowDashboard(false);
          setShowPatientRegistration(true);
        }}
        onAppointments={() => {
          setShowDashboard(false);
          setShowAppointments(true);
        }}
        onReports={() => {
          setShowDashboard(false);
          setShowReports(true);
        }}
        onSettings={() => {
          setShowDashboard(false);
          setShowSettings(true);
        }}
        onViewAllPatients={() => {
          console.log("View all patients");
          setShowDashboard(false);
          setShowPatientManagement(true);
        }}
        onNotificationClick={() => console.log("Notifications")}
        onLogout={() => {
          console.log("User logged out");
          setShowDashboard(false);
          setShowLanding(true);
        }}
      />
    );
  }

  // This should never be reached as all screens are handled above
  return null;
}

export default App;
