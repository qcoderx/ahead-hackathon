import { useState, useEffect } from 'react'
import { getAnalyticsOverview, handleApiError } from '../api'
import { DashboardStats } from '../types/dashboard'

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    activePatients: 0,
    activeChange: 0,
    upcoming: 0,
    upcomingChange: 0,
    labResults: 0,
    labChange: 0,
    discharges: 0,
    dischargeChange: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    // Check if user is authenticated before making API calls
    const token = localStorage.getItem('mamasafe_token')
    if (!token) {
      console.log('No auth token found, skipping dashboard stats fetch')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const response = await getAnalyticsOverview()
      
      // Map API response to DashboardStats
      setStats({
        activePatients: response.total_patients || 0,
        activeChange: response.patient_growth_rate || 0,
        upcoming: response.upcoming_appointments || 0,
        upcomingChange: 0, // Not provided by API yet
        labResults: response.pending_lab_results || 0,
        labChange: 0,
        discharges: response.recent_discharges || 0,
        dischargeChange: 0
      })
    } catch (err) {
      const apiError = handleApiError(err)
      console.error('Failed to fetch dashboard stats:', apiError)
      
      // Don't show error for 401 - user just needs to login
      if (apiError.status !== 401) {
        setError('Failed to load dashboard statistics')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    stats,
    loading,
    error,
    refreshStats: fetchStats
  }
}
