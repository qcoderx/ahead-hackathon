import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Calendar, User, Pill, AlertTriangle } from 'lucide-react'

interface Report {
  id: string
  drugName: string
  patientName: string
  patientId: string
  overallRisk: 'low' | 'moderate' | 'high' | 'critical'
  riskCategory: string
  emoji: string
  analysisDate: string
  savedAt: string
}

interface ReportsScreenProps {
  reports: Report[]
  onBack: () => void
  onViewReport: (report: Report) => void
}

const ReportsScreen: React.FC<ReportsScreenProps> = ({ reports, onBack, onViewReport }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl z-20 flex flex-col w-64"
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <motion.img 
              src="/images/logo.png" 
              alt="MamaSafe" 
              className="h-8 w-8 object-contain"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <div>
              <h1 className="text-sm font-bold">MamaSafe</h1>
              <p className="text-xs text-gray-400">Reports</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            <motion.button
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all text-sm"
              onClick={onBack}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">Back to Dashboard</span>
            </motion.button>
          </div>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen ml-64">
        {/* Header */}
        <motion.header
          className="flex items-center bg-white p-4 shadow-sm sticky top-0 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="flex-1 text-center text-lg font-bold tracking-tight text-gray-900">
            Medication Reports
          </h1>
        </motion.header>

        <main className="flex-1 overflow-y-auto p-6">
          {reports.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Reports Yet</h2>
              <p className="text-gray-600">
                Saved medication analysis reports will appear here
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  Saved Reports ({reports.length})
                </h2>
              </motion.div>

              <div className="grid gap-4">
                {reports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onViewReport(report)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{report.emoji}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {report.drugName}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{report.patientName}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(report.savedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(report.overallRisk)}`}>
                            {report.riskCategory}
                          </span>
                          <span className="text-sm text-gray-500">
                            Patient ID: {report.patientId}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {report.overallRisk === 'critical' && (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        <Pill className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ReportsScreen