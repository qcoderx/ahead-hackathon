import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Pill, Zap, CheckCircle, AlertTriangle } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'

interface QuickMedicationCheckProps {
  onCheck?: (patientId: string, medication: string) => void
}

const QuickMedicationCheck: React.FC<QuickMedicationCheckProps> = ({ onCheck }) => {
  const { t } = useTranslation()
  const [patientId, setPatientId] = useState('')
  const [medication, setMedication] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<'safe' | 'warning' | null>(null)

  const handleCheck = async () => {
    if (!patientId.trim() || !medication.trim()) return
    
    setIsLoading(true)
    setResult(null)
    
    setTimeout(() => {
      setIsLoading(false)
      // Mock result
      setResult(Math.random() > 0.5 ? 'safe' : 'warning')
      onCheck?.(patientId.trim(), medication.trim())
    }, 2000)
  }

  const canCheck = patientId.trim() && medication.trim()

  return (
    <motion.section
      className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue/5 opacity-50" />
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Header */}
      <div className="relative z-10 mb-8">
        <motion.div 
          className="flex items-center gap-3 mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="p-2 bg-primary rounded-lg shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="h-4 w-4 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
              {t('dashboard.quickMedCheck')}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Instant medication safety verification
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Form */}
      <div className="relative z-10 space-y-6">
        {/* Patient Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Patient Selection
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all duration-200 text-base font-medium relative z-20"
              placeholder={t('dashboard.selectPatient')}
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-focus-within:opacity-20 transition-opacity pointer-events-none"
              animate={{ 
                boxShadow: patientId ? '0 0 0 4px rgba(16, 183, 127, 0.1)' : 'none'
              }}
            />
          </div>
        </motion.div>
        
        {/* Medication Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Medication Details
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Pill className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all duration-200 text-base font-medium relative z-20"
              placeholder={t('dashboard.scanMedication')}
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-focus-within:opacity-20 transition-opacity pointer-events-none"
              animate={{ 
                boxShadow: medication ? '0 0 0 4px rgba(16, 183, 127, 0.1)' : 'none'
              }}
            />
          </div>
        </motion.div>
        
        {/* Check Button */}
        <motion.button
          className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCheck}
          disabled={!canCheck || isLoading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ 
            scale: canCheck ? 1.01 : 1
          }}
          whileTap={{ scale: canCheck ? 0.99 : 1 }}
        >
          {/* Button Background Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            animate={{
              x: isLoading ? [-100, 300] : -100
            }}
            transition={{
              duration: 1.5,
              repeat: isLoading ? Infinity : 0,
              ease: 'linear'
            }}
          />
          
          <div className="relative z-10 flex items-center justify-center gap-3">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: 360 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ rotate: { duration: 1, repeat: Infinity, ease: 'linear' } }}
                >
                  <Zap className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <CheckCircle className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <span className="text-sm">
              {isLoading ? 'Analyzing...' : t('dashboard.checkCompatibility')}
            </span>
          </div>
        </motion.button>
        
        {/* Result Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              className={`p-6 rounded-xl border-2 ${
                result === 'safe' 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-orange-50 border-orange-200 text-orange-800'
              }`}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="flex items-center gap-3">
                {result === 'safe' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                )}
                <div>
                  <h4 className="font-bold text-lg">
                    {result === 'safe' ? 'SAFE' : 'CAUTION REQUIRED'}
                  </h4>
                  <p className="text-sm mt-1">
                    {result === 'safe' 
                      ? 'This medication is safe for the patient'
                      : 'This medication requires careful monitoring'
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default QuickMedicationCheck