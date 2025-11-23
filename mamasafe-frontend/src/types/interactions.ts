export interface Drug {
  id: string
  name: string
  dosage?: string
  type: 'primary' | 'additional'
}

export interface Interaction {
  id: string
  severity: 'minor' | 'moderate' | 'major' | 'critical'
  title: string
  description: string
  risk: string
  recommendation: string
  action: string
  drugs: string[]
}

export interface InteractionAnalysis {
  patientId: string
  patientName?: string
  drugName?: string
  dosage?: string
  category?: string
  riskCategory?: string
  emoji?: string
  description?: string
  details?: {
    risks: string[]
    actions: string[]
    monitoring: string
  }
  drugs: Drug[]
  interactions: Interaction[]
  analysisDate: string
  overallRisk: 'low' | 'moderate' | 'high' | 'critical'
}