import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User, MapPin, Stethoscope, Home } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { Patient } from '../../types/patient'

interface ScheduleAppointmentScreenProps {
  patient?: Patient
  onBack: () => void
  onSchedule: (appointmentData: any) => void
}

const ScheduleAppointmentScreen: React.FC<ScheduleAppointmentScreenProps> = ({
  patient,
  onBack,
  onSchedule
}) => {
  const [appointmentData, setAppointmentData] = useState({
    date: 'November 18, 2024',
    time: '10:30 AM',
    type: 'Routine Check-up',
    duration: '30 Minutes',
    location: 'MamaSafe Downtown Clinic',
    provider: 'Dr. Evelyn Reed',
    room: 'Room 204',
    notes: '',
    smsReminder: true,
    emailConfirmation: true
  })

  const appointmentTypes = [
    'Routine Check-up',
    'Ultrasound Scan',
    'Postnatal Checkup',
    'First Trimester Consultation',
    'Emergency Consultation',
    'Follow-up Visit'
  ]

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ]

  const providers = [
    'Dr. Evelyn Reed',
    'Dr. Sarah Johnson',
    'Dr. Michael Chen',
    'Dr. Amina Hassan'
  ]

  const handleSchedule = () => {
    onSchedule({
      ...appointmentData,
      patientId: patient?.id || 'unknown'
    })
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
          <h1 className="text-lg font-bold text-gray-900">Schedule Appointment</h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Patient Information */}
        {patient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url("${patient.avatar}")` }}
                />
                <div>
                  <p className="font-semibold text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-600">Patient ID: {patient.patientId}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Appointment Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-bold text-gray-900">Appointment Details</h2>
          <Card className="overflow-hidden">
            {/* Date Selection */}
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-700" />
              </div>
              <span className="flex-1 text-left text-gray-900">{appointmentData.date}</span>
              <span className="text-gray-400">›</span>
            </button>
            
            <hr className="border-gray-200 mx-4" />
            
            {/* Time Selection */}
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                <Clock className="w-5 h-5 text-gray-700" />
              </div>
              <span className="flex-1 text-left text-gray-900">{appointmentData.time}</span>
              <span className="text-gray-400">›</span>
            </button>
            
            <hr className="border-gray-200 mx-4" />
            
            {/* Type Selection */}
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                <User className="w-5 h-5 text-gray-700" />
              </div>
              <span className="flex-1 text-left text-gray-900">{appointmentData.type}</span>
              <span className="text-gray-400">›</span>
            </button>
            
            <hr className="border-gray-200 mx-4" />
            
            {/* Duration */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                <Clock className="w-5 h-5 text-gray-700" />
              </div>
              <span className="text-gray-900">{appointmentData.duration}</span>
            </div>
          </Card>
        </motion.div>

        {/* Location & Provider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-bold text-gray-900">Location & Provider</h2>
          <Card className="overflow-hidden">
            {/* Location */}
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-700" />
              </div>
              <span className="flex-1 text-left text-gray-900">{appointmentData.location}</span>
              <span className="text-gray-400">›</span>
            </button>
            
            <hr className="border-gray-200 mx-4" />
            
            {/* Provider */}
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                <Stethoscope className="w-5 h-5 text-gray-700" />
              </div>
              <span className="flex-1 text-left text-gray-900">{appointmentData.provider}</span>
              <span className="text-gray-400">›</span>
            </button>
            
            <hr className="border-gray-200 mx-4" />
            
            {/* Room */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                <Home className="w-5 h-5 text-gray-700" />
              </div>
              <span className="text-gray-900">{appointmentData.room}</span>
            </div>
          </Card>
        </motion.div>

        {/* Notes & Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-bold text-gray-900">Notes & Reminders</h2>
          <Card className="p-4 space-y-4">
            <textarea
              className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              placeholder="Add a note for the provider (optional)"
              rows={3}
              value={appointmentData.notes}
              onChange={(e) => setAppointmentData(prev => ({ ...prev, notes: e.target.value }))}
            />
            
            {/* SMS Reminder Toggle */}
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-900">Send SMS Reminder</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={appointmentData.smsReminder}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, smsReminder: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            {/* Email Confirmation Toggle */}
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-900">Send Email Confirmation</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={appointmentData.emailConfirmation}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, emailConfirmation: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="sticky bottom-0 w-full bg-white/80 backdrop-blur-sm p-4"
      >
        <Button
          variant="primary"
          onClick={handleSchedule}
          className="w-full py-4 rounded-full text-base font-bold shadow-lg hover:scale-[1.02] transition-transform"
        >
          Schedule Appointment
        </Button>
      </motion.div>
    </div>
  )
}

export default ScheduleAppointmentScreen