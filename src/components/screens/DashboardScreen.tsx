import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { DashboardStats, Patient } from '../../types/dashboard'
import DashboardHeader from '../sections/DashboardHeader'
import StatCard from '../ui/StatCard'
import QuickMedicationCheck from '../sections/QuickMedicationCheck'
import DashboardShortcuts from '../sections/DashboardShortcuts'
import PatientCard from '../ui/PatientCard'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Heart,
  Pill
} from 'lucide-react'

interface DashboardScreenProps {
  stats: DashboardStats
  recentPatients: Patient[]
  clinicName?: string
  location?: string
  userAvatar?: string
  notificationCount?: number
  onPatientClick?: (patient: Patient) => void
  onMedicationCheck?: (patientId: string, medication: string) => void
  onDrugAnalysis?: () => void
  onNewPatient?: () => void
  onAppointments?: () => void
  onReports?: () => void
  onViewAllPatients?: () => void
  onNotificationClick?: () => void
  onLogout?: () => void
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({
  stats,
  recentPatients,
  clinicName = "St. Mary's Maternity Wing",
  location = "Springfield, IL",
  userAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuBIUWofxSAII6VlTV4Yimd7jj2SL9eSR5WVANK-2XG4Ja2BoP7qTWaFXL9NuU_salqe1BTZ1JFBfZXImaBKVELqW6ixBw2B4_g1Em_2Y0ifqdWCYdNprLrLnN2xOiYfqEOw44Bjz3ABTkfONZ65ko7qvatHQPDVHDUn9NLdaKALsyTIp1nv7e0nw9pkCbfP57sxGutG8SQDiJ-61Z-qs9HUoOJniaQuMI2EC4S32yjWeYwLCcE-03Tk0maTr_3knX7a1gGYBn2ynCI8",
  notificationCount = 3,
  onPatientClick,
  onMedicationCheck,
  onDrugAnalysis,
  onNewPatient,
  onAppointments,
  onReports,
  onViewAllPatients,
  onNotificationClick,
  onLogout
}) => {
  const { t } = useTranslation()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('nav.dashboard'), active: true },
    { id: 'patients', icon: Users, label: t('nav.patients'), active: false },
    { id: 'drugAnalysis', icon: Pill, label: t('nav.drugAnalysis'), active: false },
    { id: 'appointments', icon: Calendar, label: 'Appointments', active: false },
    { id: 'reports', icon: FileText, label: t('nav.reports'), active: false },
    { id: 'settings', icon: Settings, label: t('nav.settings'), active: false },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl z-20 flex flex-col"
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <motion.div 
            className="flex items-center gap-2"
            animate={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
          >
            <motion.img 
              src="/images/logo.png" 
              alt="MamaSafe" 
              className="h-12 w-12 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-sm font-semibold">MamaSafe</h1>
                  <p className="text-xs text-gray-400">Healthcare</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                  activeNav === item.id 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
                onClick={() => {
                  setActiveNav(item.id)
                  if (item.id === 'drugAnalysis') {
                    onDrugAnalysis?.()
                  } else if (item.id === 'patients') {
                    onViewAllPatients?.()
                  }
                }}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      className="font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="space-y-2">
            <motion.button
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all text-sm"
              whileHover={{ x: 2 }}
            >
              <HelpCircle className="h-4 w-4 flex-shrink-0" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {t('nav.help')}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all text-sm"
              whileHover={{ x: 2 }}
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {t('nav.logout')}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Collapse Toggle */}
        <motion.button
          className="absolute -right-3 top-20 bg-white text-gray-600 rounded-full p-1.5 shadow-lg hover:bg-gray-50 transition-colors"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <motion.div 
        className="flex-1 flex flex-col min-h-screen"
        animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <DashboardHeader
          clinicName={clinicName}
          location={location}
          userAvatar={userAvatar}
          notificationCount={notificationCount}
          onNotificationClick={onNotificationClick}
        />
        
        {/* Dashboard Content with proper padding */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Today's Overview */}
            <section>
              <motion.h2
                className="text-gray-900 text-[28px] font-bold leading-tight tracking-[-0.015em] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {t('dashboard.todaysOverview')}
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title={t('dashboard.activePatients')}
                  value={stats.activePatients}
                  change={stats.activeChange}
                  delay={0.2}
                />
                <StatCard
                  title={t('dashboard.upcoming')}
                  value={stats.upcoming}
                  change={stats.upcomingChange}
                  delay={0.3}
                />
                <StatCard
                  title={t('dashboard.labResults')}
                  value={stats.labResults}
                  change={stats.labChange}
                  delay={0.4}
                />
                <StatCard
                  title={t('dashboard.discharges')}
                  value={stats.discharges}
                  change={stats.dischargeChange}
                  delay={0.5}
                />
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Medication Check */}
                <QuickMedicationCheck onCheck={onMedicationCheck} />

                {/* Shortcuts */}
                <DashboardShortcuts
                  onNewPatient={onNewPatient}
                  onAppointments={onAppointments}
                  onReports={onReports}
                />
              </div>

              {/* Right Column - Recent Patients */}
              <div className="lg:col-span-1">
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="flex justify-between items-center p-4 pb-3 border-b border-gray-100">
                    <h3 className="text-gray-900 text-lg font-semibold">
                      {t('dashboard.recentPatients')}
                    </h3>
                    <motion.button
                      className="px-2 py-1 text-gray-600 font-medium text-sm hover:text-gray-900 transition-colors"
                      onClick={onViewAllPatients}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('dashboard.viewAll')}
                    </motion.button>
                  </div>
                  
                  <div className="p-3 space-y-2">
                    {recentPatients.map((patient, index) => (
                      <PatientCard
                        key={patient.id}
                        patient={patient}
                        delay={1.0 + index * 0.1}
                        onClick={onPatientClick}
                      />
                    ))}
                  </div>
                </motion.section>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  )
}

export default DashboardScreen