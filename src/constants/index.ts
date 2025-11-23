import { NavigationItem, User, Drug, DrugInteraction } from '@/types'

/**
 * Application constants and mock data
 */

export const MOCK_USER: User = {
  id: '1',
  name: 'Dr. Emily Carter',
  title: 'Rural Health Clinic',
  clinic: 'Rural Health Clinic',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoIpe9S3CpxBPE-pisFxqvi7QWLhkcMdUliRlZomuqc9ttBVM-AAoPmGq11HIDgzgtBdp6JyqUzA9brV_2JTRJs1j3dm0Kvhw4wyeRNsAlAfH-JfxKFQrNbI6ehHVMcx4CdD5NpEErG_3rLRRu6bVofDryuH6M72MpZwvOno5Ou2ek9HTm2g3tXM-ixUyUuvcei2BVjVp1726llo8s1Lr30vDOmdkl2bAcLBFQSsXgogegYLecjvu0YWNOUWsYpP1cdzq8AyaQwLg'
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
  { id: 'patients', label: 'Patients', icon: 'Users', href: '/patients' },
  { id: 'drug-analysis', label: 'Drug Analysis', icon: 'FlaskConical', href: '/drug-analysis', isActive: true },
  { id: 'reports', label: 'Reports', icon: 'FileText', href: '/reports' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/settings' },
]

export const MOCK_DRUGS: Drug[] = [
  { id: '1', name: 'Lisinopril 10mg', dosage: '10mg', genericName: 'Lisinopril' },
  { id: '2', name: 'Metformin 500mg', dosage: '500mg', genericName: 'Metformin HCl' },
  { id: '3', name: 'Ibuprofen 200mg', dosage: '200mg', genericName: 'Ibuprofen' },
]

export const MOCK_INTERACTIONS: DrugInteraction[] = [
  {
    id: '1',
    drug1: MOCK_DRUGS[0],
    drug2: MOCK_DRUGS[2],
    severity: 'major',
    description: 'Major interaction between Lisinopril and Ibuprofen',
    clinicalImpact: 'Concomitant use may result in renal function deterioration, including possible acute renal failure. This is especially true in patients who are volume-depleted or elderly.',
    recommendations: [
      'Avoid concurrent use if possible.',
      'If necessary, monitor renal function closely.',
      'Advise patient on signs of renal impairment.'
    ],
    isExpanded: true
  },
  {
    id: '2',
    drug1: MOCK_DRUGS[1],
    drug2: MOCK_DRUGS[2],
    severity: 'moderate',
    description: 'Moderate interaction between Metformin and Ibuprofen',
    clinicalImpact: 'NSAIDs may reduce the hypoglycemic effect of metformin and increase risk of lactic acidosis.',
    recommendations: [
      'Monitor blood glucose levels closely.',
      'Consider alternative pain management.',
      'Watch for signs of lactic acidosis.'
    ],
    isExpanded: false
  }
]

export const SEVERITY_CONFIG = {
  critical: {
    color: 'mama-critical',
    bgColor: 'mama-critical/10',
    borderColor: 'mama-critical',
    label: 'CRITICAL'
  },
  major: {
    color: 'mama-critical',
    bgColor: 'mama-critical/10',
    borderColor: 'mama-critical',
    label: 'MAJOR'
  },
  moderate: {
    color: 'mama-moderate',
    bgColor: 'mama-moderate/10',
    borderColor: 'mama-moderate',
    label: 'MODERATE'
  },
  minor: {
    color: 'mama-minor',
    bgColor: 'mama-minor/10',
    borderColor: 'mama-minor',
    label: 'MINOR'
  },
  safe: {
    color: 'mama-safe',
    bgColor: 'mama-safe/10',
    borderColor: 'mama-safe',
    label: 'SAFE'
  }
} as const