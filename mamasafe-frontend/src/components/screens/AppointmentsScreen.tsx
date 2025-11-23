import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'

interface Appointment {
  id: string
  patientName: string
  time: string
  type: string
  status: 'confirmed' | 'pending' | 'cancelled'
  patientId: string
}

interface AppointmentsScreenProps {
  onBack: () => void
  onNewAppointment: () => void
  onAppointmentClick: (appointment: Appointment) => void
}

const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({
  onBack,
  onNewAppointment,
  onAppointmentClick
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly')
  const [selectedDate, setSelectedDate] = useState(24)

  const mockAppointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Anais Silva',
      time: '10:30 AM',
      type: 'Postnatal Checkup',
      status: 'confirmed',
      patientId: 'MS-001'
    },
    {
      id: '2',
      patientName: 'Chloe Bennett',
      time: '11:15 AM',
      type: 'Ultrasound Scan',
      status: 'pending',
      patientId: 'MS-002'
    },
    {
      id: '3',
      patientName: 'Maria Garcia',
      time: '01:00 PM',
      type: 'First Trimester Consultation',
      status: 'confirmed',
      patientId: 'MS-003'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500'
      case 'pending': return 'bg-orange-400'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const hasAppointment = (day: number) => {
    return [3, 5, 11, 24, 28].includes(day)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 w-full" />
      )
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate
      const hasAppt = hasAppointment(day)
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className="h-12 w-full text-gray-900 dark:text-gray-200 text-sm font-medium"
        >
          <div className={`relative flex size-full items-center justify-center rounded-full ${
            isSelected ? 'bg-gradient-to-br from-purple-100 to-purple-200' : ''
          }`}>
            <span className={isSelected ? 'text-purple-700 font-bold' : ''}>{day}</span>
            {hasAppt && (
              <div className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </div>
        </button>
      )
    }

    return days
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
          <h1 className="text-lg font-bold text-gray-900">Appointments</h1>
          <div className="w-10" />
        </div>
      </motion.div>

      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-4 shadow-sm"
      >
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-base font-bold text-gray-900">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="max-w-sm mx-auto">
          <div className="grid grid-cols-7 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="h-12 flex items-center justify-center">
                <span className="text-gray-500 text-sm font-bold">{day}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {renderCalendar()}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mt-4">
          <div className="flex h-10 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly View
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'weekly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Weekly View
            </button>
          </div>
        </div>
      </motion.div>

      {/* Today's Schedule */}
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">
          Today's Schedule - Oct {selectedDate}, 2024
        </h3>

        {mockAppointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onAppointmentClick(appointment)}
            >
              <div className="flex items-center gap-4">
                <div className="text-center shrink-0 w-20">
                  <p className="text-lg font-bold text-gray-900">
                    {appointment.time.split(' ')[0]}
                  </p>
                  <p className="text-sm text-gray-600">
                    {appointment.time.split(' ')[1]}
                  </p>
                </div>
                <div className="h-16 w-px bg-gray-200" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className={`h-3 w-3 rounded-full ${getStatusColor(appointment.status)}`}
                    title={appointment.status}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="sticky bottom-0 p-4 bg-gradient-to-t from-gray-50 to-transparent"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-4 py-3 rounded-full"
          >
            <MessageSquare className="w-4 h-4" />
            SMS All
          </Button>
          <Button
            variant="primary"
            onClick={onNewAppointment}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Appointment
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default AppointmentsScreen