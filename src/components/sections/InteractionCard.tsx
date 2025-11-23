import React from 'react'
import { motion } from 'framer-motion'
import { DrugInteraction } from '@/types'
import { SEVERITY_CONFIG } from '@/constants'
import { cn } from '@/utils/cn'

interface InteractionCardProps {
  interaction: DrugInteraction
  onToggleExpand: (interactionId: string) => void
}

/**
 * Individual drug interaction card with expandable details
 * Shows severity, clinical impact, and recommendations
 */
const InteractionCard: React.FC<InteractionCardProps> = ({
  interaction,
  onToggleExpand
}) => {
  const severityConfig = SEVERITY_CONFIG[interaction.severity]
  const isExpanded = interaction.isExpanded

  return (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      {/* Header */}
      <motion.div 
        className={cn(
          'p-5 border-l-4 cursor-pointer',
          `border-${severityConfig.borderColor}`
        )}
        onClick={() => onToggleExpand(interaction.id)}
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <div className="flex justify-between items-start">
          <div>
            <span 
              className={cn(
                'inline-block px-3 py-1 text-xs font-bold text-white rounded-full',
                `bg-${severityConfig.color}`
              )}
            >
              {severityConfig.label}
            </span>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mt-2">
              {interaction.drug1.name} & {interaction.drug2.name}
            </h4>
          </div>
          <button
            className="text-gray-500 dark:text-gray-400"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <span className="material-symbols-outlined">
              {isExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Expandable Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className="overflow-hidden"
      >
        <div className="p-5 border-t border-gray-200 dark:border-gray-700">
          {/* Clinical Impact */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h5 className="font-bold text-gray-700 dark:text-gray-200 mb-2">
              Clinical Impact
            </h5>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {interaction.clinicalImpact}
            </p>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h5 className="font-bold text-gray-700 dark:text-gray-200 mb-2">
              Recommendations
            </h5>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm space-y-1">
              {interaction.recommendations.map((recommendation, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {recommendation}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default InteractionCard