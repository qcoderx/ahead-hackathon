import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle, Info, XCircle } from 'lucide-react'
import { Interaction } from '../../types/interactions'

interface InteractionAlertProps {
  interaction: Interaction
  delay?: number
}

const InteractionAlert: React.FC<InteractionAlertProps> = ({ interaction, delay = 0 }) => {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: XCircle,
          bgGradient: 'from-red-100 to-red-50',
          borderColor: 'border-red-200',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          titleColor: 'text-red-600',
          title: 'CRITICAL INTERACTION'
        }
      case 'major':
        return {
          icon: AlertTriangle,
          bgGradient: 'from-orange-100 to-orange-50',
          borderColor: 'border-orange-200',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          titleColor: 'text-orange-600',
          title: 'MAJOR INTERACTION'
        }
      case 'moderate':
        return {
          icon: AlertCircle,
          bgGradient: 'from-yellow-100 to-yellow-50',
          borderColor: 'border-yellow-200',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-600',
          title: 'MODERATE INTERACTION'
        }
      case 'minor':
        return {
          icon: Info,
          bgGradient: 'from-blue-100 to-blue-50',
          borderColor: 'border-blue-200',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-600',
          title: 'MINOR INTERACTION'
        }
      default:
        return {
          icon: Info,
          bgGradient: 'from-gray-100 to-gray-50',
          borderColor: 'border-gray-200',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          titleColor: 'text-gray-600',
          title: 'INTERACTION'
        }
    }
  }

  const config = getSeverityConfig(interaction.severity)
  const Icon = config.icon

  return (
    <motion.div
      className={`bg-gradient-to-br ${config.bgGradient} p-1 rounded-xl shadow-sm`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, type: 'spring' }}
    >
      <div className={`bg-white rounded-lg p-4 border ${config.borderColor}`}>
        <div className="text-center mb-4">
          <motion.div
            className={`inline-flex items-center justify-center h-16 w-16 ${config.iconBg} rounded-full mb-3 border-4 border-white shadow-sm`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className={`${config.iconColor} h-8 w-8`} />
          </motion.div>
          <h3 className={`${config.titleColor} text-xl font-bold`}>
            {config.title}
          </h3>
          <p className="text-gray-500 text-sm">{interaction.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Risk</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {interaction.risk}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Recommendation</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {interaction.recommendation}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Action</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {interaction.action}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default InteractionAlert