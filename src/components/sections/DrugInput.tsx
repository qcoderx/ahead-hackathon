import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Drug } from '@/types'
import { cn } from '@/utils/cn'

interface DrugInputProps {
  drugs: Drug[]
  onAddDrug: (drug: Drug) => void
  onRemoveDrug: (drugId: string) => void
  onAnalyze: () => void
  isAnalyzing?: boolean
}

/**
 * Drug input section with dynamic drug list and analysis trigger
 * Features smooth animations for adding/removing drugs
 */
const DrugInput: React.FC<DrugInputProps> = ({
  drugs,
  onAddDrug,
  onRemoveDrug,
  onAnalyze,
  isAnalyzing = false
}) => {
  const [primaryDrug, setPrimaryDrug] = useState('')
  const [additionalDrug, setAdditionalDrug] = useState('')

  const handleAddPrimaryDrug = () => {
    if (primaryDrug.trim()) {
      const newDrug: Drug = {
        id: `drug-${Date.now()}`,
        name: primaryDrug.trim(),
        dosage: '', // Would be extracted from drug name or separate input
      }
      onAddDrug(newDrug)
      setPrimaryDrug('')
    }
  }

  const handleAddAdditionalDrug = () => {
    if (additionalDrug.trim()) {
      const newDrug: Drug = {
        id: `drug-${Date.now()}`,
        name: additionalDrug.trim(),
        dosage: '', // Would be extracted from drug name or separate input
      }
      onAddDrug(newDrug)
      setAdditionalDrug('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      callback()
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  }

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Header */}
      <motion.h2 
        className="text-gray-800 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]"
        variants={itemVariants}
      >
        Add Drugs for Analysis
      </motion.h2>

      {/* Primary Drug Input */}
      <motion.div className="flex flex-col gap-2" variants={itemVariants}>
        <label className="text-gray-700 dark:text-white text-base font-medium leading-normal" htmlFor="primary-drug">
          Primary Drug
        </label>
        <input 
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-mama-blue border border-gray-300 dark:border-[#326744] bg-white dark:bg-[#193322] focus:border-mama-blue dark:focus:border-mama-blue h-14 placeholder:text-gray-400 dark:placeholder:text-[#92c9a4] p-4 text-base font-normal leading-normal transition-all duration-200"
          id="primary-drug"
          placeholder="Start typing drug name..."
          value={primaryDrug}
          onChange={(e) => setPrimaryDrug(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, handleAddPrimaryDrug)}
        />
      </motion.div>

      {/* Additional Drug Input */}
      <motion.div className="flex flex-col gap-2" variants={itemVariants}>
        <label className="text-gray-700 dark:text-white text-base font-medium leading-normal" htmlFor="additional-drug">
          Add Additional Drugs
        </label>
        <input 
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-mama-blue border border-gray-300 dark:border-[#326744] bg-white dark:bg-[#193322] focus:border-mama-blue dark:focus:border-mama-blue h-14 placeholder:text-gray-400 dark:placeholder:text-[#92c9a4] p-4 text-base font-normal leading-normal transition-all duration-200"
          id="additional-drug"
          placeholder="Start typing drug name..."
          value={additionalDrug}
          onChange={(e) => setAdditionalDrug(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, handleAddAdditionalDrug)}
        />
      </motion.div>

      {/* Dynamic Drug List */}
      <motion.div className="space-y-3" variants={itemVariants}>
        <AnimatePresence mode="popLayout">
          {drugs.map((drug) => (
            <motion.div
              key={drug.id}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {drug.name}
              </span>
              <motion.button
                className="text-gray-500 dark:text-gray-400 hover:text-mama-critical transition-colors duration-200 p-1 rounded"
                onClick={() => onRemoveDrug(drug.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Remove ${drug.name}`}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>

        {drugs.length === 0 && (
          <motion.div
            className="text-center py-8 text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No drugs added yet. Add at least two drugs to analyze interactions.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Analyze Button */}
      <motion.div className="mt-4" variants={itemVariants}>
        <button 
          className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-mama-blue text-white text-base font-bold leading-normal hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onAnalyze}
          disabled={drugs.length < 2 || isAnalyzing}
        >
          <span className="material-symbols-outlined mr-2">analytics</span>
          {isAnalyzing ? 'Analyzing...' : 'Analyze Interactions'}
        </button>
      </motion.div>
    </motion.div>
  )
}

export default DrugInput