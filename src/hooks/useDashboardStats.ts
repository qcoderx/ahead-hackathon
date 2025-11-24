import { useState, useEffect } from 'react'
import { getAnalyticsOverview, getHighRiskCases } from '../api'

interface DashboardStats {
  activePatients: number
  activeChange: string
  upcoming: number
  upcomingChange: string
  labResults: number
  labChange: string
  discharges: number
  dischargeChange: string
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [analyticsData, highRiskData] = await Promise.all([
        getAnalyticsOverview(),
        getHighRiskCases()
      ])

      // Map API response to dashboard stats format
      const dashboardStats: DashboardStats = {
        activePatients: analyticsData.total_patients || 0,
        activeChange: analyticsData.patient_change || '+0%',
        upcoming: analyticsData.upcoming_appointments || 0,
        upcomingChange: analyticsData.appointment_change || '+0%',
        labResults: analyticsData.pending_lab_results || 0,
        labChange: analyticsData.lab_change || '+0%',
        discharges: analyticsData.recent_discharges || 0,
        dischargeChange: analyticsData.discharge_change || '+0%'
      }

      setStats(dashboardStats)
    } catch (err: any) {
      console.error('Failed to fetch dashboard stats:', err)
      setError(err.message || 'Failed to load dashboard statistics')
      
      // Fallback to default stats on error
      setStats({
        activePatients: 0,
        activeChange: '+0%',
        upcoming: 0,
        upcomingChange: '+0%',
        labResults: 0,
        labChange: '+0%',
        discharges: 0,
        dischargeChange: '+0%'
      })
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => {
    fetchDashboardStats()
  }

  return {
    stats,
    loading,
    error,
    refresh
  }
}
