import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertTriangle, Pill, Heart, Globe, Plus } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useMedicationCheck } from '../../hooks/useMedicationCheck'

interface Patient {
  id: string
  name: string
  avatar: string
  age: number
  gestationalWeek: number
  lastVisit: string
  riskScore: number
  riskLevel: 'Low' | 'Medium' | 'High'
}

interface SingleDrugCheckScreenProps {
  patient?: Patient
  onBack: () => void
  onAnalyze: (drugName: string, symptoms?: string) => void
  onViewHistory: () => void
}

const SingleDrugCheckScreen: React.FC<SingleDrugCheckScreenProps> = ({
  patient = {
    id: 'MS-837492',
    name: 'Jessica Alba',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlxqKL03tQJ2_Mg35vpzD3O0oMwrbsnjw8-ZbDk0PrVuOUSWy-1x5x3Hx7u2iMWRnpnTrIq6rKPX2CHxh6ksMTuNA9DwV6yeYmLqsDm-N6oZ8la2D6oQb6WU3Yni1FGxMshJdO0aSaEx8Q0B7jNgK9DdUbLtaQYIz4hitwjuBVAdtjiRgwXw5XxGRjgP7GfbKHUyURvkd2j2vQiRFeVlg401TjlP26icgpQrEf9l7hCSdx9pOpR3krL5tY99yDAJtouGpKBYH54haS',
    age: 32,
    gestationalWeek: 28,
    lastVisit: '03/15/24',
    riskScore: 7.8,
    riskLevel: 'High'
  },
  onBack,
  onAnalyze,
  onViewHistory
}) => {
  const { t, currentLanguage, setLanguage } = useTranslation()
  const { checkDrugSafety, loading, error, result } = useMedicationCheck()
  const [drugName, setDrugName] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [reportLanguage, setReportLanguage] = useState('en')
  const [additionalDrugs, setAdditionalDrugs] = useState<string[]>([])
  const [newDrug, setNewDrug] = useState('')

  const languages = [
    { id: 'en', name: 'English (Default)' },
    { id: 'ha', name: 'Hausa' },
    { id: 'yo', name: 'Yoruba' },
    { id: 'ig', name: 'Igbo' }
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600 bg-red-100'
      case 'Medium': return 'text-orange-600 bg-orange-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleAnalyze = async () => {
    if (!drugName.trim()) return
    
    try {
      const symptomsArray = symptoms.trim() ? symptoms.split(',').map(s => s.trim()) : []
      
      await checkDrugSafety({
        drug_name: drugName.trim(),
        additional_drugs: additionalDrugs,
        patient_id: patient.id,
        manual_gestational_week: patient.gestationalWeek,
        symptoms: symptomsArray,
        language: reportLanguage
      })
      
      // Call the original onAnalyze for navigation
      onAnalyze(drugName.trim(), symptoms.trim() || undefined)
    } catch (err) {
      console.error('Drug analysis failed:', err)
    }
  }
  
  const handleAddDrug = () => {
    if (newDrug.trim() && !additionalDrugs.includes(newDrug.trim())) {
      setAdditionalDrugs(prev => [...prev, newDrug.trim()])
      setNewDrug('')
    }
  }
  
  const handleRemoveDrug = (drugToRemove: string) => {
    setAdditionalDrugs(prev => prev.filter(drug => drug !== drugToRemove))
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
              <p className="text-xs text-gray-400">Drug Safety</p>
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
            Drug Safety Check
          </h1>
        </motion.header>

        <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {/* Patient Info Card */}
        <motion.section
          className="bg-white rounded-xl shadow-md border border-gray-200/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4 p-4 border-b border-gray-200">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-16 shrink-0 ring-2 ring-white shadow-md"
              style={{ backgroundImage: `url("${patient.avatar}")` }}
            />
            <div className="flex-1">
              <p className="font-bold text-lg text-gray-900">{patient.name}</p>
              <p className="text-sm text-gray-600">ID: {patient.id}</p>
            </div>
            <motion.div
              className={`flex items-center justify-center size-10 rounded-full ${
                patient.riskLevel === 'High' ? 'bg-red-100' : 
                patient.riskLevel === 'Medium' ? 'bg-orange-100' : 'bg-green-100'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <AlertTriangle className={`h-5 w-5 ${
                patient.riskLevel === 'High' ? 'text-red-600' : 
                patient.riskLevel === 'Medium' ? 'text-orange-600' : 'text-green-600'
              }`} />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-3 gap-y-4 p-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">Age</p>
              <p className="font-semibold text-gray-900">{patient.age}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Gest. Week</p>
              <p className="font-semibold text-gray-900">{patient.gestationalWeek}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Last Visit</p>
              <p className="font-semibold text-gray-900">{patient.lastVisit}</p>
            </div>
            <div className="col-span-3 text-center pt-2">
              <p className="text-xs text-gray-500">Risk Score</p>
              <p className={`font-bold text-lg ${getRiskColor(patient.riskLevel).split(' ')[0]}`}>
                {patient.riskLevel} ({patient.riskScore})
              </p>
            </div>
          </div>
        </motion.section>

        {/* Medication Details */}
        <motion.section
          className="bg-white p-4 rounded-xl shadow-md border border-gray-200/50 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-gray-900">Medication Details</h2>
          
          {/* Primary Drug Input */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Primary Drug
            </label>
            <div className="relative">
              <Pill className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                className="w-full h-12 rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 text-gray-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Scan or enter medication name..."
                type="text"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
              />
            </div>
          </div>

          {/* Additional Drugs */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Additional Drugs
            </label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-gray-900 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Enter additional drug..."
                value={newDrug}
                onChange={(e) => setNewDrug(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddDrug()}
              />
              <motion.button
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                onClick={handleAddDrug}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="h-5 w-5" />
              </motion.button>
            </div>
            
            {/* Additional Drugs List */}
            {additionalDrugs.length > 0 && (
              <div className="space-y-2">
                {additionalDrugs.map((drug, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                    <span className="text-sm text-gray-700">{drug}</span>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => handleRemoveDrug(drug)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Symptoms Input */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Reported Symptoms (optional)
            </label>
            <div className="relative">
              <Heart className="absolute left-3 top-4 h-5 w-5 text-gray-500" />
              <textarea
                className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all"
                placeholder="e.g., Nausea, headache..."
                rows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>
          </div>

          {/* Report Language */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Report Language
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <select
                className="w-full h-12 rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-10 text-gray-900 focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none transition-all"
                value={reportLanguage}
                onChange={(e) => setReportLanguage(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.section>
        
        {/* Error Display */}
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-medium">Error:</p>
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
        </main>

        {/* Footer */}
        <motion.footer
          className="bg-white border-t border-gray-100 p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              className="w-full flex items-center justify-center rounded-lg h-12 px-5 bg-white text-primary font-bold text-base shadow-md border border-primary/50 hover:bg-gray-50 transition-colors"
              onClick={onViewHistory}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View History
            </motion.button>
            <motion.button
              className="w-full flex items-center justify-center rounded-lg h-12 px-5 bg-primary text-white font-bold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors disabled:opacity-50"
              onClick={handleAnalyze}
              disabled={!drugName.trim() || loading}
              whileHover={{ scale: drugName.trim() && !loading ? 1.02 : 1 }}
              whileTap={{ scale: drugName.trim() && !loading ? 0.98 : 1 }}
            >
              {loading ? 'Analyzing...' : 'Analyze Safety'}
            </motion.button>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default SingleDrugCheckScreen