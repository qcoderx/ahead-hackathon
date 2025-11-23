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
    setLoading(true)
    setError(null)
    
    try {
      const response = await getAnalyticsOverview()
      
      // Map API response to DashboardStats
      // Assuming response has keys like total_patients, etc.
      // If API returns different structure, we map it here.
      // For now, we'll map what we can and default the rest.
      
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
      console.error('Failed to fetch dashboard stats:', err)
      setError('Failed to load dashboard statistics')
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
