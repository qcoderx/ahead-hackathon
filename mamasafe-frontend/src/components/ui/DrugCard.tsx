import React from 'react'
import { motion } from 'framer-motion'
import { Pill, X } from 'lucide-react'
import { Drug } from '../../types/interactions'

interface DrugCardProps {
  drug: Drug
  onRemove?: (drugId: string) => void
  showRemove?: boolean
  delay?: number
}

const DrugCard: React.FC<DrugCardProps> = ({ 
  drug, 
  onRemove, 
  showRemove = false, 
  delay = 0 
}) => {
  const isPrimary = drug.type === 'primary'

  return (
    <motion.div
      className="flex items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mr-3">
        <Pill className="h-5 w-5" />
      </div>
      
      <div className="flex-1">
        <p className="text-xs text-gray-500">
          {isPrimary ? 'Primary Drug' : 'Additional Drug'}
        </p>
        <p className="font-semibold text-gray-900">
          {drug.name} {drug.dosage && drug.dosage}
        </p>
      </div>
      
      {showRemove && onRemove && (
        <motion.button
          className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
          onClick={() => onRemove(drug.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      )}
    </motion.div>
  )
}

export default DrugCard