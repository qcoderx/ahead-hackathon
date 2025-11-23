import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Phone, MessageSquare, Users, FileText, CheckCircle, X, Clock } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useAudit } from '../../hooks/useAudit'
import Button from '../ui/Button'
import Card from '../ui/Card'

interface EmergencyAlert {
  id: string
  patientName: string
  patientId: string
  drugs: string[]
  riskLevel: 'Critical' | 'High' | 'Medium'
  gestationalWeek: number
  timestamp: string
  provider: string
  description: string
  actions: string[]
  status: 'active' | 'resolved' | 'acknowledged'
}

interface EmergencyAlertScreenProps {
  alert: EmergencyAlert
  onBack: () => void
  onResolve: (alertId: string, notes: string) => void
  onEscalate: (alertId: string) => void
}

const EmergencyAlertScreen: React.FC<EmergencyAlertScreenProps> = ({
  alert: initialAlert,
  onBack,
  onResolve,
  onEscalate
}) => {
  const { t } = useTranslation()
  const { logAudit } = useAudit()
  const [alert, setAlert] = useState(initialAlert)
  const [notes, setNotes] = useState('')
  const [isResolving, setIsResolving] = useState(false)
  const [actionsTaken, setActionsTaken] = useState<string[]>([])

  // Mock alert if none provided
  const mockAlert: EmergencyAlert = {
    id: 'ALERT-001',
    patientName: 'Fatima Ibrahim',
    patientId: 'MS-176',
    drugs: ['Ibuprofen', 'Aspirin'],
    riskLevel: 'Critical',
    gestationalWeek: 32,
    timestamp: new Date().toISOString(),
    provider: 'Dr. Amina Kano',
    description: 'Dual NSAID therapy detected in third trimester. High risk of ductus arteriosus closure and oligohydramnios.',
    actions: [
      'Discontinue both NSAIDs immediately',
      'Monitor fetal heart rate',
      'Consider alternative pain management',
      'Schedule urgent specialist consultation'
    ],
    status: 'active'
  }

  const currentAlert = alert || mockAlert

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-500 text-white'
      case 'High': return 'bg-orange-500 text-white'
      case 'Medium': return 'bg-yellow-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const handleActionTaken = (action: string) => {
    if (!actionsTaken.includes(action)) {
      setActionsTaken(prev => [...prev, action])
    }
  }

  const handleCallPatient = async () => {
    try {
      // Log the action
      await logAudit({
        patient_id: currentAlert.patientId,
        drug_name: currentAlert.drugs.join(', '),
        risk_level: currentAlert.riskLevel,
        override_reason: 'Emergency call initiated',
        action: 'CALL_PATIENT'
      })
      
      handleActionTaken('Called patient')
      // In a real app, this would initiate a phone call
      alert('Initiating call to patient...')
    } catch (error) {
      console.error('Failed to log call action:', error)
    }
  }

  const handleSMSAlert = async () => {
    try {
      await logAudit({
        patient_id: currentAlert.patientId,
        drug_name: currentAlert.drugs.join(', '),
        risk_level: currentAlert.riskLevel,
        override_reason: 'Emergency SMS sent',
        action: 'SMS_ALERT'
      })
      
      handleActionTaken('Sent SMS alert')
      alert('SMS alert sent to patient')
    } catch (error) {
      console.error('Failed to log SMS action:', error)
    }
  }

  const handleResolveAlert = async () => {
    if (!notes.trim()) {
      alert('Please add resolution notes')
      return
    }

    setIsResolving(true)
    try {
      await logAudit({
        patient_id: currentAlert.patientId,
        drug_name: currentAlert.drugs.join(', '),
        risk_level: currentAlert.riskLevel,
        override_reason: notes,
        action: 'ALERT_RESOLVED'
      })
      
      setAlert(prev => ({ ...prev, status: 'resolved' }))
      onResolve(currentAlert.id, notes)
    } catch (error) {
      console.error('Failed to resolve alert:', error)
    } finally {
      setIsResolving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Header */}
      <motion.header
        className={`${getRiskColor(currentAlert.riskLevel)} px-4 py-6 shadow-lg`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <AlertTriangle className="w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold">EMERGENCY ALERT</h1>
              <p className="text-sm opacity-90">{currentAlert.riskLevel} Risk Detected</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </motion.header>

      <div className="p-6 space-y-6">
        {/* Patient Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 border-l-4 border-red-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Details</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {currentAlert.patientName}</p>
                  <p><span className="font-medium">ID:</span> {currentAlert.patientId}</p>
                  <p><span className="font-medium">Gestational Week:</span> {currentAlert.gestationalWeek}</p>
                  <p><span className="font-medium">Provider:</span> {currentAlert.provider}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Drugs:</span> {currentAlert.drugs.join(', ')}</p>
                  <p><span className="font-medium">Time:</span> {new Date(currentAlert.timestamp).toLocaleString()}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      currentAlert.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      currentAlert.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentAlert.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Risk Assessment */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{currentAlert.description}</p>
            </div>
          </Card>
        </motion.section>

        {/* Immediate Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Immediate Actions Required</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Button
                variant="danger"
                onClick={handleCallPatient}
                className="flex items-center justify-center gap-2 h-12"
              >
                <Phone className="w-5 h-5" />
                Call Patient Now
              </Button>
              <Button
                variant="secondary"
                onClick={handleSMSAlert}
                className="flex items-center justify-center gap-2 h-12"
              >
                <MessageSquare className="w-5 h-5" />
                Send SMS Alert
              </Button>
              <Button
                variant="secondary"
                onClick={() => onEscalate(currentAlert.id)}
                className="flex items-center justify-center gap-2 h-12"
              >
                <Users className="w-5 h-5" />
                Alert Specialist
              </Button>
              <Button
                variant="secondary"
                className="flex items-center justify-center gap-2 h-12"
              >
                <FileText className="w-5 h-5" />
                Document Case
              </Button>
            </div>

            {/* Action Checklist */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Clinical Actions:</h3>
              {currentAlert.actions.map((action, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <button
                    onClick={() => handleActionTaken(action)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      actionsTaken.includes(action)
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {actionsTaken.includes(action) && <CheckCircle className="w-3 h-3" />}
                  </button>
                  <span className={`flex-1 ${actionsTaken.includes(action) ? 'line-through text-gray-500' : ''}`}>
                    {action}
                  </span>
                  {actionsTaken.includes(action) && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Resolution Notes */}
        {currentAlert.status === 'active' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resolution Notes</h2>
              <textarea
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Document actions taken and resolution details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="flex gap-4 mt-4">
                <Button
                  variant="primary"
                  onClick={handleResolveAlert}
                  loading={isResolving}
                  disabled={!notes.trim()}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Resolved
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setAlert(prev => ({ ...prev, status: 'acknowledged' }))}
                >
                  Acknowledge Alert
                </Button>
              </div>
            </Card>
          </motion.section>
        )}

        {/* Actions Taken Summary */}
        {actionsTaken.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="font-medium text-green-800 mb-2">Actions Completed:</h3>
              <ul className="space-y-1">
                {actionsTaken.map((action, index) => (
                  <li key={index} className="text-sm text-green-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {action}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.section>
        )}
      </div>
    </div>
  )
}

export default EmergencyAlertScreen