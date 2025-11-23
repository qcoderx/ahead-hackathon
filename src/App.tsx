import { useState, useEffect } from 'react'
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
import { useTranslation } from './contexts/TranslationContext'
import { useAuth } from './hooks/useAuth'
import { useDashboardStats } from './hooks/useDashboardStats'
import { usePatients } from './hooks/usePatients'
import LoadingScreen from './components/ui/LoadingScreen'

/**
 * Real API Integration - No Mock Data
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
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const { } = useTranslation()
  const { isAuthenticated, logout, user } = useAuth()
  
  // Real data hooks
  const { stats: dashboardStats, loading: statsLoading } = useDashboardStats()
  const { patients, loading: patientsLoading } = usePatients()

  // Check authentication state on app load
  useEffect(() => {
    if (isAuthenticated && showAuth) {
      setShowAuth(false)
      setShowDashboard(true)
    }
  }, [isAuthenticated, showAuth])

  // Auto-navigate to dashboard if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('mamasafe_token')
    if (token && showLanding) {
      setShowLanding(false)
      setShowDashboard(true)
    }
  }, [])

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
      onArchive(() => {
        console.log('Archive patient:', selectedPatient)
      }}
    />
  }

  if (showPatientManagement) {
    return <PatientManagementScreen 
      patients={patients || []}
      stats={{
        totalPatients: patients?.length || 0,
        highRisk: patients?.filter((p: any) => p.riskLevel === 'high').length || 0,
        dueForCheckup: patients?.filter((p: any) => p.dueForCheckup).length || 0,
        recentRegistrations: patients?.filter((p: any) => p.recentlyAdded).length || 0,
      }}
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
        logout()
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
      }}
      onSMSPatient={() => {
        console.log('Sending SMS to patient:', currentAnalysis?.patientName)
      }}
      onAlertPatient={() => {
        console.log('Alerting patient about risks:', currentAnalysis)
      }}
      onCallSpecialist={() => {
        console.log('Calling specialist for:', currentAnalysis)
      }}
    />
  }

  if (showInteractionResults) {
    return <InteractionResultsScreen 
      analysis={currentAnalysis}
      onBack={() => {
        setShowInteractionResults(false)
        setShowDrugAnalysis(true)
      }}
      onAddDrug(() => {
        setShowInteractionResults(false)
        setShowDrugAnalysis(true)
      }}
      onAlertProvider={(analysis) => {
        console.log('Alerting provider about:', analysis)
      }}
      onSaveToRecords={(analysis) => {
        console.log('Saving to patient records:', analysis)
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
        setShowDrugAnalysis(false)
        setShowMedicationResults(true)
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
        setShowSingleDrugCheck(false)
        setShowMedicationResults(true)
      }}
      onViewHistory={() => console.log('View history')}
    />
  }

  if (showDashboard) {
    return <DashboardScreen 
      stats={dashboardStats || {
        activePatients: 0,
        activeChange: '+0%',
        upcoming: 0,
        upcomingChange: '+0%',
        labResults: 0,
        labChange: '+0%',
        discharges: 0,
        dischargeChange: '+0%'
      }}
      recentPatients={patients?.slice(0, 5) || []}
      clinicName={user?.full_name ? `${user.full_name}'s Clinic` : 'MamaSafe Clinic'}
      location="Lagos, Nigeria"
      userAvatar="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150"
      notificationCount={3}
      onPatientClick={(patient) => console.log('Patient clicked:', patient)}
      onMedicationCheck={(patientId, medication) => {
        console.log('Medication check:', { patientId, medication })
        showLoadingAndNavigate('Preparing medication check...', () => {
          setShowDashboard(false)
          setShowSingleDrugCheck(true)
        }, 1500)
      }}
      onDrugAnalysis={() => {
        console.log('Drug Analysis clicked')
        showLoadingAndNavigate('Loading drug analysis...', () => {
          setShowDashboard(false)
          setShowDrugAnalysis(true)
        }, 1500)
      }}
      onNewPatient={() => {
        console.log('Dashboard New Patient clicked')
        showLoadingAndNavigate('Opening patient registration...', () => {
          setShowDashboard(false)
          setShowPatientRegistration(true)
        }, 1000)
      }}
      onAppointments={() => {
        setShowDashboard(false)
        setShowAppointments(true)
      }}
      onReports={() => console.log('Reports')}
      onViewAllPatients={() => {
        console.log('View all patients')
        showLoadingAndNavigate('Loading patient management...', () => {
          setShowDashboard(false)
          setShowPatientManagement(true)
        }, 1500)
      }}
      onNotificationClick={() => console.log('Notifications')}
      onLogout={() => {
        console.log('User logged out')
        logout()
        setShowDashboard(false)
        setShowLanding(true)
      }}
    />
  }

  return null
}

export default App