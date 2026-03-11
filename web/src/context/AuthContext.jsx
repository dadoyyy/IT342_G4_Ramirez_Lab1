import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage to prevent redirect on refresh
  const storedToken = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')
  
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null)
  const [token, setToken] = useState(storedToken)
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken && !!storedUser)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (credentials) => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await authService.login(credentials)
      
      setUser(data.user)
      setToken(data.token)
      setIsAuthenticated(true)
      
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await authService.register(userData)
      
      setUser(data.user)
      setToken(data.token)
      setIsAuthenticated(true)
      
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      if (token) {
        await authService.logout(token)
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setUser(null)
      setToken(null)
      setIsAuthenticated(false)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      isAuthenticated, 
      login, 
      register, 
      logout,
      error,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}
