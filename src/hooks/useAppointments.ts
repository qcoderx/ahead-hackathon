import { useState } from 'react'
import { createAppointment, getPatientAppointments, handleApiError, AppointmentCreate, AppointmentResponse } from '../api'

export const useAppointments = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([])

  const createNewAppointment = async (appointmentData: AppointmentCreate) => {
    setLoading(true)
    setError(null)
    
    try {
      const response: AppointmentResponse = await createAppointment(appointmentData)
      return response
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchPatientAppointments = async (patientId: number) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await getPatientAppointments(patientId)
      setAppointments(response)
      return response
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return {
    loading,
    error,
    appointments,
    createNewAppointment,
    fetchPatientAppointments,
    clearError
  }
}