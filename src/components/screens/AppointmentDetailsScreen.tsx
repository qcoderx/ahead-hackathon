import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, MessageSquare, Edit, Trash2 } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'

interface AppointmentDetailsScreenProps {
  appointment: {
    id: string
    patientName: string
    patientId: string
    time: string
    type: string
    status: 'confirmed' | 'pending' | 'cancelled'
    date: string
    location: string
    provider: string
    room: string
    notes?: string
  }
  onBack: () => void
  onEdit: () => void
  onCancel: () => void
  onCall: () => void
  onMessage: () => void
}

const AppointmentDetailsScreen: React.FC<AppointmentDetailsScreenProps> = ({
  appointment,
  onBack,
  onEdit,
  onCancel,
  onCall,
  onMessage
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-orange-100 text-orange-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return '✅'
      case 'pending': return '⏳'
      case 'cancelled': return '❌'
      default: return '❓'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-4"
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-gray-900">Appointment Details</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="p-2 hover:bg-gray-100"
          >
            <Edit className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getStatusIcon(appointment.status)}</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{appointment.patientName}</h2>
                  <p className="text-sm text-gray-600">ID: {appointment.patientId}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Appointment Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="text-lg font-bold text-gray-900">Appointment Information</h3>
          <Card className="divide-y divide-gray-200">
            <div className="flex items-center gap-4 p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Date</p>
                <p className="text-sm text-gray-600">{appointment.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Time</p>
                <p className="text-sm text-gray-600">{appointment.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Appointment Type</p>
                <p className="text-sm text-gray-600">{appointment.type}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-600">{appointment.location}</p>
                <p className="text-xs text-gray-500">{appointment.room}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Provider Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h3 className="text-lg font-bold text-gray-900">Healthcare Provider</h3>
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {appointment.provider.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{appointment.provider}</p>
                <p className="text-sm text-gray-600">Maternal Health Specialist</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notes */}
        {appointment.notes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold text-gray-900">Notes</h3>
            <Card className="p-4">
              <p className="text-gray-700">{appointment.notes}</p>
            </Card>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              onClick={onCall}
              className="flex items-center justify-center gap-2 py-3"
            >
              <Phone className="w-4 h-4" />
              Call Patient
            </Button>
            <Button
              variant="secondary"
              onClick={onMessage}
              className="flex items-center justify-center gap-2 py-3"
            >
              <MessageSquare className="w-4 h-4" />
              Send Message
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="sticky bottom-0 w-full bg-white/80 backdrop-blur-sm p-4 space-y-3"
      >
        <Button
          variant="primary"
          onClick={onEdit}
          className="w-full py-4 rounded-full text-base font-bold"
        >
          Edit Appointment
        </Button>
        <Button
          variant="danger"
          onClick={onCancel}
          className="w-full py-3 rounded-full text-base font-medium"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Cancel Appointment
        </Button>
      </motion.div>
    </div>
  )
}

export default AppointmentDetailsScreen