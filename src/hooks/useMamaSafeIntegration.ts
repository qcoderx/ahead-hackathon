import { useState, useCallback } from 'react'
import { 
  checkMedication, 
  createPatient, 
  searchPatients,
  createAppointment,
  getPatientAppointments,
  updateEncounter,
  logVisit,
  logAudit,
  invitePatient,
  getAnalyticsOverview,
  getHighRiskCases,
  testSms,
  handleApiError,
  MedicationCheckRequest,
  MedicationCheckResponse,
  PatientCreate,
  AppointmentCreate,
  EncounterUpdateRequest,
  VisitLogRequest,
  AuditLogCreate
} from '../api'

interface IntegrationState {
  loading: boolean
  error: string | null
  lastResult: any
}

export const useMamaSafeIntegration = () => {
  const [state, setState] = useState<IntegrationState>({
    loading: false,
    error: null,
    lastResult: null
  })

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }))
  }

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }))
  }

  const setResult = (result: any) => {
    setState(prev => ({ ...prev, lastResult: result }))
  }

  // Comprehensive medication safety check with full workflow
  const performMedicationCheck = useCallback(async (
    request: MedicationCheckRequest,
    providerId?: number
  ): Promise<MedicationCheckResponse | null> => {
    setLoading(true)
    setError(null)
    
    try {
      // 1. Check medication safety
      const result = await checkMedication(request)
      setResult(result)
      
      // 2. Log the visit if patient_id provided
      if (request.patient_id && providerId) {
        const visitData: VisitLogRequest = {
          patient_id: request.patient_id,
          provider_id: providerId,
          drug_checked: request.drug_name,
          risk_result: result.risk_category,
          notes: result.personalized_notes || undefined
        }
        await logVisit(visitData)
      }
      
      // 3. If high risk, log audit trail
      if (result.risk_category === 'CONTRAINDICATED' || (result.risk_score && result.risk_score > 8)) {
        if (request.patient_id) {
          const auditData: AuditLogCreate = {
            patient_id: request.patient_id,
            drug_name: request.drug_name,
            risk_level: result.risk_category,
            override_reason: 'High risk medication detected',
            action: 'HIGH_RISK_DETECTED'
          }
          await logAudit(auditData)
        }
      }
      
      return result
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Complete patient registration workflow
  const registerPatientComplete = useCallback(async (
    patientData: PatientCreate,
    sendSMSInvite: boolean = false
  ) => {
    setLoading(true)
    setError(null)
    
    try {
      // 1. Create patient
      const result = await createPatient(patientData)
      setResult(result)
      
      // 2. Send SMS invite if requested
      if (sendSMSInvite && patientData.phone_number) {
        await invitePatient(result.patient_id.toString(), patientData.phone_number)
      }
      
      // 3. Create initial encounter record
      const encounterData: EncounterUpdateRequest = {
        patient_id: result.patient_id,
        allergies: patientData.allergies || [],
        notes: `Patient registered on ${new Date().toISOString()}`
      }
      await updateEncounter(encounterData)
      
      return result
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Complete appointment scheduling workflow
  const scheduleAppointmentComplete = useCallback(async (
    appointmentData: AppointmentCreate,
    sendSMSReminder: boolean = false
  ) => {
    setLoading(true)
    setError(null)
    
    try {
      // 1. Create appointment
      const result = await createAppointment(appointmentData)
      setResult(result)
      
      // 2. Send SMS reminder if requested
      if (sendSMSReminder) {
        // This would integrate with SMS service
        console.log('SMS reminder would be sent for appointment:', result.id)
      }
      
      return result
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Emergency alert workflow
  const handleEmergencyAlert = useCallback(async (
    patientId: string,
    drugName: string,
    riskLevel: string,
    actionTaken: string
  ) => {
    setLoading(true)
    setError(null)
    
    try {
      // 1. Log the emergency action
      const auditData: AuditLogCreate = {
        patient_id: patientId,
        drug_name: drugName,
        risk_level: riskLevel,
        override_reason: actionTaken,
        action: 'EMERGENCY_ACTION'
      }
      await logAudit(auditData)
      
      // 2. Could trigger SMS alerts, notifications, etc.
      console.log('Emergency alert processed for patient:', patientId)
      
      return true
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // Get comprehensive analytics
  const getComprehensiveAnalytics = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [overview, highRisk] = await Promise.all([
        getAnalyticsOverview(),
        getHighRiskCases()
      ])
      
      const result = {
        overview,
        highRiskCases: highRisk,
        timestamp: new Date().toISOString()
      }
      
      setResult(result)
      return result
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Test system connectivity
  const testSystemConnectivity = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Test SMS service
      await testSms()
      
      // Could test other services here
      console.log('System connectivity test passed')
      return true
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // Patient search with enhanced results
  const searchPatientsEnhanced = useCallback(async (query: string) => {
    if (!query.trim()) return []
    
    setLoading(true)
    setError(null)
    
    try {
      const results = await searchPatients(query)
      setResult(results)
      return results
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const clearState = useCallback(() => {
    setState({
      loading: false,
      error: null,
      lastResult: null
    })
  }, [])

  return {
    // State
    loading: state.loading,
    error: state.error,
    lastResult: state.lastResult,
    
    // Core workflows
    performMedicationCheck,
    registerPatientComplete,
    scheduleAppointmentComplete,
    handleEmergencyAlert,
    getComprehensiveAnalytics,
    searchPatientsEnhanced,
    testSystemConnectivity,
    
    // Utilities
    clearState
  }
}

export default useMamaSafeIntegration