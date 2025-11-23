import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Pill, Save, MessageSquare, Phone, AlertTriangle, Shield, Bell } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { InteractionAnalysis } from '../../types/interactions'

interface MedicationResultsScreenProps {
  analysis: InteractionAnalysis
  onBack: () => void
  onSavePrescription?: () => void
  onSMSPatient?: () => void
  onAlertPatient?: () => void
  onCallSpecialist?: () => void
}

const MedicationResultsScreen: React.FC<MedicationResultsScreenProps> = ({
  analysis,
  onBack,
  onSavePrescription,
  onSMSPatient,
  onAlertPatient,
  onCallSpecialist
}) => {
  const { t } = useTranslation()
  const [isSaving, setIsSaving] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const getRiskConfig = (risk: string) => {
    switch (risk) {
      case 'low':
        return {
          bgGradient: 'from-green-50 to-purple-50',
          borderColor: 'border-primary/20',
          textColor: 'text-gray-900',
          buttonPrimary: 'bg-primary text-white',
          buttonSecondary: 'bg-primary/10 text-primary',
          icon: Shield,
          iconBg: 'bg-primary/10',
          iconColor: 'text-primary'
        }
      case 'moderate':
        return {
          bgGradient: 'from-orange-100 to-orange-50',
          borderColor: 'border-caution/30',
          textColor: 'text-caution-dark',
          buttonPrimary: 'bg-primary text-white',
          buttonSecondary: 'bg-primary/10 text-primary',
          icon: AlertTriangle,
          iconBg: 'bg-caution-light',
          iconColor: 'text-caution'
        }
      case 'high':
        return {
          bgGradient: 'from-risk-high-bg to-transparent',
          borderColor: 'border-risk-high/50',
          textColor: 'text-gray-900',
          buttonPrimary: 'bg-primary text-white shadow-lg shadow-primary/30',
          buttonSecondary: 'bg-risk-high/10 text-risk-high',
          icon: AlertTriangle,
          iconBg: 'bg-risk-high-bg',
          iconColor: 'text-risk-high'
        }
      case 'critical':
        return {
          bgGradient: 'from-danger-light to-transparent',
          borderColor: 'border-danger/50',
          textColor: 'text-danger',
          buttonPrimary: 'bg-primary text-white',
          buttonSecondary: 'bg-white text-danger border border-danger/50',
          icon: AlertTriangle,
          iconBg: 'bg-danger-light',
          iconColor: 'text-danger'
        }
      default:
        return {
          bgGradient: 'from-gray-50 to-white',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-900',
          buttonPrimary: 'bg-primary text-white',
          buttonSecondary: 'bg-gray-100 text-gray-700',
          icon: Pill,
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600'
        }
    }
  }

  const config = getRiskConfig(analysis.overallRisk)
  const RiskIcon = config.icon

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      onSavePrescription?.()
    }, 1500)
  }

  const handleSMS = async () => {
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      onSMSPatient?.()
    }, 1500)
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
              <p className="text-xs text-gray-400">Analysis Results</p>
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
              <span className="font-medium">Back to Analysis</span>
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
            Medication Analysis
          </h1>
        </motion.header>

        <main className="flex-1 overflow-y-auto p-6 pb-24 max-w-md mx-auto w-full">
          {/* Patient & Drug Info */}
          <motion.div
            className="rounded-xl bg-white p-5 shadow-card mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{analysis.drugName}</h2>
                <p className="text-sm text-gray-500">{analysis.category}</p>
              </div>
              <div className={`flex items-center justify-center h-12 w-12 rounded-full ${config.iconBg}`}>
                <Pill className={`${config.iconColor} text-3xl h-8 w-8`} />
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0 bg-center bg-no-repeat bg-cover rounded-full bg-gray-200"></div>
              <div>
                <p className="font-semibold text-gray-800">Patient: {analysis.patientName}</p>
                <p className="text-sm text-gray-500">ID: {analysis.patientId}</p>
              </div>
            </div>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            className={`rounded-xl bg-gradient-to-br ${config.bgGradient} p-5 shadow-lg mb-6 border ${config.borderColor}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <p className="text-sm font-medium text-gray-600 mb-2">AI Analysis Result</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{analysis.emoji}</span>
              <div>
                <h3 className={`text-2xl font-bold ${config.textColor}`}>
                  Risk Category: {analysis.riskCategory}
                </h3>
                <p className="text-sm text-gray-700">{analysis.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Dosage Info */}
          {analysis.overallRisk === 'low' && (
            <motion.div
              className="grid grid-cols-3 gap-4 mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white p-4 rounded-xl shadow-card">
                <p className="text-sm text-gray-500">Dosage</p>
                <p className="font-bold text-gray-900 text-lg">{analysis.dosage}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-card">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-bold text-gray-900 text-lg">7 Days</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-card">
                <p className="text-sm text-gray-500">Monitoring</p>
                <p className="font-bold text-gray-900 text-lg">Routine</p>
              </div>
            </motion.div>
          )}

          {/* Risk Details */}
          <div className="space-y-4">
            {analysis.details?.risks && (
              <motion.div
                className="bg-white rounded-xl p-4 shadow-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-start gap-3">
                  <RiskIcon className={`${config.iconColor} text-2xl mt-0.5 h-6 w-6`} />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {analysis.overallRisk === 'critical' ? 'Major Risks' : 
                       analysis.overallRisk === 'high' ? 'Specific Risks' :
                       analysis.overallRisk === 'moderate' ? 'Potential Risks' : 'Analysis Type'}
                    </h4>
                    {analysis.overallRisk === 'low' ? (
                      <p className="text-sm text-gray-600 mt-1">
                        Cross-referenced with patient's history and global maternal health databases.
                      </p>
                    ) : (
                      <ul className="mt-1 list-disc list-inside space-y-1 text-sm text-gray-600">
                        {analysis.details.risks.map((risk, index) => (
                          <li key={index}>{risk}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {analysis.details?.actions && (
              <motion.div
                className="bg-white rounded-xl p-4 shadow-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start gap-3">
                  <Bell className="text-primary text-2xl mt-0.5 h-6 w-6" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {analysis.overallRisk === 'critical' ? 'Action Required' :
                       analysis.overallRisk === 'high' ? 'Urgent Actions' : 'Recommended Actions'}
                    </h4>
                    {analysis.overallRisk === 'critical' ? (
                      <div>
                        <p className="mt-1 text-sm font-semibold text-danger">DO NOT PRESCRIBE OR ADMINISTER</p>
                        <p className="mt-1 text-sm text-gray-600">This medication is known to cause severe harm during pregnancy.</p>
                      </div>
                    ) : (
                      <ul className="mt-1 list-disc list-inside space-y-1 text-sm text-gray-600">
                        {analysis.details.actions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              className="bg-gray-100 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="font-semibold text-gray-800">Next Check</h4>
              <p className="text-sm text-gray-600 mt-1">{analysis.details?.monitoring}</p>
            </motion.div>
          </div>
        </main>

        {/* Fixed Bottom Actions */}
        <motion.footer
          className="fixed bottom-0 left-64 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              {analysis.overallRisk === 'low' ? (
                <>
                  <motion.button
                    className={`flex-1 flex items-center justify-center rounded-lg h-12 px-5 ${config.buttonSecondary} font-bold text-base transition-colors`}
                    onClick={handleSave}
                    disabled={isSaving}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    <span>{isSaving ? 'Saving...' : 'Save Prescription'}</span>
                  </motion.button>
                  <motion.button
                    className={`flex-1 flex items-center justify-center rounded-lg h-12 px-5 ${config.buttonPrimary} font-bold text-base transition-colors`}
                    onClick={handleSMS}
                    disabled={isSending}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>{isSending ? 'Sending...' : 'SMS to Patient'}</span>
                  </motion.button>
                </>
              ) : analysis.overallRisk === 'moderate' ? (
                <>
                  <motion.button
                    className={`flex-1 flex items-center justify-center rounded-lg h-12 px-4 ${config.buttonSecondary} font-bold text-base transition-colors`}
                    onClick={onAlertPatient}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Consult Specialist
                  </motion.button>
                  <motion.button
                    className={`flex-1 flex items-center justify-center rounded-lg h-12 px-4 ${config.buttonPrimary} font-bold text-base transition-colors`}
                    onClick={onSavePrescription}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Document Caution
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    className={`flex-1 flex items-center justify-center rounded-lg h-12 px-5 ${config.buttonSecondary} font-bold text-base transition-colors`}
                    onClick={onAlertPatient}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Alert Patient
                  </motion.button>
                  <motion.button
                    className={`flex-1 flex items-center justify-center rounded-lg h-12 px-5 ${config.buttonPrimary} font-bold text-base transition-colors`}
                    onClick={onCallSpecialist}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Specialist
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default MedicationResultsScreen