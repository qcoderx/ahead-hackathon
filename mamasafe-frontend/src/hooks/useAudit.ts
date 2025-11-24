import { useState } from 'react'
import { logAudit, handleApiError, AuditLogCreate } from '../api'

export const useAudit = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const logOverride = async (auditData: AuditLogCreate) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await logAudit(auditData)
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
    logOverride,
    clearError
  }
}