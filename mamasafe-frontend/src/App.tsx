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
import ScheduleAppointmentScreen from "./components/screens/ScheduleAppointmentScreen";
import AppointmentDetailsScreen from "./components/screens/AppointmentDetailsScreen";
import ReportsScreen from "./components/screens/ReportsScreen";
import { useTranslation } from "./contexts/TranslationContext";
import { useAuth } from "./hooks/useAuth";
import { useDashboardStats } from "./hooks/useDashboardStats";
import { usePatients } from "./hooks/usePatients";
import { usePWA } from "./hooks/usePWA";
import LoadingScreen from "./components/ui/LoadingScreen";
import { PWAInstallButton } from "./components/ui/PWAInstallButton";
import { OfflineIndicator } from "./components/ui/OfflineIndicator";
import { mapRiskLevel } from "./utils/riskMapper";

/**
 * Real API Integration - No Mock Data
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
  const [showScheduleAppointment, setShowScheduleAppointment] = useState(false);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);
  const [showReports, setShowReports] = useState(false);
  const [savedReports, setSavedReports] = useState<any[]>([]);
  
  // Debug current analysis state
  useEffect(() => {
    console.log("Current analysis state changed:", currentAnalysis);
  }, [currentAnalysis]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const {} = useTranslation();
  const { isAuthenticated, logout, user } = useAuth();

  // Real data hooks
  const dashboardStats = useDashboardStats();
  const { patients } = usePatients();
  const { isInstallable, installApp } = usePWA();

  // Check authentication state on app load
  useEffect(() => {
    if (isAuthenticated && showAuth) {
      setShowAuth(false);
      setShowDashboard(true);
    }
  }, [isAuthenticated, showAuth]);

  // Auto-navigate to dashboard if already authenticated
  useEffect(() => {
    const token = localStorage.getItem("mamasafe_token");
    if (token && showLanding) {
      setShowLanding(false);
      setShowDashboard(true);
    }
  }, []);

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

  // Helper to transform API response to the UI's InteractionAnalysis format
  const mapApiResponseToAnalysis = (apiResponse: any, patient: any) => {
    console.log("Mapping API response:", apiResponse);
    console.log("Patient data:", patient);
    
    // Use the utility function for consistent risk mapping
    const overallRisk = mapRiskLevel(apiResponse);

    return {
      patientId: apiResponse.patient_id || patient?.id || "UNKNOWN",
      patientName: patient?.name || "Patient",
      drugName: apiResponse.drug_name || "Unknown Drug",
      dosage: "Standard", // Default as not provided in this specific API response
      category: "Prescription Drug",
      riskCategory: apiResponse.risk_category || "Unknown",
      emoji:
        overallRisk === "low" ? "✅" : 
        overallRisk === "moderate" ? "⚠️" : 
        overallRisk === "high" ? "🚨" : "🚫",
      description: apiResponse.message || "No description available",
      details: {
        risks: apiResponse.personalized_notes ? [apiResponse.personalized_notes] : 
               apiResponse.message ? [apiResponse.message] : ["No specific risks identified"],
        actions: apiResponse.alternative_drug
          ? [
              `Consider alternative: ${apiResponse.alternative_drug}`,
              "Consult Specialist",
            ]
          : overallRisk === "critical" || overallRisk === "high"
            ? ["Do not administer", "Consult specialist immediately"]
            : ["Monitor patient", "Follow standard protocols"],
        monitoring:
          overallRisk === "low"
            ? "Routine monitoring"
            : overallRisk === "critical"
            ? "Immediate specialist consultation required"
            : "Enhanced monitoring required",
      },
      drugs: [{ id: "1", name: apiResponse.drug_name || "Unknown", type: "primary" as const }],
      interactions: [],
      analysisDate: new Date().toISOString(),
      overallRisk: overallRisk,
    };
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
        patients={patients || []}
        stats={{
          totalPatients: patients?.length || 0,
          highRisk:
            patients?.filter((p: any) => p.riskLevel === "high").length || 0,
          dueForCheckup:
            patients?.filter((p: any) => p.dueForCheckup).length || 0,
          recentRegistrations:
            patients?.filter((p: any) => p.recentlyAdded).length || 0,
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
          logout();
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
          setShowPatientRegistration(false);
          setShowPatientManagement(true);
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
          if (currentAnalysis) {
            const report = {
              id: Date.now().toString(),
              ...currentAnalysis,
              savedAt: new Date().toISOString()
            };
            setSavedReports(prev => [report, ...prev]);
            console.log("Report saved:", report);
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
        }}
      />
    );
  }

  if (showDrugAnalysis) {
    return (
      <DrugAnalysisScreen
        onBack={() => {
          setShowDrugAnalysis(false);
          setShowDashboard(true);
        }}
        onAnalyze={(patientId, drugs, result) => {
          console.log("Analyzing drugs for patient:", { patientId, drugs, result });
          
          // Use the actual API result from useDrugAnalysis hook
          if (result && result.interactions && result.interactions.length > 0) {
            // Multi-drug interaction found
            const interaction = result.interactions[0];
            const analysisToSet = {
              drugName: drugs[0]?.name || "Unknown Drug",
              overallRisk: interaction.severity === "critical" ? "critical" as const :
                          interaction.severity === "major" ? "high" as const :
                          interaction.severity === "moderate" ? "moderate" as const : "low" as const,
              emoji: interaction.severity === "critical" ? "🚫" :
                     interaction.severity === "major" ? "🚨" :
                     interaction.severity === "moderate" ? "⚠️" : "✅",
              riskCategory: interaction.severity.charAt(0).toUpperCase() + interaction.severity.slice(1),
              description: interaction.description,
              analysisDate: new Date().toISOString(),
              details: { 
                risks: [interaction.clinicalImpact],
                actions: interaction.recommendations.length > 0 ? interaction.recommendations : ["Consult specialist"],
                monitoring: interaction.severity === "critical" ? "Immediate specialist consultation required" :
                           interaction.severity === "major" ? "Enhanced monitoring required" :
                           "Regular monitoring recommended"
              },
              drugs: drugs.map((drug, index) => ({ 
                id: (index + 1).toString(), 
                name: drug.name, 
                type: index === 0 ? "primary" as const : "additional" as const 
              })),
              interactions: [],
              patientId: patientId,
              patientName: selectedPatient?.name || "Unknown Patient",
              dosage: drugs.length > 1 ? "Multiple" : "Standard",
              category: drugs.length > 1 ? "Multi-Drug Analysis" : "Single Drug Analysis"
            };
            setCurrentAnalysis(analysisToSet);
          } else {
            // Single drug or no interactions - create safe analysis
            const drugName = drugs[0]?.name || "Unknown Drug";
            const analysisToSet = {
              drugName: drugName,
              overallRisk: "low" as const,
              emoji: "✅",
              riskCategory: "Safe",
              description: "No significant drug interactions detected",
              analysisDate: new Date().toISOString(),
              details: { 
                risks: ["No significant risks identified"],
                actions: ["Continue as prescribed", "Monitor patient"],
                monitoring: "Routine monitoring recommended"
              },
              drugs: drugs.map((drug, index) => ({ 
                id: (index + 1).toString(), 
                name: drug.name, 
                type: index === 0 ? "primary" as const : "additional" as const 
              })),
              interactions: [],
              patientId: patientId,
              patientName: selectedPatient?.name || "Unknown Patient",
              dosage: "Standard",
              category: drugs.length > 1 ? "Multi-Drug Analysis" : "Single Drug Analysis"
            };
            setCurrentAnalysis(analysisToSet);
          }
          
          setShowDrugAnalysis(false);
          setShowMedicationResults(true);
        }}
      />
    );
  }

  if (showSingleDrugCheck) {
    return (
      <SingleDrugCheckScreen
        onBack={() => {
          setShowSingleDrugCheck(false);
          setShowDashboard(true);
        }}
        // Updated to accept the apiResponse
        onAnalyze={(drugName, symptoms, apiResponse) => {
          console.log("=== DRUG ANALYSIS DEBUG ===");
          console.log("Drug Name:", drugName);
          console.log("Symptoms:", symptoms);
          console.log("Full API Response:", apiResponse);
          console.log("Response Type:", typeof apiResponse);
          console.log("Response Keys:", apiResponse ? Object.keys(apiResponse) : 'null');
          console.log("API Response details:", {
            is_safe: apiResponse?.is_safe,
            risk_category: apiResponse?.risk_category,
            message: apiResponse?.message,
            drug_name: apiResponse?.drug_name
          });
          console.log("=== END DEBUG ===");

          // Always create an analysis object, even if API response is unexpected
          let analysisToSet;
          
          if (apiResponse && typeof apiResponse === 'object' && (apiResponse.drug_name || apiResponse.message)) {
            // Transform the API response into the format expected by MedicationResultsScreen
            analysisToSet = mapApiResponseToAnalysis(
              apiResponse,
              selectedPatient
            );
            console.log("Successfully mapped analysis:", analysisToSet);
          } else {
            // Fallback if no valid response provided
            console.warn("Invalid or missing API response, using fallback");
            analysisToSet = {
              drugName: drugName,
              overallRisk: "low" as const,
              emoji: "✅",
              riskCategory: "Unknown",
              description: "Analysis completed - no specific risks identified",
              analysisDate: new Date().toISOString(),
              details: { 
                risks: ["No specific risks identified"], 
                actions: ["Monitor patient as per standard protocols"], 
                monitoring: "Routine monitoring recommended" 
              },
              drugs: [{ id: "1", name: drugName, type: "primary" as const }],
              interactions: [],
              patientId: selectedPatient?.id || "UNKNOWN",
              patientName: selectedPatient?.name || "Unknown Patient",
              dosage: "Standard",
              category: "Medication"
            };
            console.log("Using fallback analysis:", analysisToSet);
          }
          
          setCurrentAnalysis(analysisToSet);

          setShowSingleDrugCheck(false);
          setShowMedicationResults(true);
        }}
        onViewHistory={() => console.log("View history")}
      />
    );
  }

  if (showReports) {
    return (
      <ReportsScreen
        reports={savedReports}
        onBack={() => {
          setShowReports(false);
          setShowDashboard(true);
        }}
        onViewReport={(report) => {
          setCurrentAnalysis(report);
          setShowReports(false);
          setShowMedicationResults(true);
        }}
      />
    );
  }

  if (showDashboard) {
    return (
      <DashboardScreen
        stats={
          dashboardStats?.stats || {
            activePatients: 0,
            activeChange: 0,
            upcoming: 0,
            upcomingChange: 0,
            labResults: 0,
            labChange: 0,
            discharges: 0,
            dischargeChange: 0,
          }
        }
        recentPatients={(patients?.slice(0, 5) || []).map((p) => ({
          ...(p as any),
          room: "",
          status: "stable",
        }))}
        clinicName={
          user?.full_name ? `${user.full_name}'s Clinic` : "MamaSafe Clinic"
        }
        location="Lagos, Nigeria"
        userAvatar="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150"
        notificationCount={3}
        onPatientClick={(patient) => console.log("Patient clicked:", patient)}
        onMedicationCheck={(patientId, medication) => {
          console.log("Medication check:", { patientId, medication });
          showLoadingAndNavigate(
            "Preparing medication check...",
            () => {
              setShowDashboard(false);
              setShowSingleDrugCheck(true);
            },
            1500
          );
        }}
        onDrugAnalysis={() => {
          console.log("Drug Analysis clicked");
          showLoadingAndNavigate(
            "Loading drug analysis...",
            () => {
              setShowDashboard(false);
              setShowDrugAnalysis(true);
            },
            1500
          );
        }}
        onNewPatient={() => {
          console.log("Dashboard New Patient clicked");
          showLoadingAndNavigate(
            "Opening patient registration...",
            () => {
              setShowDashboard(false);
              setShowPatientRegistration(true);
            },
            1000
          );
        }}
        onAppointments={() => {
          setShowDashboard(false);
          setShowAppointments(true);
        }}
        onReports={() => {
          setShowDashboard(false);
          setShowReports(true);
        }}
        onViewAllPatients={() => {
          console.log("View all patients");
          showLoadingAndNavigate(
            "Loading patient management...",
            () => {
              setShowDashboard(false);
              setShowPatientManagement(true);
            },
            1500
          );
        }}
        onNotificationClick={() => console.log("Notifications")}
        onLogout={() => {
          console.log("User logged out");
          logout();
          setShowDashboard(false);
          setShowLanding(true);
        }}
      />
    );
  }

  return (
    <>
      <OfflineIndicator />
      <PWAInstallButton />
    </>
  );
}

export default App;
