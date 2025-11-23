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
      // Use mock data for now to avoid API errors
      const mockPatients: Patient[] = [
        {
          id: '1',
          patientId: 'MS-001',
          name: 'Sarah Johnson',
          age: 28,
          gestationalWeek: 24,
          phoneNumber: '+234-801-234-5678',
          location: 'Lagos, Nigeria',
          lastMedCheck: '2024-03-15',
          riskLevel: 'safe',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        },
        {
          id: '2',
          patientId: 'MS-002',
          name: 'Amina Hassan',
          age: 32,
          gestationalWeek: 18,
          phoneNumber: '+234-802-345-6789',
          location: 'Abuja, Nigeria',
          lastMedCheck: '2024-03-14',
          riskLevel: 'moderate',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
        }
      ]
      
      const filtered = mockPatients.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.patientId.toLowerCase().includes(query.toLowerCase())
      )
      
      setPatients(filtered)
    } catch (err) {
      setError('Search failed')
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