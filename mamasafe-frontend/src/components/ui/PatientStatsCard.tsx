import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface PatientStatsCardProps {
  title: string
  value: number
  isHighRisk?: boolean
  delay?: number
  className?: string
}

export const PatientStatsCard: React.FC<PatientStatsCardProps> = ({
  title,
  value,
  isHighRisk = false,
  delay = 0,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        "bg-white rounded-xl border border-gray-200 p-4 shadow-sm",
        className
      )}
      whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}
    >
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <p className={cn(
        "text-2xl font-bold",
        isHighRisk ? "text-mama-critical" : "text-gray-900"
      )}>
        {value}
      </p>
    </motion.div>
  )
}