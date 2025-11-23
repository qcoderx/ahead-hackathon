import { useState } from 'react'
import { checkMedication, logVisit, handleApiError, MedicationCheckRequest, MedicationCheckResponse, VisitLogRequest } from '../api'

export const useMedicationCheck = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<MedicationCheckResponse | null>(null)

  const checkDrugSafety = async (data: MedicationCheckRequest) => {
    setLoading(true)
    setError(null)
    
    try {
      const response: MedicationCheckResponse = await checkMedication(data)
      setResult(response)
      
      // Log the visit if patient_id is provided
      if (data.patient_id) {
        const visitData: VisitLogRequest = {
          patient_id: data.patient_id,
          provider_id: 1, // This should come from current user context
          drug_checked: data.drug_name,
          risk_result: response.risk_category,
          notes: response.personalized_notes
        }
        await logVisit(visitData)
      }
      
      return response
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearResult = () => {
    setResult(null)
    setError(null)
  }

  return {
    loading,
    error,
    result,
    checkDrugSafety,
    clearResult
  }
}