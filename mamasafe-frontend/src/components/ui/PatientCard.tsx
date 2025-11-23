import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Patient } from '../../types/dashboard'
import { Heart, AlertTriangle, Activity } from 'lucide-react'

interface PatientCardProps {
  patient: Patient
  delay?: number
  onClick?: (patient: Patient) => void
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, delay = 0, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const getStatusConfig = (status: Patient['status']) => {
    switch (status) {
      case 'stable':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          dot: 'bg-green-500',
          label: 'Stable',
          icon: Heart,
          pulse: 'animate-pulse'
        }
      case 'needs-attention':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          dot: 'bg-orange-500',
          label: 'Needs Attention',
          icon: AlertTriangle,
          pulse: 'animate-bounce'
        }
      case 'critical':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          dot: 'bg-red-500',
          label: 'Critical',
          icon: Activity,
          pulse: 'animate-ping'
        }
    }
  }

  const statusConfig = getStatusConfig(patient.status)
  const StatusIcon = statusConfig.icon

  return (
    <motion.div
      className="relative flex items-center p-3 bg-white rounded-lg border border-gray-100 cursor-pointer overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all group"
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ 
        delay, 
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 4px 12px rgba(16, 183, 127, 0.15)'
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick?.(patient)}
    >
      {/* Hover background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* Avatar */}
      <div className="relative mr-3">
        <div 
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-1 ring-gray-200 transition-all"
          style={{ backgroundImage: `url("${patient.avatar}")` }}
        />
        {/* Status indicator */}
        <div className={`absolute -top-0.5 -right-0.5 w-3 h-3 ${statusConfig.dot} rounded-full ring-1 ring-white`} />
      </div>
      
      <div className="flex-1 relative z-10">
        <p className="font-medium text-gray-900 text-sm">
          {patient.name}
        </p>
        <p className="text-xs text-gray-500">{patient.room}</p>
      </div>
      
      <div className="flex items-center relative z-10">
        <span className={`inline-flex items-center rounded-full ${statusConfig.bg} px-2 py-1 text-xs font-medium ${statusConfig.text}`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {statusConfig.label}
        </span>
      </div>
      

    </motion.div>
  )
}

export default PatientCard