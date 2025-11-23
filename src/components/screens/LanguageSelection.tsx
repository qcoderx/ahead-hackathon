import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'

interface Language {
  id: string
  name: string
  nativeName?: string
}

interface LanguageSelectionProps {
  onLanguageSelect: (language: Language) => void
  onClose: () => void
  selectedLanguage?: string
}

const languages: Language[] = [
  { id: 'en', name: 'English', nativeName: 'English' },
  { id: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { id: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { id: 'ig', name: 'Igbo', nativeName: 'Igbo' }
]

const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  onLanguageSelect,
  onClose,
  selectedLanguage = 'en'
}) => {
  const [currentSelection, setCurrentSelection] = useState(selectedLanguage)
  const { t, setLanguage } = useTranslation()

  const handleContinue = () => {
    const selected = languages.find(lang => lang.id === currentSelection)
    if (selected) {
      setLanguage(selected)
      onLanguageSelect(selected)
    }
  }

  return (
    <motion.div
      className="relative flex min-h-screen w-full flex-col bg-white dark:bg-background-dark"
      style={{ backgroundColor: '#ffffff' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center bg-white dark:bg-background-dark p-4 pb-2 justify-between" style={{ backgroundColor: '#ffffff' }}>
          <div className="flex size-12 shrink-0 items-center justify-start">
            <img src="/images/logo.png" alt="MamaSafe" className="h-10 w-10 object-contain" />
          </div>
          
          <h1 className="text-[#111816] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            {t('language.select')}
          </h1>
          
          <div className="flex w-12 items-center justify-end">
            <motion.button
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-primary dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>
        </div>

        {/* Language Options */}
        <div className="flex flex-col gap-3 p-4 flex-grow">
          {languages.map((language, index) => (
            <motion.label
              key={language.id}
              className={`flex items-center gap-4 rounded-xl border border-solid p-4 cursor-pointer transition-all duration-200 ${
                currentSelection === language.id
                  ? 'border-primary bg-primary/10 dark:bg-primary/20'
                  : 'border-[#dbe6e2] dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex grow flex-col">
                <p className="text-[#111816] text-base font-medium leading-normal">
                  {language.name}
                </p>
              </div>
              
              <input
                className="h-5 w-5 appearance-none rounded-full border-2 border-[#dbe6e2] dark:border-gray-600 bg-transparent checked:border-primary checked:bg-primary checked:bg-[url('data:image/svg+xml,%3csvg_viewBox=%270_0_16_16%27_fill=%27white%27_xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle_cx=%278%27_cy=%278%27_r=%273%27/%3e%3c/svg%3e')] checked:bg-center checked:bg-no-repeat focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                type="radio"
                name="language_selection"
                value={language.id}
                checked={currentSelection === language.id}
                onChange={(e) => setCurrentSelection(e.target.value)}
              />
            </motion.label>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex p-4 pt-0">
          <motion.button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 flex-1 bg-primary text-white dark:text-background-dark text-base font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-primary/90"
            onClick={handleContinue}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="truncate">{t('language.continue')}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default LanguageSelection