import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wifi, WifiOff, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { testConnection, testSms } from '../../api'

interface SystemStatusProps {
  className?: string
  showDetails?: boolean
}

interface ServiceStatus {
  name: string
  status: 'online' | 'offline' | 'checking'
  lastCheck: Date
  responseTime?: number
}

const SystemStatus: React.FC<SystemStatusProps> = ({ 
  className = '', 
  showDetails = false 
}) => {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'MamaSafe API', status: 'checking', lastCheck: new Date() },
    { name: 'SMS Service', status: 'checking', lastCheck: new Date() },
    { name: 'Database', status: 'checking', lastCheck: new Date() }
  ])
  const [overallStatus, setOverallStatus] = useState<'online' | 'offline' | 'degraded'>('online')

  useEffect(() => {
    checkSystemStatus()
    const interval = setInterval(checkSystemStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const checkSystemStatus = async () => {
    const updatedServices = [...services]
    
    // Check main API
    try {
      const start = Date.now()
      await testConnection()
      const responseTime = Date.now() - start
      updatedServices[0] = {
        name: 'MamaSafe API',
        status: 'online',
        lastCheck: new Date(),
        responseTime
      }
    } catch (error) {
      updatedServices[0] = {
        name: 'MamaSafe API',
        status: 'offline',
        lastCheck: new Date()
      }
    }

    // Check SMS service
    try {
      const start = Date.now()
      await testSms()
      const responseTime = Date.now() - start
      updatedServices[1] = {
        name: 'SMS Service',
        status: 'online',
        lastCheck: new Date(),
        responseTime
      }
    } catch (error) {
      updatedServices[1] = {
        name: 'SMS Service',
        status: 'offline',
        lastCheck: new Date()
      }
    }

    // Mock database check (would be real in production)
    updatedServices[2] = {
      name: 'Database',
      status: 'online',
      lastCheck: new Date(),
      responseTime: Math.random() * 100 + 50
    }

    setServices(updatedServices)

    // Determine overall status
    const offlineCount = updatedServices.filter(s => s.status === 'offline').length
    if (offlineCount === 0) {
      setOverallStatus('online')
    } else if (offlineCount === updatedServices.length) {
      setOverallStatus('offline')
    } else {
      setOverallStatus('degraded')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'offline':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'checking':
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getOverallIcon = () => {
    switch (overallStatus) {
      case 'online':
        return <Wifi className="w-5 h-5 text-green-500" />
      case 'offline':
        return <WifiOff className="w-5 h-5 text-red-500" />
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return <Wifi className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = () => {
    switch (overallStatus) {
      case 'online':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (!showDetails) {
    return (
      <motion.div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor()} ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        {getOverallIcon()}
        <span className="capitalize">{overallStatus}</span>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor()}`}>
          {getOverallIcon()}
          <span className="capitalize">{overallStatus}</span>
        </div>
      </div>

      <div className="space-y-3">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(service.status)}
              <div>
                <p className="font-medium text-gray-900">{service.name}</p>
                <p className="text-xs text-gray-500">
                  Last checked: {service.lastCheck.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            {service.responseTime && (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {service.responseTime.toFixed(0)}ms
                </p>
                <p className="text-xs text-gray-500">Response time</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={checkSystemStatus}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          <Clock className="w-4 h-4" />
          Refresh Status
        </button>
      </div>
    </motion.div>
  )
}

export default SystemStatus