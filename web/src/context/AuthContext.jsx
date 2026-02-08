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
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const useMock = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_USE_MOCK === 'true'

    // If mock mode is enabled, restore session from localStorage for convenience.
    // If mock mode is disabled (we require backend), clear stored session to force real auth.
    if (useMock) {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      }
    } else {
      // Ensure no leftover mock session remains when real backend is required
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)
    }
  }, [])

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
