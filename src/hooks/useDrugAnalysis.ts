import { useState, useCallback } from 'react'
import { Drug, DrugInteraction, AnalysisResult } from '@/types'
import { checkMedication, handleApiError } from '../api'

/**
 * Custom hook for managing drug analysis state and operations
 * Handles drug list, interactions, and analysis logic
 */
export const useDrugAnalysis = () => {
  const [drugs, setDrugs] = useState<Drug[]>([])
  const [interactions, setInteractions] = useState<DrugInteraction[]>([])
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addDrug = useCallback((drug: Drug) => {
    setDrugs(prev => {
      // Check if drug already exists
      const exists = prev.some(d => 
        d.name.toLowerCase() === drug.name.toLowerCase()
      )
      if (exists) return prev
      
      return [...prev, drug]
    })
  }, [])

  const removeDrug = useCallback((drugId: string) => {
    setDrugs(prev => prev.filter(drug => drug.id !== drugId))
    // Clear analysis if drugs change
    setInteractions([])
    setAnalysisResult(null)
  }, [])

  const toggleInteraction = useCallback((interactionId: string) => {
    setInteractions(prev => 
      prev.map(interaction => 
        interaction.id === interactionId
          ? { ...interaction, isExpanded: !interaction.isExpanded }
          : interaction
      )
    )
  }, [])

  const analyzeInteractions = useCallback(async (patientId?: string) => {
    if (drugs.length === 0) return

    setIsAnalyzing(true)
    setError(null)
    
    try {
      const primaryDrug = drugs[0]
      const additionalDrugs = drugs.slice(1).map(d => d.name)
      
      const response = await checkMedication({
        drug_name: primaryDrug.name,
        additional_drugs: additionalDrugs,
        patient_id: patientId,
        language: 'en'
      })

      // Transform API response to frontend format
      const mockInteractions: DrugInteraction[] = []
      
      // Create interaction based on API response
      if (!response.is_safe) {
        const interaction: DrugInteraction = {
          id: '1',
          drug1: { id: '1', name: response.drug_name, dosage: '' },
          drug2: { id: '2', name: additionalDrugs[0] || 'Unknown', dosage: '' },
          severity: response.risk_category.toLowerCase() as any,
          description: response.message,
          clinicalImpact: response.personalized_notes || response.message,
          recommendations: response.alternative_drug ? [`Consider ${response.alternative_drug} as alternative`] : [],
          isExpanded: true
        }
        mockInteractions.push(interaction)
      }

      // Calculate analysis result
      const severityCounts = {
        critical: 0,
        major: 0,
        moderate: 0,
        minor: 0
      }
      
      mockInteractions.forEach(interaction => {
        if (interaction.severity in severityCounts) {
          severityCounts[interaction.severity as keyof typeof severityCounts]++
        }
      })

      const result: AnalysisResult = {
        interactions: mockInteractions,
        totalInteractions: mockInteractions.length,
        criticalCount: severityCounts.critical,
        majorCount: severityCounts.major,
        moderateCount: severityCounts.moderate,
        minorCount: severityCounts.minor,
      }

      setInteractions(mockInteractions)
      setAnalysisResult(result)
      
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      console.error('Analysis failed:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }, [drugs])

  const clearAnalysis = useCallback(() => {
    setDrugs([])
    setInteractions([])
    setAnalysisResult(null)
    setError(null)
  }, [])

  return {
    drugs,
    interactions,
    analysisResult,
    isAnalyzing,
    error,
    addDrug,
    removeDrug,
    toggleInteraction,
    analyzeInteractions,
    clearAnalysis
  }
}