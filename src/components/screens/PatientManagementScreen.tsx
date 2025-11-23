import React, { useState } from 'react'
import { usePatients } from '../../hooks/usePatients'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  UserPlus, 
  Pill, 
  Share, 
  Upload,
  List,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut
} from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { Patient, PatientStats } from '../../types/patient'
import { PatientStatsCard } from '../ui/PatientStatsCard'
import { PatientListCard } from '../ui/PatientListCard'
import Button from '../ui/Button'

interface PatientManagementScreenProps {
  patients: Patient[]
  stats: PatientStats
  onBack: () => void
  onAddPatient: () => void
  onMedicationCheck: () => void
  onViewPatient: (patient: Patient) => void
  onEditPatient: (patient: Patient) => void
  onMessagePatient: (patient: Patient) => void
  onDrugAnalysis: () => void
  onLogout: () => void
  onDrugAnalysis: () => void
  onLogout: () => void
}

export const PatientManagementScreen: React.FC<PatientManagementScreenProps> = ({
  patients,
  stats,
  onBack,
  onAddPatient,
  onMedicationCheck,
  onViewPatient,
  onEditPatient,
  onMessagePatient,
  onDrugAnalysis,
  onLogout
}) => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState('patients')

  const { patients: searchResults, loading: searchLoading, searchPatientsQuery } = usePatients()
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)
    
    try {
      await searchPatientsQuery(query)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsSearching(false)
    }
  }
  
  // Use search results if available, otherwise use mock data
  const displayPatients = searchQuery.trim() ? searchResults : patients
  
  const filteredPatients = displayPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.patientId.includes(searchQuery)
  )

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('nav.dashboard'), onClick: onBack },
    { id: 'patients', icon: Users, label: t('nav.patients'), onClick: () => {} },
    { id: 'drugAnalysis', icon: Pill, label: t('nav.drugAnalysis'), onClick: onDrugAnalysis },
    { id: 'appointments', icon: Calendar, label: 'Appointments', onClick: () => {} },
    { id: 'reports', icon: FileText, label: t('nav.reports'), onClick: () => {} },
    { id: 'settings', icon: Settings, label: t('nav.settings'), onClick: () => {} },
  ]

  const quickActions = [
    {
      icon: UserPlus,
      label: 'Add Patient',
      onClick: onAddPatient,
      color: 'bg-primary/20 text-primary'
    },
    {
      icon: Pill,
      label: 'Med Check',
      onClick: onMedicationCheck,
      color: 'bg-primary/20 text-primary'
    },
    {
      icon: Share,
      label: 'Export List',
      onClick: () => console.log('Export'),
      color: 'bg-primary/20 text-primary'
    },
    {
      icon: Upload,
      label: 'Import List',
      onClick: () => console.log('Import'),
      color: 'bg-primary/20 text-primary'
    }
  ]

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 h-screen bg-[#112217] text-white shadow-2xl z-20 flex flex-col"
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#326744]">
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
                    ? 'bg-[#23482f] text-white' 
                    : 'text-white hover:bg-[#23482f]'
                }`}
                onClick={() => {
                  setActiveNav(item.id)
                  item.onClick()
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
        <div className="p-4 border-t border-[#326744]">
          <div className="space-y-2">
            <motion.button
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-[#23482f] transition-all text-sm"
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
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-[#23482f] transition-all text-sm"
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
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Patient Management
            </h1>
            <Button
              variant="primary"
              size="md"
              onClick={onAddPatient}
              className="flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Add New Patient
            </Button>
          </div>
          <p className="text-gray-600">
            Manage patient records and medication safety
          </p>
        </motion.div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-4 space-y-6">
            {/* Stats Cards */}
            <section>
              <div className="grid grid-cols-2 gap-4">
                <PatientStatsCard
                  title="Total Patients"
                  value={stats.totalPatients}
                  delay={0.1}
                />
                <PatientStatsCard
                  title="High Risk"
                  value={stats.highRisk}
                  isHighRisk
                  delay={0.2}
                />
                <PatientStatsCard
                  title="Due for Check-up"
                  value={stats.dueForCheckup}
                  delay={0.3}
                />
                <PatientStatsCard
                  title="Recent Registrations"
                  value={stats.recentRegistrations}
                  delay={0.4}
                />
              </div>
            </section>

            {/* Search & Filter */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="relative mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                {isSearching && (
                  <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
                  </motion.div>
                )}
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  Sort: Risk Level
                </Button>
              </div>
            </motion.section>

            {/* Quick Actions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    className="flex flex-col items-center gap-2 text-center"
                    onClick={action.onClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className={`h-12 w-12 rounded-full ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-medium text-gray-900">{action.label}</p>
                  </motion.button>
                ))}
              </div>
            </motion.section>

            {/* Patient List */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Patient List Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  All Patients ({filteredPatients.length})
                </h3>
                <div className="flex gap-2">
                  <motion.button
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    onClick={() => setViewMode('list')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <List className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    onClick={() => setViewMode('grid')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Patient List Content */}
              <div className="p-4 space-y-3">
                <AnimatePresence mode="wait">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient, index) => (
                      <PatientListCard
                        key={patient.id}
                        patient={patient}
                        delay={0.9 + index * 0.1}
                        onView={onViewPatient}
                        onEdit={onEditPatient}
                        onMessage={onMessagePatient}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
                      <p className="text-gray-600">Try adjusting your search criteria</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {filteredPatients.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-center justify-center gap-2 p-4 border-t border-gray-200"
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-10 h-10 p-0"
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-10 h-10 p-0"
                  >
                    1
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-10 h-10 p-0"
                  >
                    2
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-10 h-10 p-0"
                  >
                    3
                  </Button>
                  
                  <span className="text-gray-400 px-2">...</span>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-10 h-10 p-0"
                  >
                    13
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-10 h-10 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </motion.section>
          </div>
        </main>
      </motion.div>
    </div>
  )
}