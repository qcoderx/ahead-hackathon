import { InteractionAnalysis } from '../types/interactions'

// Generate random analysis results for demo
const getRandomAnalysis = (): InteractionAnalysis => {
  const scenarios = [
    {
      overallRisk: 'low' as const,
      patientName: 'Maria Jensen',
      patientId: 'P-001-789',
      drugName: 'Amoxicillin',
      dosage: '500mg',
      category: 'Antibiotic',
      riskCategory: 'SAFE',
      emoji: '🟢',
      description: 'No significant risks detected for maternal or fetal health.',
      details: {
        risks: ['Minimal gastrointestinal effects', 'Safe during all trimesters'],
        actions: ['Continue as prescribed', 'Monitor for allergic reactions'],
        monitoring: 'Routine follow-up in 24 hours'
      }
    },
    {
      overallRisk: 'moderate' as const,
      patientName: 'Jessica Evans',
      patientId: 'P-789-0123',
      drugName: 'Metformin',
      dosage: '500mg',
      category: 'Antidiabetic',
      riskCategory: 'CAUTION',
      emoji: '🟡',
      description: 'Moderate risk identified. Review required.',
      details: {
        risks: ['May affect blood glucose stability', 'Potential for increased lactic acidosis risk'],
        actions: ['Consult with endocrinologist', 'Consider dosage adjustment'],
        monitoring: 'Frequent blood glucose monitoring (4-6 times daily)'
      }
    },
    {
      overallRisk: 'high' as const,
      patientName: 'Jenna Wallace',
      patientId: 'P-456-789',
      drugName: 'Oxycodone',
      dosage: '10mg',
      category: 'Opioid Analgesic',
      riskCategory: 'HIGH RISK',
      emoji: '🟠',
      description: 'AI analysis indicates significant potential for adverse maternal-fetal outcomes.',
      details: {
        risks: ['Neonatal Abstinence Syndrome (NAS)', 'Respiratory depression in newborn', 'Increased risk of pre-term labor'],
        actions: ['Do not administer medication', 'Consult attending physician immediately', 'Prepare for fetal heart rate monitoring'],
        monitoring: 'Continuous fetal monitoring required'
      }
    },
    {
      overallRisk: 'critical' as const,
      patientName: 'Olivia Chen',
      patientId: 'P-321-654',
      drugName: 'Isotretinoin',
      dosage: '40mg',
      category: 'Retinoid',
      riskCategory: 'CONTRAINDICATED',
      emoji: '🔴',
      description: 'This medication is known to cause severe harm during pregnancy.',
      details: {
        risks: ['Severe birth defects (teratogenic)', 'Increased risk of miscarriage', 'Severe maternal psychiatric effects'],
        actions: ['DO NOT PRESCRIBE OR ADMINISTER', 'Review patient medication history immediately'],
        monitoring: 'Immediate specialist consultation required'
      }
    }
  ]
  
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
  
  return {
    patientId: scenario.patientId,
    analysisDate: new Date().toISOString(),
    overallRisk: scenario.overallRisk,
    patientName: scenario.patientName,
    drugName: scenario.drugName,
    dosage: scenario.dosage,
    category: scenario.category,
    riskCategory: scenario.riskCategory,
    emoji: scenario.emoji,
    description: scenario.description,
    details: scenario.details,
    drugs: [
      {
        id: '1',
        name: scenario.drugName,
        dosage: scenario.dosage,
        type: 'primary'
      }
    ],
    interactions: []
  }
}

export const mockInteractionAnalysis = getRandomAnalysis()