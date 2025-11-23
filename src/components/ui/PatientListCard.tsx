import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Edit, MessageCircle } from 'lucide-react'
import { Patient } from '../../types/patient'
import { cn } from '../../utils/cn'

interface PatientListCardProps {
  patient: Patient
  delay?: number
  onView?: (patient: Patient) => void
  onEdit?: (patient: Patient) => void
  onMessage?: (patient: Patient) => void
}

export const PatientListCard: React.FC<PatientListCardProps> = ({
  patient,
  delay = 0,
  onView,
  onEdit,
  onMessage
}) => {
  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high-risk':
        return 'bg-mama-critical text-white'
      case 'caution':
        return 'bg-mama-moderate text-white'
      case 'safe':
        return 'bg-mama-safe text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high-risk':
        return 'High Risk'
      case 'caution':
        return 'Caution'
      case 'safe':
        return 'Safe'
      default:
        return 'Unknown'
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
      whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}
    >
      <div className="flex items-start gap-4 mb-4">
        {patient.avatar ? (
          <img
            src={patient.avatar}
            alt={patient.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary/20 text-primary font-bold text-lg flex items-center justify-center">
            {getInitials(patient.name)}
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-semibold text-gray-900">{patient.name}</h4>
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              getRiskBadgeColor(patient.riskLevel)
            )}>
              {getRiskLabel(patient.riskLevel)}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            ID: {patient.patientId} • {patient.age} yrs • {patient.gestationalWeek}w gest.
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Last Med Check: {patient.lastMedCheck}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
        <div className="text-sm text-gray-600">
          <p>{patient.phoneNumber}</p>
          <p>{patient.location}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            className="h-10 px-3 rounded-lg bg-primary text-white flex items-center justify-center gap-1 text-sm font-medium"
            onClick={() => onView?.(patient)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Patient Profile
          </motion.button>
          
          <motion.button
            className="h-10 w-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center"
            onClick={() => onEdit?.(patient)}
            whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center"
            onClick={() => onMessage?.(patient)}
            whileHover={{ scale: 1.05, backgroundColor: '#0ea66f' }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}