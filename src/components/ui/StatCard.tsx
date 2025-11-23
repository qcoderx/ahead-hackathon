import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change: number
  delay?: number
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, delay = 0 }) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [displayValue, setDisplayValue] = useState(0)
  const isPositive = change >= 0
  const Icon = isPositive ? TrendingUp : TrendingDown

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUpdating(true)
      const targetValue = typeof value === 'number' ? value : parseInt(value.toString())
      let current = 0
      const increment = targetValue / 20
      const counter = setInterval(() => {
        current += increment
        if (current >= targetValue) {
          setDisplayValue(targetValue)
          clearInterval(counter)
          setIsUpdating(false)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, 50)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <motion.div
      className="relative flex flex-col gap-1 rounded-lg p-4 bg-white shadow-sm border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 100 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >

      


      <p className="text-gray-600 text-xs font-medium">{title}</p>
      
      <p className="text-gray-900 text-2xl font-semibold">
        {displayValue}
      </p>
      
      <p className={`text-xs font-medium flex items-center ${
          isPositive ? 'text-green-600' : 'text-red-500'
        }`}>
        <Icon className="h-3 w-3 mr-1" />
        {isPositive ? '+' : ''}{change}%
      </p>
    </motion.div>
  )
}

export default StatCard