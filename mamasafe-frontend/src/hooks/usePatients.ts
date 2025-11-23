import { useState, useEffect } from 'react'
import { searchPatients, createPatient, invitePatient, handleApiError, PatientCreate, PatientCreateResponse } from '../api'
import { Patient } from '../types/patient'

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load initial patients
  useEffect(() => {
    searchPatientsQuery('')
  }, [])

  const searchPatientsQuery = async (query: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // Call real API
      const response = await searchPatients(query)
      
      // Map API response to frontend Patient interface
      // Assuming response is an array of patient objects from backend
      const mappedPatients: Patient[] = Array.isArray(response) ? response.map((p: any) => ({
        id: p.id?.toString() || '',
        patientId: p.patient_id || `MS-${p.id}`,
        name: `${p.first_name} ${p.last_name}`,
        age: calculateAge(p.date_of_birth),
        gestationalWeek: p.gestational_week || 0, // Default if not provided
        phoneNumber: p.phone_number || '',
        location: p.address || '',
        lastMedCheck: p.last_visit_date || new Date().toISOString().split('T')[0],
        riskLevel: p.risk_level?.toLowerCase() || 'safe',
        avatar: p.avatar_url || `https://ui-avatars.com/api/?name=${p.first_name}+${p.last_name}&background=random`
      })) : []
      
      setPatients(mappedPatients)
    } catch (err) {
      console.error('Search failed:', err)
      setError('Failed to load patients')
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
      // Refresh list after creation
      await searchPatientsQuery('')
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
    if (!dateOfBirth) return 0
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