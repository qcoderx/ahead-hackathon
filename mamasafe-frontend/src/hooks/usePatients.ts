import { useState, useEffect } from 'react'
import { getAllPatients, searchPatients, createPatient, invitePatient, handleApiError, PatientCreate, PatientCreateResponse, testPatientEndpoint } from '../api'
import { Patient } from '../types/patient'

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load initial patients
  useEffect(() => {
    loadAllPatients()
  }, [])

  const loadAllPatients = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('Loading all patients...')
      
      // First test the endpoint connectivity
      try {
        await testPatientEndpoint()
        console.log('Patient endpoint test passed')
      } catch (testError) {
        console.warn('Patient endpoint test failed, but continuing:', testError)
      }
      
      // Call real API to get all patients
      const response = await getAllPatients()
      console.log('Raw API response:', response)
      
      // Map API response to frontend Patient interface
      const mappedPatients: Patient[] = Array.isArray(response) ? response.map((p: any) => ({
        id: p.id?.toString() || '',
        patientId: `MS-${p.id}`,
        name: p.full_name || `${p.first_name} ${p.last_name || ''}`.trim(),
        age: calculateAge(p.date_of_birth),
        gestationalWeek: p.gestational_week || 0,
        phoneNumber: p.phone_number || '',
        location: p.address || '',
        lastMedCheck: p.updated_at ? new Date(p.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        riskLevel: p.risk_level?.toLowerCase() || 'safe',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.first_name || 'U')}+${encodeURIComponent(p.last_name || 'U')}&background=random`
      })) : []
      
      console.log('Mapped patients:', mappedPatients)
      setPatients(mappedPatients)
    } catch (err) {
      console.error('Failed to load patients:', err)
      console.error('Error details:', err.response?.data)
      setError(`Failed to load patients: ${err.response?.data?.detail || err.message}`)
      setPatients([])
    } finally {
      setLoading(false)
    }
  }

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
      await loadAllPatients()
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
    loadAllPatients,
    searchPatientsQuery,
    createNewPatient,
    sendPatientInvite
  }
}