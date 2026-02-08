import mockAuthService from './mockApi'

const API_URL = 'http://localhost:3001/api/auth'

const realAuthService = {
  async register(userData) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    return data
  },

  async login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    return data
  },

  async getProfile(token) {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile')
    }

    return data
  },

  async logout(token) {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Logout failed')
    }

    return data
  }
}

// Switch to mock when Vite env var VITE_USE_MOCK=true
const USE_MOCK = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_USE_MOCK === 'true'

export const authService = USE_MOCK ? mockAuthService : realAuthService

export default authService
