import { useState } from 'react'
import { getAnalyticsOverview, getHighRiskCases, handleApiError } from '../api'

export const useAnalytics = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [overview, setOverview] = useState<any>(null)
  const [highRiskCases, setHighRiskCases] = useState<any[]>([])

  const fetchAnalyticsOverview = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await getAnalyticsOverview()
      setOverview(response)
      return response
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchHighRiskCases = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await getHighRiskCases()
      setHighRiskCases(response)
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
    overview,
    highRiskCases,
    fetchAnalyticsOverview,
    fetchHighRiskCases,
    clearError
  }
}