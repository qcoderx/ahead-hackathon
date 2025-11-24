import { useState, useEffect } from 'react'
import { searchPatients, createPatient, invitePatient, handleApiError, PatientCreate, PatientCreateResponse, PatientInviteRequest } from '../api'
import { Patient } from '../types/patient'

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchPatientsQuery = async (query: string) => {
    if (!query.trim()) {
      setPatients([])
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const response = await searchPatients(query)
      // Transform backend response to frontend format
      const transformedPatients: Patient[] = response.map((p: any) => ({
        id: p.id?.toString() || '1',
        patientId: p.patient_id || `MS-${p.id}`,
        name: `${p.first_name || ''} ${p.last_name || ''}`.trim(),
        age: p.date_of_birth ? calculateAge(p.date_of_birth) : 25,
        gestationalWeek: 20,
        phoneNumber: p.phone_number || '',
        location: p.address || 'Unknown',
        lastMedCheck: new Date().toISOString().split('T')[0],
        riskLevel: 'safe' as const,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
      }))
      
      setPatients(transformedPatients)
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      setPatients([])
    } finally {
      setLoading(false)
    }
  }

  const createNewPatient = async (patientData: PatientCreate) => {
    setLoading(true)
    setError(null)
    
    try {
      const response: PatientCreateResponse = await createPatient(patientData)
      return response
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const sendPatientInvite = async (patientId: string, phoneNumber: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await invitePatient(patientId, phoneNumber)
      return response
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  return {
    patients,
    loading,
    error,
    searchPatientsQuery,
    createNewPatient,
    sendPatientInvite
  }
}