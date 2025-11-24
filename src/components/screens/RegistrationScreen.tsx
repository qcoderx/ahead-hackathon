import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, Upload, Lock, Globe, ChevronDown } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../contexts/ToastContext'

interface RegistrationScreenProps {
  onComplete: () => void
  onBack: () => void
}

interface FormData {
  fullName: string
  email: string
  password: string
  specialty: string
  licenseNumber: string
  hospital: string
  document: File | null
  agreeTerms: boolean
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onComplete, onBack }) => {
  const { t, currentLanguage, setLanguage } = useTranslation()
  const { registerUser, loading, error } = useAuth()
  const { showSuccess, showError } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    specialty: 'obstetrician',
    licenseNumber: '',
    hospital: '',
    document: null,
    agreeTerms: false
  })

  const languages = [
    { id: 'en', name: 'English' },
    { id: 'ha', name: 'Hausa' },
    { id: 'yo', name: 'Yoruba' },
    { id: 'ig', name: 'Igbo' }
  ]

  const specialties = [
    { value: 'obstetrician', key: 'register.obstetrician' },
    { value: 'midwife', key: 'register.midwife' },
    { value: 'anesthesiologist', key: 'register.anesthesiologist' },
    { value: 'pediatrician', key: 'register.pediatrician' }
  ]

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      await registerUser({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        role: 'provider',
        is_active: true,
        is_superuser: false
      })
      showSuccess('Account created successfully! Welcome to MamaSafe.')
      setTimeout(() => onComplete(), 1500)
    } catch (err) {
      console.error('Registration failed:', err)
      showError('Registration failed. Please check your details and try again.')
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.password
      case 2:
        return formData.specialty && formData.licenseNumber && formData.hospital
      case 3:
        return formData.agreeTerms
      default:
        return false
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return t('register.personalInfo')
      case 2: return t('register.professionalDetails')
      case 3: return t('register.verification')
      default: return ''
    }
  }

  const getButtonText = () => {
    if (loading) return 'Creating Account...'
    switch (currentStep) {
      case 1: return t('register.nextStep')
      case 2: return t('register.nextVerification')
      case 3: return t('register.createAccount')
      default: return 'Next'
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col" style={{ backgroundColor: '#F9FAFB' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-white p-4 pb-2 justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <motion.button 
            className="flex size-8 shrink-0 items-center justify-center"
            onClick={currentStep === 1 ? onBack : () => setCurrentStep(prev => prev - 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </motion.button>
          <img src="/images/logo.png" alt="MamaSafe" className="h-8 w-8 object-contain" />
        </div>
        
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center text-gray-900">
          {t('register.title')}
        </h1>
        
        {/* Language Selector */}
        <div className="flex size-12 shrink-0 items-center justify-end">
          <div className="relative">
            <select 
              className="form-select w-full min-w-0 cursor-pointer appearance-none rounded-lg border-none bg-transparent py-1 pl-2 pr-6 text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              value={currentLanguage.id}
              onChange={(e) => {
                const selected = languages.find(lang => lang.id === e.target.value)
                if (selected) setLanguage(selected)
              }}
            >
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
              <Globe className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="flex flex-col gap-2 p-4 pt-6 bg-white">
        <p className="text-sm font-medium leading-normal text-gray-700">
          {t('register.step')} {currentStep} {t('register.of')} 3: {getStepTitle()}
        </p>
        <div className="w-full rounded-full bg-gray-200">
          <motion.div 
            className="h-2 rounded-full bg-primary"
            initial={{ width: '33%' }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-2">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6 rounded-xl bg-white shadow-sm p-5"
            >
              <h2 className="text-xl font-bold leading-tight pb-4 text-gray-900">
                {t('register.accountInfo')}
              </h2>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col w-full">
                  <p className="text-sm font-medium leading-normal pb-2 text-gray-700">
                    {t('register.fullName')}
                  </p>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 bg-gray-50 border-gray-300 focus:border-primary focus:ring-primary h-14 placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all"
                    placeholder={t('register.enterFullName')}
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                  />
                </label>

                <label className="flex flex-col w-full">
                  <p className="text-sm font-medium leading-normal pb-2 text-gray-700">
                    {t('register.emailAddress')}
                  </p>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 bg-gray-50 border-gray-300 focus:border-primary focus:ring-primary h-14 placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all"
                    placeholder={t('register.enterEmail')}
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                </label>

                <label className="flex flex-col w-full">
                  <p className="text-sm font-medium leading-normal pb-2 text-gray-700">
                    {t('register.createPassword')}
                  </p>
                  <div className="relative flex items-center">
                    <input 
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 bg-gray-50 border-gray-300 focus:border-primary focus:ring-primary h-14 placeholder:text-gray-400 p-4 pr-12 text-base font-normal leading-normal transition-all"
                      placeholder={t('register.enterPassword')}
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                    />
                    <motion.button 
                      className="absolute right-4 text-gray-500 hover:text-primary transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </motion.button>
                  </div>
                </label>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6 rounded-xl bg-white shadow-sm p-5"
            >
              <h2 className="text-xl font-bold leading-tight pb-4 text-gray-900">
                {t('register.professionalDetails')}
              </h2>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col w-full">
                  <p className="text-sm font-medium leading-normal pb-2 text-gray-700">
                    {t('register.medicalSpecialty')}
                  </p>
                  <div className="relative">
                    <select 
                      className="form-select appearance-none w-full rounded-lg text-gray-900 bg-gray-50 border-gray-300 focus:border-primary focus:ring-primary h-14 p-4 text-base font-normal transition-all"
                      value={formData.specialty}
                      onChange={(e) => updateFormData('specialty', e.target.value)}
                    >
                      {specialties.map(specialty => (
                        <option key={specialty.value} value={specialty.value}>
                          {t(specialty.key)}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </label>

                <label className="flex flex-col w-full">
                  <p className="text-sm font-medium leading-normal pb-2 text-gray-700">
                    {t('register.licenseNumber')}
                  </p>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 bg-gray-50 border-gray-300 focus:border-primary focus:ring-primary h-14 placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all"
                    placeholder={t('register.enterLicense')}
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => updateFormData('licenseNumber', e.target.value)}
                  />
                </label>

                <label className="flex flex-col w-full">
                  <p className="text-sm font-medium leading-normal pb-2 text-gray-700">
                    {t('register.hospitalAffiliation')}
                  </p>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 bg-gray-50 border-gray-300 focus:border-primary focus:ring-primary h-14 placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all"
                    placeholder={t('register.enterHospital')}
                    type="text"
                    value={formData.hospital}
                    onChange={(e) => updateFormData('hospital', e.target.value)}
                  />
                </label>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="rounded-xl bg-white shadow-sm p-5">
                <h2 className="text-xl font-bold leading-tight pb-4 text-gray-900">
                  {t('register.verification')}
                </h2>
                <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-10 w-10 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-center text-gray-500">
                      <span className="font-semibold">{t('register.clickUpload')}</span> {t('register.dragDrop')}
                    </p>
                    <p className="text-xs text-center text-gray-500">
                      {t('register.fileTypes')}
                    </p>
                  </div>
                  <input className="hidden" type="file" accept=".pdf,.png,.jpg,.jpeg" />
                </div>
                <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {t('register.secureInfo')}
                </p>
              </div>

              <div className="flex items-start space-x-3 py-4">
                <input 
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary mt-0.5 form-checkbox"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateFormData('agreeTerms', e.target.checked)}
                />
                <div className="text-sm">
                  <label className="font-medium text-gray-700">
                    {t('register.agreeTerms')} <a className="font-semibold text-primary hover:underline" href="#">{t('register.termsService')}</a> {t('register.and')} <a className="font-semibold text-primary hover:underline" href="#">{t('register.privacyPolicy')}</a>.
                  </label>
                </div>
              </div>
              
              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700">
                  <p className="font-medium">Registration Error:</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 z-10 bg-white p-4 pt-2 border-t border-gray-200">
        <div className="flex flex-col items-center gap-4">
          <motion.button 
            className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-base font-bold text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50"
            onClick={handleNext}
            disabled={!canProceed() || loading}
            whileHover={{ scale: canProceed() && !loading ? 1.02 : 1 }}
            whileTap={{ scale: canProceed() && !loading ? 0.98 : 1 }}
          >
            {getButtonText()}
          </motion.button>
          <a className="text-sm font-medium text-primary hover:underline" href="#" onClick={onBack}>
            {t('register.alreadyAccount')} {t('register.signIn')}
          </a>
        </div>
      </footer>
    </div>
  )
}

export default RegistrationScreen