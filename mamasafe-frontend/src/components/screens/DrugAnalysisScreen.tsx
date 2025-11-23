import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, X, Search, Pill, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useDrugAnalysis } from '../../hooks/useDrugAnalysis'

interface Drug {
  id: string
  name: string
}

interface DrugAnalysisScreenProps {
  onBack: () => void
  onAnalyze: (patientId: string, drugs: Drug[]) => void
}

const DrugAnalysisScreen: React.FC<DrugAnalysisScreenProps> = ({ onBack, onAnalyze }) => {
  const { t } = useTranslation()
  const { drugs, addDrug, removeDrug, analyzeInteractions, isAnalyzing, error } = useDrugAnalysis()
  const [patientId, setPatientId] = useState('')
  const [currentDrug, setCurrentDrug] = useState('')

  const handleAddDrug = () => {
    if (currentDrug.trim()) {
      addDrug({ id: Date.now().toString(), name: currentDrug.trim(), dosage: '' })
      setCurrentDrug('')
    }
  }

  const handleAnalyze = async () => {
    if (patientId.trim() && drugs.length >= 1) {
      try {
        await analyzeInteractions(patientId.trim())
        // Call the original onAnalyze for navigation
        onAnalyze(patientId.trim(), drugs)
      } catch (err) {
        console.error('Analysis failed:', err)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddDrug()
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
              <p className="text-xs text-gray-400">Drug Analysis</p>
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
            Drug Interaction Analysis
          </h1>
        </motion.header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Drug Input Section */}
          <motion.section
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient & Medications</h2>
            
            {/* Patient ID Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all"
                  placeholder="Enter patient ID..."
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
              </div>
            </div>
            
            <label className="block text-sm font-medium text-gray-700 mb-2">Medications</label>
            
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all"
                  placeholder="Enter medication name..."
                  value={currentDrug}
                  onChange={(e) => setCurrentDrug(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <motion.button
                className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                onClick={handleAddDrug}
                disabled={!currentDrug.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Drug List */}
            <div className="space-y-2">
              <AnimatePresence>
                {drugs.map((drug, index) => (
                  <motion.div
                    key={drug.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <Pill className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{drug.name}</span>
                    </div>
                    <motion.button
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => removeDrug(drug.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {drugs.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <Pill className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No medications added yet</p>
                <p className="text-xs">Add at least 1 medication to analyze safety</p>
              </div>
            )}
          </motion.section>

          {/* Analysis Section */}
          <motion.section
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Interaction Analysis</h2>
              <span className="text-sm text-gray-500">{drugs.length} medications added</span>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700">
                <p className="font-medium">Error:</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {!patientId.trim() || drugs.length < 1 ? (
              <div className="text-center py-6 text-gray-500">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">
                  {!patientId.trim() ? 'Enter patient ID and add at least 1 medication' : 'Add at least 1 medication to start analysis'}
                </p>
              </div>
            ) : (
              <motion.button
                className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !patientId.trim() || drugs.length < 1}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-center gap-2">
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Clock className="h-4 w-4" />
                      </motion.div>
                      <span>Analyzing Interactions...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Analyze Drug Safety</span>
                    </>
                  )}
                </div>
              </motion.button>
            )}
          </motion.section>

          {/* Recent Analysis History */}
          <motion.section
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Analysis</h2>
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No recent analysis found</p>
              <p className="text-sm">Your analysis history will appear here</p>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  )
}

export default DrugAnalysisScreen