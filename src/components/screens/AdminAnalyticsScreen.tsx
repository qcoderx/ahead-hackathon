import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Users, AlertTriangle, Activity, Download, RefreshCw } from 'lucide-react'
import { useAnalytics } from '../../hooks/useAnalytics'
import { useTranslation } from '../../contexts/TranslationContext'
import Card from '../ui/Card'
import Button from '../ui/Button'

interface AdminAnalyticsScreenProps {
  onBack: () => void
}

const AdminAnalyticsScreen: React.FC<AdminAnalyticsScreenProps> = ({ onBack }) => {
  const { t } = useTranslation()
  const { loading, error, overview, highRiskCases, fetchAnalyticsOverview, fetchHighRiskCases } = useAnalytics()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      await Promise.all([
        fetchAnalyticsOverview(),
        fetchHighRiskCases()
      ])
    } catch (err) {
      console.error('Failed to load analytics:', err)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadAnalytics()
    setRefreshing(false)
  }

  const mockOverview = {
    totalChecks: 1247,
    safeResults: 856,
    cautionResults: 298,
    dangerousResults: 93,
    activeProviders: 45,
    totalPatients: 892,
    systemUptime: 99.9
  }

  const mockHighRisk = [
    { id: 1, patientName: 'Fatima Ibrahim', drug: 'Ibuprofen', riskLevel: 'Critical', gestationalWeek: 32, provider: 'Dr. Amina' },
    { id: 2, patientName: 'Aisha Mohammed', drug: 'Aspirin', riskLevel: 'High', gestationalWeek: 28, provider: 'Nurse Sarah' },
    { id: 3, patientName: 'Zainab Yusuf', drug: 'Warfarin', riskLevel: 'Critical', gestationalWeek: 24, provider: 'Dr. Kano' }
  ]

  const data = overview || mockOverview
  const risks = highRiskCases.length > 0 ? highRiskCases : mockHighRisk

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm border-b border-gray-200 px-4 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRefresh}
            loading={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </motion.header>

      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Checks</p>
                  <p className="text-2xl font-bold text-gray-900">{data.totalChecks?.toLocaleString() || '1,247'}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Providers</p>
                  <p className="text-2xl font-bold text-gray-900">{data.activeProviders || 45}</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{data.totalPatients?.toLocaleString() || '892'}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Uptime</p>
                  <p className="text-2xl font-bold text-gray-900">{data.systemUptime || 99.9}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-500" />
              </div>
            </Card>
          </div>
        </motion.section>

        {/* Safety Results */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Safety Analysis Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Safe Results</p>
                  <p className="text-xl font-bold text-green-600">{data.safeResults || 856}</p>
                  <p className="text-xs text-gray-500">68.6% of total</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Caution Required</p>
                  <p className="text-xl font-bold text-yellow-600">{data.cautionResults || 298}</p>
                  <p className="text-xs text-gray-500">23.9% of total</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Dangerous/Contraindicated</p>
                  <p className="text-xl font-bold text-red-600">{data.dangerousResults || 93}</p>
                  <p className="text-xs text-gray-500">7.5% of total</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.section>

        {/* High Risk Cases */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">High Risk Cases</h2>
            <Button variant="secondary" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
          
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Drug</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gest. Week</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {risks.map((case_item, index) => (
                    <motion.tr
                      key={case_item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {case_item.patientName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {case_item.drug}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          case_item.riskLevel === 'Critical' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {case_item.riskLevel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {case_item.gestationalWeek}w
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {case_item.provider}
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <AlertTriangle className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.section>

        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-medium">Error loading analytics:</p>
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminAnalyticsScreen