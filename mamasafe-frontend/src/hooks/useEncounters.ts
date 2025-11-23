import { useState } from 'react'
import { updateEncounter, createTestEncounterData, handleApiError, EncounterUpdateRequest, EncounterUpdateResponse } from '../api'

export const useEncounters = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updatePatientEncounter = async (encounterData: EncounterUpdateRequest) => {
    setLoading(true)
    setError(null)
    
    try {
      const response: EncounterUpdateResponse = await updateEncounter(encounterData)
      return response
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createTestData = async (patientId: number) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await createTestEncounterData(patientId)
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
    updatePatientEncounter,
    createTestData,
    clearError
  }
}