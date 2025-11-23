import { useState, useEffect } from 'react'
import { login, register, patientLogin, setAuthToken, clearAuthToken, handleApiError, Token, UserCreate, PatientLogin } from '../api'

interface User {
  id: string
  email: string
  full_name?: string
  role: string
  is_active: boolean
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('mamasafe_token')
    if (token) {
      setAuthToken(token)
      setIsAuthenticated(true)
      // You might want to validate the token with the backend here
    }
  }, [])

  const loginUser = async (username: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response: Token = await login(username, password)
      const { access_token } = response
      
      setAuthToken(access_token)
      localStorage.setItem('mamasafe_token', access_token)
      setIsAuthenticated(true)
      
      // Set user data (you might need to fetch user profile separately)
      setUser({
        id: '1',
        email: username,
        role: 'provider',
        is_active: true
      })
      
      return response
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const registerUser = async (userData: UserCreate) => {
    setLoading(true)
    setError(null)
    
    try {
      const response: Token = await register(userData)
      const { access_token } = response
      
      setAuthToken(access_token)
      localStorage.setItem('mamasafe_token', access_token)
      setIsAuthenticated(true)
      
      setUser({
        id: '1',
        email: userData.email,
        full_name: userData.full_name,
        role: userData.role || 'provider',
        is_active: userData.is_active || true
      })
      
      return response
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const loginPatient = async (patientId: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const loginData: PatientLogin = { patient_id: patientId }
      const response: Token = await patientLogin(patientId)
      const { access_token } = response
      
      setAuthToken(access_token)
      localStorage.setItem('mamasafe_token', access_token)
      setIsAuthenticated(true)
      
      setUser({
        id: patientId,
        email: '',
        role: 'patient',
        is_active: true
      })
      
      return response
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearAuthToken()
    localStorage.removeItem('mamasafe_token')
    setUser(null)
    setIsAuthenticated(false)
    setError(null)
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    loginUser,
    registerUser,
    loginPatient,
    logout
  }
}