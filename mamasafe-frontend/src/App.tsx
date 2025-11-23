import { useState } from 'react'
import LandingPage from './LandingPage'
import LanguageSelection from './components/screens/LanguageSelection'
import AuthScreen from './components/screens/AuthScreen'
import RegistrationScreen from './components/screens/RegistrationScreen'
import OfflineAccessScreen from './components/screens/OfflineAccessScreen'
import PatientPortalScreen from './components/screens/PatientPortalScreen'
import DashboardScreen from './components/screens/DashboardScreen'
import SingleDrugCheckScreen from './components/screens/SingleDrugCheckScreen'
import DrugAnalysisScreen from './components/screens/DrugAnalysisScreen'
import InteractionResultsScreen from './components/screens/InteractionResultsScreen'
import MedicationResultsScreen from './components/screens/MedicationResultsScreen'
import { PatientRegistrationScreen } from './components/screens/PatientRegistrationScreen'
import { PatientManagementScreen } from './components/screens/PatientManagementScreen'
import PatientProfileScreen from './components/screens/PatientProfileScreen'
import AppointmentsScreen from './components/screens/AppointmentsScreen'
import ScheduleAppointmentScreen from './components/screens/ScheduleAppointmentScreen'
import AppointmentDetailsScreen from './components/screens/AppointmentDetailsScreen'
import { mockPatients, mockPatientStats } from './data/mockPatients'
import { mockInteractionAnalysis } from './data/mockInteractions'
import { mockDashboardStats, mockRecentPatients } from './data/mockDashboard'
import { useTranslation } from './contexts/TranslationContext'
import LoadingScreen from './components/ui/LoadingScreen'

/**
 * Exact replication of the HTML design
 * Every element, color, and spacing matches the original
 */
function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [showLanguageSelection, setShowLanguageSelection] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [showOfflineAccess, setShowOfflineAccess] = useState(false)
  const [showPatientPortal, setShowPatientPortal] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showSingleDrugCheck, setShowSingleDrugCheck] = useState(false)
  const [showDrugAnalysis, setShowDrugAnalysis] = useState(false)
  const [showInteractionResults, setShowInteractionResults] = useState(false)
  const [showMedicationResults, setShowMedicationResults] = useState(false)
  const [showPatientRegistration, setShowPatientRegistration] = useState(false)
  const [showPatientManagement, setShowPatientManagement] = useState(false)
  const [showPatientProfile, setShowPatientProfile] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [showAppointments, setShowAppointments] = useState(false)
  const [showScheduleAppointment, setShowScheduleAppointment] = useState(false)
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [currentAnalysis, setCurrentAnalysis] = useState(mockInteractionAnalysis)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const { } = useTranslation()

  const showLoadingAndNavigate = (message: string, nextAction: () => void, delay = 3000) => {
    setIsLoading(true)
    setLoadingMessage(message)
    setTimeout(() => {
      setIsLoading(false)
      nextAction()
    }, delay)
  }

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />
  }

  if (showLanding) {
    return <LandingPage 
      onEnterApp={() => {
        showLoadingAndNavigate('Initializing MamaSafe...', () => {
          setShowLanding(false)
          setShowLanguageSelection(true)
        })
      }}
      onPatientAccess={() => {
        showLoadingAndNavigate('Loading Patient Portal...', () => {
          setShowLanding(false)
          setShowPatientPortal(true)
        })
      }}
    />
  }

  if (showLanguageSelection) {
    return <LanguageSelection 
      onLanguageSelect={(language) => {
        console.log('Selected language:', language)
        setShowLanguageSelection(false)
        setShowAuth(true)
      }}
      onClose={() => setShowLanguageSelection(false)}
    />
  }

  if (showAuth) {
    return <AuthScreen 
      onLogin={() => {
        setShowAuth(false)
        setShowDashboard(true)
      }}
      onRegister={() => {
        setShowAuth(false)
        setShowRegistration(true)
      }}
      onSMSAccess={() => {
        setShowAuth(false)
        setShowDashboard(true)
      }}
    />
  }

  if (showRegistration) {
    return <RegistrationScreen 
      onComplete={() => {
        setShowRegistration(false)
        setShowDashboard(true)
      }}
      onBack={() => {
        setShowRegistration(false)
        setShowAuth(true)
      }}
    />
  }

  if (showOfflineAccess) {
    return <OfflineAccessScreen 
      onBack={() => {
        setShowOfflineAccess(false)
        setShowAuth(true)
      }}
    />
  }

  if (showPatientPortal) {
    return <PatientPortalScreen 
      onBack={() => {
        setShowPatientPortal(false)
        setShowLanding(true)
      }}
      onAccessRecords={(patientId, phone) => {
        console.log('Patient accessing records:', { patientId, phone })
        setShowPatientPortal(false)
        // Would navigate to patient dashboard
      }}
    />
  }

  if (showAppointmentDetails && selectedAppointment) {
    return <AppointmentDetailsScreen 
      appointment={selectedAppointment}
      onBack={() => {
        setShowAppointmentDetails(false)
        setShowAppointments(true)
      }}
      onEdit={() => {
        setShowAppointmentDetails(false)
        setShowScheduleAppointment(true)
      }}
      onCancel={() => {
        console.log('Cancel appointment:', selectedAppointment)
        setShowAppointmentDetails(false)
        setShowAppointments(true)
      }}
      onCall={() => {
        console.log('Call patient for appointment:', selectedAppointment)
      }}
      onMessage={() => {
        console.log('Message patient for appointment:', selectedAppointment)
      }}
    />
  }

  if (showScheduleAppointment) {
    return <ScheduleAppointmentScreen 
      patient={selectedPatient}
      onBack={() => {
        setShowScheduleAppointment(false)
        if (selectedPatient) {
          setShowPatientProfile(true)
        } else {
          setShowAppointments(true)
        }
      }}
      onSchedule={(appointmentData) => {
        console.log('Schedule appointment:', appointmentData)
        setShowScheduleAppointment(false)
        setShowAppointments(true)
      }}
    />
  }

  if (showAppointments) {
    return <AppointmentsScreen 
      onBack={() => {
        setShowAppointments(false)
        setShowDashboard(true)
      }}
      onNewAppointment={() => {
        setShowAppointments(false)
        setShowScheduleAppointment(true)
      }}
      onAppointmentClick={(appointment) => {
        setSelectedAppointment(appointment)
        setShowAppointments(false)
        setShowAppointmentDetails(true)
      }}
    />
  }

  if (showPatientProfile && selectedPatient) {
    return <PatientProfileScreen 
      patient={selectedPatient}
      onBack={() => {
        setShowPatientProfile(false)
        setShowPatientManagement(true)
      }}
      onEdit={() => {
        console.log('Edit patient:', selectedPatient)
      }}
      onCall={() => {
        console.log('Call patient:', selectedPatient)
      }}
      onArchive={() => {
        console.log('Archive patient:', selectedPatient)
      }}
    />
  }

  if (showPatientManagement) {
    return <PatientManagementScreen 
      patients={mockPatients}
      stats={mockPatientStats}
      onBack={() => {
        setShowPatientManagement(false)
        setShowDashboard(true)
      }}
      onAddPatient={() => {
        setShowPatientManagement(false)
        setShowPatientRegistration(true)
      }}
      onMedicationCheck={() => {
        setShowPatientManagement(false)
        setShowSingleDrugCheck(true)
      }}
      onViewPatient={(patient) => {
        setSelectedPatient(patient)
        setShowPatientManagement(false)
        setShowPatientProfile(true)
      }}
      onEditPatient={(patient) => {
        console.log('Edit patient:', patient)
      }}
      onMessagePatient={(patient) => {
        console.log('Message patient:', patient)
      }}
      onDrugAnalysis={() => {
        setShowPatientManagement(false)
        setShowDrugAnalysis(true)
      }}
      onLogout={() => {
        setShowPatientManagement(false)
        setShowLanding(true)
      }}
    />
  }

  if (showPatientRegistration) {
    return <PatientRegistrationScreen 
      onBack={() => {
        setShowPatientRegistration(false)
        setShowPatientManagement(true)
      }}
      onRegisterSuccess={(patientData) => {
        console.log('Patient registered:', patientData)
        showLoadingAndNavigate('Registering patient...', () => {
          setShowPatientRegistration(false)
          setShowPatientManagement(true)
        })
      }}
    />
  }

  if (showMedicationResults) {
    return <MedicationResultsScreen 
      analysis={currentAnalysis}
      onBack={() => {
        setShowMedicationResults(false)
        setShowDashboard(true)
      }}
      onSavePrescription={() => {
        console.log('Saving prescription:', currentAnalysis)
        // Here you would save prescription to patient records
      }}
      onSMSPatient={() => {
        console.log('Sending SMS to patient:', currentAnalysis.patientName)
        // Here you would send SMS notification to patient
      }}
      onAlertPatient={() => {
        console.log('Alerting patient about risks:', currentAnalysis)
        // Here you would send alert to patient
      }}
      onCallSpecialist={() => {
        console.log('Calling specialist for:', currentAnalysis)
        // Here you would initiate specialist consultation
      }}
    />
  }

  if (showInteractionResults) {
    return <InteractionResultsScreen 
      analysis={mockInteractionAnalysis}
      onBack={() => {
        setShowInteractionResults(false)
        setShowDrugAnalysis(true)
      }}
      onAddDrug={() => {
        setShowInteractionResults(false)
        setShowDrugAnalysis(true)
      }}
      onAlertProvider={(analysis) => {
        console.log('Alerting provider about:', analysis)
        // Here you would send alert to healthcare provider
      }}
      onSaveToRecords={(analysis) => {
        console.log('Saving to patient records:', analysis)
        // Here you would save to patient medical records
      }}
    />
  }

  if (showDrugAnalysis) {
    return <DrugAnalysisScreen 
      onBack={() => {
        setShowDrugAnalysis(false)
        setShowDashboard(true)
      }}
      onAnalyze={(patientId, drugs) => {
        console.log('Analyzing drugs for patient:', { patientId, drugs })
        showLoadingAndNavigate('Analyzing drug interactions...', () => {
          setShowDrugAnalysis(false)
          setShowMedicationResults(true)
        })
      }}
    />
  }

  if (showSingleDrugCheck) {
    return <SingleDrugCheckScreen 
      onBack={() => {
        setShowSingleDrugCheck(false)
        setShowDashboard(true)
      }}
      onAnalyze={(drugName, symptoms) => {
        console.log('Analyzing drug:', { drugName, symptoms })
        showLoadingAndNavigate('Analyzing drug safety...', () => {
          setShowSingleDrugCheck(false)
          setShowMedicationResults(true)
        })
      }}
      onViewHistory={() => console.log('View history')}
    />
  }

  if (showDashboard) {
    return <DashboardScreen 
      stats={mockDashboardStats}
      recentPatients={mockRecentPatients}
      onPatientClick={(patient) => console.log('Patient clicked:', patient)}
      onMedicationCheck={(patientId, medication) => {
        console.log('Medication check:', { patientId, medication })
        setShowDashboard(false)
        setShowSingleDrugCheck(true)
      }}
      onDrugAnalysis={() => {
        console.log('Drug Analysis clicked')
        setShowDashboard(false)
        setShowDrugAnalysis(true)
      }}
      onNewPatient={() => {
        console.log('Dashboard New Patient clicked')
        setShowDashboard(false)
        setShowPatientRegistration(true)
      }}
      onAppointments={() => {
        setShowDashboard(false)
        setShowAppointments(true)
      }}
      onReports={() => console.log('Reports')}
      onViewAllPatients={() => {
        console.log('View all patients')
        setShowDashboard(false)
        setShowPatientManagement(true)
      }}
      onNotificationClick={() => console.log('Notifications')}
      onLogout={() => {
        console.log('User logged out')
        setShowDashboard(false)
        setShowLanding(true)
      }}
    />
  }

  // This should never be reached as all screens are handled above
  return null
}

export default App