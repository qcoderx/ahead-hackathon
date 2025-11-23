import { Patient, PatientStats } from '../types/patient'

export const mockPatients: Patient[] = [
  {
    id: '1',
    patientId: '98765',
    name: 'Amina Yusuf',
    age: 28,
    gestationalWeek: 32,
    phoneNumber: '+234 801 234 5678',
    location: 'Kano, Nigeria',
    lastMedCheck: '2024-07-28',
    riskLevel: 'high-risk',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFSEU0Iywx3TZkgYpVigRZ8Z6NDk0NfVo68GoKetPMRVRnsIknQOQx0kdp_a4sErd3uqIjSpeYyNHS0ywV9JysHVKuf8Py0ztEjwvuGQWz07qmJ5lhnb-YhI8LBcpYgmJwgJKeQQlt9jLnAeNB6U-39xl3w40R-V1UrkFbNNdNMd5bvELEXtRrMldA5g6rdONLAbwEsZEE5A_Bxa8cynVRrPOdf7unAOccF9zmLExp_TT5DJ67jLbdoShwir4_-JeWLhRQTdoh-W3Z'
  },
  {
    id: '2',
    patientId: '98766',
    name: 'Fatima Bello',
    age: 24,
    gestationalWeek: 18,
    phoneNumber: '+234 802 345 6789',
    location: 'Lagos, Nigeria',
    lastMedCheck: '2024-08-15',
    riskLevel: 'safe',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-t4dPFOD1_BW6Yyj0D-xziJGDWntboYhsdabiGCNIxIoRuqjv8mZQGZ-5IRvbz2z18oSG6BvP9oWVetTE4THb2AblAODE9JONDfytuWxpjP7u4nFvgh_Vu4oa5SGnlZ5tB6nuugs4BY55iMSWu47Dwb5wjsooM_daQj-tCgBPCqCKuZ_lyGA-XbTbW7INSJWfB6sQ_RRcd9ICmIIfWXB-FF_CYiOhUNkuzKpetALfMy_SJNy7_ElJVEgUo_e0FY5hhKhuuh8Q2WZ-'
  },
  {
    id: '3',
    patientId: '98767',
    name: 'Chidinma Okafor',
    age: 31,
    gestationalWeek: 25,
    phoneNumber: '+234 803 456 7890',
    location: 'Enugu, Nigeria',
    lastMedCheck: '2024-08-05',
    riskLevel: 'caution'
  },
  {
    id: '4',
    patientId: '98768',
    name: 'Hauwa Abdullahi',
    age: 26,
    gestationalWeek: 22,
    phoneNumber: '+234 804 567 8901',
    location: 'Sokoto, Nigeria',
    lastMedCheck: '2024-08-10',
    riskLevel: 'safe'
  },
  {
    id: '5',
    patientId: '98769',
    name: 'Blessing Okoro',
    age: 29,
    gestationalWeek: 28,
    phoneNumber: '+234 805 678 9012',
    location: 'Port Harcourt, Nigeria',
    lastMedCheck: '2024-07-30',
    riskLevel: 'caution'
  }
]

export const mockPatientStats: PatientStats = {
  totalPatients: 124,
  highRisk: 18,
  dueForCheckup: 32,
  recentRegistrations: 5
}