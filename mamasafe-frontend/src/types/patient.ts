export interface Patient {
  id: string
  name: string
  age: number
  gestationalWeek: number
  phoneNumber: string
  location: string
  lastMedCheck: string
  riskLevel: 'safe' | 'caution' | 'high-risk'
  avatar?: string
  patientId: string
}

export interface PatientStats {
  totalPatients: number
  highRisk: number
  dueForCheckup: number
  recentRegistrations: number
}