import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Phone, CreditCard, Lock } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useAuth } from '../../hooks/useAuth'

interface PatientPortalScreenProps {
  onBack: () => void
  onAccessRecords: (patientId: string, phone: string) => void
}

const PatientPortalScreen: React.FC<PatientPortalScreenProps> = ({ onBack, onAccessRecords }) => {
  const { t, currentLanguage, setLanguage } = useTranslation()
  const { loginPatient, loading, error } = useAuth()
  const [patientId, setPatientId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage.id)
  const [isLoading, setIsLoading] = useState(false)

  const languages = [
    { id: 'en', name: 'English' },
    { id: 'ha', name: 'Hausa' },
    { id: 'yo', name: 'Yoruba' },
    { id: 'ig', name: 'Igbo' }
  ]

  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(langId)
    const selected = languages.find(lang => lang.id === langId)
    if (selected) setLanguage(selected)
  }

  const handleAccessRecords = async () => {
    if (!patientId.trim() || !phoneNumber.trim()) return
    
    try {
      setIsLoading(true)
      await loginPatient(patientId.trim())
      onAccessRecords(patientId.trim(), phoneNumber.trim())
    } catch (err) {
      console.error('Patient login failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const canAccess = patientId.trim() && phoneNumber.trim()

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden" style={{ backgroundColor: '#f6f8f7' }}>
      {/* Header */}
      <motion.header
        className="flex items-center bg-white/80 backdrop-blur-sm p-4 pb-2 justify-between sticky top-0 z-10 border-b border-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            className="flex size-8 shrink-0 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            onClick={onBack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </motion.button>
          <img src="/images/logo.png" alt="MamaSafe" className="h-8 w-8 object-contain" />
        </div>
        
        <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          MamaSafe
        </h2>
      </motion.header>

      <main className="flex-grow px-4 pb-20">
        {/* Title */}
        <motion.h1
          className="text-gray-900 tracking-tight text-[32px] font-bold leading-tight text-left pt-6 pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t('patient.portalAccess')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-700 text-base font-normal leading-normal pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t('patient.enterDetails')}
        </motion.p>

        {/* Language Selector */}
        <motion.div
          className="flex pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-gray-100 p-1 border border-gray-200">
            {languages.map((lang) => (
              <motion.label
                key={lang.id}
                className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-all duration-200 ${
                  selectedLanguage === lang.id
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="truncate">{lang.name}</span>
                <input
                  className="invisible w-0"
                  name="language-selection"
                  type="radio"
                  value={lang.id}
                  checked={selectedLanguage === lang.id}
                  onChange={() => handleLanguageChange(lang.id)}
                />
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Patient ID Field */}
        <motion.div
          className="flex w-full flex-wrap items-end gap-4 py-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-gray-900 text-base font-medium leading-normal pb-2">
              {t('patient.patientId')}
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-xl">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-900 bg-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 focus:border-primary h-14 placeholder:text-gray-400 p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal transition-all"
                placeholder={t('patient.enterPatientId')}
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
              <div className="text-primary flex border border-gray-200 bg-white items-center justify-center pr-4 rounded-r-xl border-l-0">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
          </label>
        </motion.div>

        {/* Phone Number Field */}
        <motion.div
          className="flex w-full flex-wrap items-end gap-4 py-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-gray-900 text-base font-medium leading-normal pb-2">
              {t('patient.phoneNumber')}
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-xl">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-900 bg-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 focus:border-primary h-14 placeholder:text-gray-400 p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal transition-all"
                placeholder={t('patient.enterPhone')}
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="text-primary flex border border-gray-200 bg-white items-center justify-center pr-4 rounded-r-xl border-l-0">
                <Phone className="h-5 w-5" />
              </div>
            </div>
          </label>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        className="p-4 pt-2 bg-white/90 backdrop-blur-sm border-t border-gray-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {/* Security Message */}
        <div className="flex items-center justify-center gap-2 pb-4 text-sm text-gray-500">
          <Lock className="h-4 w-4" />
          <p>{t('patient.secureInfo')}</p>
        </div>

        {/* Access Button */}
        <motion.button
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAccessRecords}
          disabled={!canAccess || isLoading}
          whileHover={{ scale: canAccess ? 1.02 : 1 }}
          whileTap={{ scale: canAccess ? 0.98 : 1 }}
        >
          {isLoading ? 'Accessing...' : t('patient.accessRecords')}
        </motion.button>

        {/* Support Link */}
        <motion.div
          className="pt-6 pb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a className="text-sm font-medium text-primary hover:underline transition-colors" href="#">
            {t('patient.needHelp')}
          </a>
        </motion.div>
      </motion.footer>
    </div>
  )
}

export default PatientPortalScreen