import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, WifiOff, Phone, Menu, MessageSquare, HelpCircle, Copy, Check } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'

interface OfflineAccessScreenProps {
  onBack: () => void
}

interface InstructionStepProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

interface CopyableCodeProps {
  code: string
  label?: string
}

const InstructionStep: React.FC<InstructionStepProps> = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    className="flex items-start gap-4 rounded-xl bg-white shadow-sm p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
  >
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </motion.div>
)

const CopyableCode: React.FC<CopyableCodeProps> = ({ code, label }) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.div
      className="flex items-center justify-between rounded-lg bg-white shadow-sm p-4 border border-gray-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <span className="font-mono text-base font-medium text-gray-700 select-all">
        {code}
      </span>
      <motion.button
        className="flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/30"
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={copied}
      >
        <motion.div
          initial={false}
          animate={{ rotate: copied ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </motion.div>
        {copied ? 'Copied!' : (label || t('offline.copy'))}
      </motion.button>
    </motion.div>
  )
}

const OfflineAccessScreen: React.FC<OfflineAccessScreenProps> = ({ onBack }) => {
  const { t } = useTranslation()

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden text-gray-900" style={{ backgroundColor: '#f6f8f7' }}>
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
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          {t('offline.title')}
        </h2>
      </motion.header>

      <main className="flex-grow px-4 pb-20">
        {/* Hero Section */}
        <motion.div
          className="flex w-full justify-center pt-8 pb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <WifiOff className="h-12 w-12 text-primary" />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="tracking-light text-[28px] font-bold leading-tight text-center pb-3 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t('offline.headline')}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-base font-normal leading-normal pb-8 pt-1 text-center text-gray-600 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t('offline.subtitle')}
        </motion.p>

        {/* USSD Instructions */}
        <motion.div
          className="flex flex-col gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] pt-4 text-gray-900">
            {t('offline.ussdTitle')}
          </h3>
          
          <div className="flex flex-col gap-3">
            <InstructionStep
              icon={<Phone className="h-5 w-5 text-primary" />}
              title={t('offline.step1Dial')}
              description={t('offline.step1DialDesc')}
              delay={0.6}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <CopyableCode code="*123*45#" />
            </motion.div>
            
            <InstructionStep
              icon={<Menu className="h-5 w-5 text-primary" />}
              title={t('offline.step2Menu')}
              description={t('offline.step2MenuDesc')}
              delay={0.8}
            />
          </div>
        </motion.div>

        {/* SMS Instructions */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] pt-4 text-gray-900">
            {t('offline.smsTitle')}
          </h3>
          
          <div className="flex flex-col gap-3">
            <InstructionStep
              icon={<MessageSquare className="h-5 w-5 text-primary" />}
              title={t('offline.step1SMS')}
              description={t('offline.step1SMSDesc')}
              delay={1.0}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <CopyableCode code="54321" />
            </motion.div>
            
            <InstructionStep
              icon={<HelpCircle className="h-5 w-5 text-primary" />}
              title={t('offline.step2Keywords')}
              description={t('offline.step2KeywordsDesc')}
              delay={1.2}
            />
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-xs text-gray-500 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {t('offline.carrierRates')}
        </motion.p>
      </main>

      {/* Bottom CTA */}
      <motion.div
        className="sticky bottom-0 bg-white/90 backdrop-blur-sm p-4 pt-2 border-t border-gray-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.4 }}
      >
        <motion.button
          className="w-full rounded-xl bg-primary py-4 text-center font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={onBack}
          whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(16, 183, 127, 0.3)' }}
          whileTap={{ scale: 0.98 }}
        >
          {t('offline.gotIt')}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default OfflineAccessScreen