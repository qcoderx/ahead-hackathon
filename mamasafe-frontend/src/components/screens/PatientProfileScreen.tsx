import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit, Phone, Trash2 } from 'lucide-react'
import { Patient } from '../../types/patient'
import Button from '../ui/Button'

interface PatientProfileScreenProps {
  patient: Patient
  onBack: () => void
  onEdit: () => void
  onCall: () => void
  onArchive: () => void
}

const PatientProfileScreen: React.FC<PatientProfileScreenProps> = ({
  patient,
  onBack,
  onEdit,
  onCall,
  onArchive
}) => {
  const mockMedChecks = [
    { date: 'Jan 15', drug: 'Paracetamol', status: 'safe', result: '✅ Safe' },
    { date: 'Jan 12', drug: 'Ibuprofen', status: 'contraindicated', result: '❌ Contraindicated' },
    { date: 'Jan 10', drug: 'Folic Acid', status: 'safe', result: '✅ Safe' },
    { date: 'Jan 08', drug: 'Aspirin', status: 'caution', result: '⚠️ Caution' }
  ]

  const mockAppointments = [
    { date: 'Jan 22', time: '10:00 AM', type: 'Routine Checkup' },
    { date: 'Feb 05', time: '02:00 PM', type: 'Medication Review' }
  ]

  const calculateDueDate = (gestationalWeek: number) => {
    const weeksRemaining = 40 - gestationalWeek
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + (weeksRemaining * 7))
    return { dueDate: dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), weeksRemaining }
  }

  const { dueDate, weeksRemaining } = calculateDueDate(patient.gestationalWeek)
  const progressPercentage = (patient.gestationalWeek / 40) * 100

  return (
    <div className="min-h-screen bg-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-4 p-2 hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Main Profile Card */}
        <div className="border border-gray-300 rounded-lg p-6 space-y-6">
          {/* Patient Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="text-2xl">👤</div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">
                {patient.name} | ID: {patient.patientId} | {patient.age} years | {patient.gestationalWeek} weeks
              </h1>
            </div>
          </div>

          {/* Pregnancy Timeline */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              📊 Pregnancy Timeline
            </h2>
            <div className="border border-gray-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{patient.gestationalWeek}/40 weeks</span>
              </div>
              <p className="text-sm text-gray-600">
                Due Date: {dueDate} ({weeksRemaining} weeks remaining)
              </p>
              <p className="text-sm text-gray-600">
                Trimester: {patient.gestationalWeek <= 12 ? 'First' : patient.gestationalWeek <= 28 ? 'Second' : 'Third'} | Risk Level: {patient.riskLevel}
              </p>
            </div>
          </div>

          {/* Recent Medication Checks */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              💊 Recent Medication Checks
            </h2>
            <div className="border border-gray-200 rounded-lg p-4 space-y-2">
              {mockMedChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <span className="text-sm">{check.date} | {check.drug}</span>
                  <span className="text-sm font-medium">{check.result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              📅 Upcoming Appointments
            </h2>
            <div className="border border-gray-200 rounded-lg p-4 space-y-2">
              {mockAppointments.map((apt, index) => (
                <div key={index} className="text-sm">
                  {apt.date} | {apt.time} | {apt.type}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={onEdit}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              ✏️ Edit Profile
            </Button>
            <Button
              variant="secondary"
              onClick={onCall}
              className="flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              📞 Call Patient
            </Button>
            <Button
              variant="danger"
              onClick={onArchive}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              🗑️ Archive
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PatientProfileScreen