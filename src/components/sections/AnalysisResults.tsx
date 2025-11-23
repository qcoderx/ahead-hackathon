import React from 'react'
import { motion } from 'framer-motion'
import { AnalysisResult, DrugInteraction } from '@/types'
import InteractionCard from './InteractionCard'
import { cn } from '@/utils/cn'

interface AnalysisResultsProps {
  result: AnalysisResult | null
  interactions: DrugInteraction[]
  onToggleInteraction: (interactionId: string) => void
  onSaveToRecord?: () => void
  onPrintSummary?: () => void
  isLoading?: boolean
}

/**
 * Analysis results section showing interaction summary and detailed cards
 * Includes critical alerts and action buttons
 */
const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  interactions,
  onToggleInteraction,
  onSaveToRecord,
  onPrintSummary,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
            Analysis Results
          </h2>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-24 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!result || interactions.length === 0) {
    return (
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
            Analysis Results
          </h2>
        </div>
        
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-12 text-center">
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-lg font-medium mb-2">No Analysis Yet</p>
            <p className="text-sm">Add at least two drugs and click "Analyze Interactions" to see results.</p>
          </div>
        </div>
      </motion.div>
    )
  }

  const hasCriticalInteractions = result.criticalCount > 0 || result.majorCount > 0
  const totalInteractions = result.totalInteractions

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <h2 className="text-gray-800 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Analysis Results
        </h2>
        <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">
          {totalInteractions} Interaction{totalInteractions !== 1 ? 's' : ''} Found
        </span>
      </motion.div>

      {/* Critical Alert */}
      {hasCriticalInteractions && (
        <motion.div variants={itemVariants}>
          <div className="bg-mama-critical/10 border border-mama-critical rounded-xl p-5 flex items-start gap-4">
            <span className="material-symbols-outlined text-3xl text-mama-critical mt-1">error</span>
            <div>
              <h3 className="text-xl font-bold text-mama-critical">
                Critical Alert
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                {result.criticalCount > 0 
                  ? 'Critical interactions have been detected. Immediate clinical review is required.'
                  : 'Major interactions have been detected. Immediate clinical review is required.'
                }
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Interaction Cards */}
      <motion.div className="space-y-4" variants={itemVariants}>
        {interactions.map((interaction, index) => (
          <motion.div
            key={interaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <InteractionCard
              interaction={interaction}
              onToggleExpand={onToggleInteraction}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="mt-4 flex flex-col sm:flex-row gap-4"
        variants={itemVariants}
      >
        <button 
          className="flex-1 flex items-center justify-center rounded-lg h-11 px-6 bg-mama-blue/10 text-mama-blue dark:bg-mama-blue/20 dark:text-mama-blue font-bold text-sm hover:bg-mama-blue/20 dark:hover:bg-mama-blue/30 transition-colors"
          onClick={onSaveToRecord}
        >
          <span className="material-symbols-outlined mr-2 text-base">save</span>
          Save to Patient Record
        </button>
        
        <button 
          className="flex-1 flex items-center justify-center rounded-lg h-11 px-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          onClick={onPrintSummary}
        >
          <span className="material-symbols-outlined mr-2 text-base">print</span>
          Print Summary
        </button>
      </motion.div>
    </motion.div>
  )
}

export default AnalysisResults