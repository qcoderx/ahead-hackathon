export interface DashboardStats {
  activePatients: number
  activeChange: number
  upcoming: number
  upcomingChange: number
  labResults: number
  labChange: number
  discharges: number
  dischargeChange: number
}

export interface Patient {
  id: string
  name: string
  room: string
  status: 'stable' | 'needs-attention' | 'critical'
  avatar: string
}

export interface QuickCheckData {
  patientId: string
  medication: string
}