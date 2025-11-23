import React, { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'

interface AuthContextType {
  user: any
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  loginUser: (username: string, password: string) => Promise<any>
  registerUser: (userData: { email: string; password: string; full_name?: string }) => Promise<any>
  loginPatient: (patientId: string) => Promise<any>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}