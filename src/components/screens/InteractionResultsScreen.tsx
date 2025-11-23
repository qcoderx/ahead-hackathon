import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, AlertTriangle, Save, Bell } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { InteractionAnalysis } from '../../types/interactions'
import DrugCard from '../ui/DrugCard'
import InteractionAlert from '../ui/InteractionAlert'

interface InteractionResultsScreenProps {
  analysis: InteractionAnalysis
  onBack: () => void
  onAddDrug?: () => void
  onAlertProvider?: (analysis: InteractionAnalysis) => void
  onSaveToRecords?: (analysis: InteractionAnalysis) => void
}

const InteractionResultsScreen: React.FC<InteractionResultsScreenProps> = ({
  analysis,
  onBack,
  onAddDrug,
  onAlertProvider,
  onSaveToRecords
}) => {
  const { t } = useTranslation()
  const [isAlertingProvider, setIsAlertingProvider] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleAlertProvider = async () => {
    setIsAlertingProvider(true)
    setTimeout(() => {
      setIsAlertingProvider(false)
      onAlertProvider?.(analysis)
    }, 1500)
  }

  const handleSaveToRecords = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      onSaveToRecords?.(analysis)
    }, 1500)
  }

  const getOverallRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'moderate': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
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
        {/* Sidebar Header */}
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

        {/* Navigation */}
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
            Interaction Analysis
          </h1>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${getOverallRiskColor(analysis.overallRisk)}`}>
              {analysis.overallRisk.toUpperCase()} RISK
            </span>
          </div>
        </motion.header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
          {/* Drug Combination Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Drug Combination</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-3">
              {analysis.drugs.map((drug, index) => (
                <React.Fragment key={drug.id}>
                  <DrugCard drug={drug} delay={index * 0.1} />
                  {index < analysis.drugs.length - 1 && (
                    <hr className="border-gray-200" />
                  )}
                </React.Fragment>
              ))}
              
              {onAddDrug && (
                <motion.button
                  className="w-full flex items-center justify-center p-3 border-2 border-dashed border-primary/50 rounded-lg text-primary font-semibold hover:bg-primary/5 transition-colors"
                  onClick={onAddDrug}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add another drug
                </motion.button>
              )}
            </div>
          </motion.section>

          {/* Interactions Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-4">
              {analysis.interactions.map((interaction, index) => (
                <InteractionAlert
                  key={interaction.id}
                  interaction={interaction}
                  delay={0.3 + index * 0.1}
                />
              ))}
            </div>
          </motion.section>

          {/* Patient Context */}
          <motion.section
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-semibold text-gray-900 mb-2">Analysis Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Patient ID:</span>
                <span className="ml-2 font-medium">{analysis.patientId}</span>
              </div>
              <div>
                <span className="text-gray-500">Analysis Date:</span>
                <span className="ml-2 font-medium">
                  {new Date(analysis.analysisDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.section>
        </main>

        {/* Fixed Bottom Actions */}
        <motion.footer
          className="fixed bottom-0 left-64 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex gap-4">
            <motion.button
              className="flex-1 flex items-center justify-center rounded-lg h-12 px-5 bg-primary/20 text-primary font-semibold text-base hover:bg-primary/30 transition-colors disabled:opacity-50"
              onClick={handleAlertProvider}
              disabled={isAlertingProvider}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-2">
                {isAlertingProvider ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Bell className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Bell className="h-4 w-4" />
                )}
                <span>{isAlertingProvider ? 'Alerting...' : 'Alert Provider'}</span>
              </div>
            </motion.button>
            
            <motion.button
              className="flex-1 flex items-center justify-center rounded-lg h-12 px-5 bg-primary text-white font-semibold text-base shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              onClick={handleSaveToRecords}
              disabled={isSaving}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-2">
                {isSaving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Save className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save to Records'}</span>
              </div>
            </motion.button>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default InteractionResultsScreen