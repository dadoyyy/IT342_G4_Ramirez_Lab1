// Lightweight mock API for frontend development without backend/db
// Stores mock users in localStorage under `mock_users` and tokens under `mock_token`

function delay(ms = 250) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem('mock_users') || '[]')
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem('mock_users', JSON.stringify(users))
}

function genToken(user) {
  // simple fake token — not secure, just for UI dev
  return btoa(`${user.user_id}:${user.email}:${Date.now()}`)
}

export const mockAuthService = {
  async register(userData) {
    await delay()
    const users = readUsers()
    if (users.find(u => u.email === userData.email)) {
      const err = { message: 'Email already registered' }
      const e = new Error(err.message)
      e.response = { ok: false, json: async () => err }
      throw e
    }

    const id = (users.length ? Math.max(...users.map(u => u.user_id)) : 0) + 1
    const newUser = {
      user_id: id,
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password // plain text only in mock
    }
    users.push(newUser)
    writeUsers(users)

    const token = genToken(newUser)
    localStorage.setItem('mock_token', token)

    return {
      message: 'User registered successfully',
      user: {
        user_id: newUser.user_id,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        email: newUser.email
      },
      token
    }
  },

  async login(credentials) {
    await delay()
    const users = readUsers()
    const user = users.find(u => u.email === credentials.email)
    if (!user || user.password !== credentials.password) {
      const err = { message: 'Invalid credentials' }
      const e = new Error(err.message)
      e.response = { ok: false, json: async () => err }
      throw e
    }

    const token = genToken(user)
    localStorage.setItem('mock_token', token)

    return {
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      },
      token
    }
  },

  async getProfile(token) {
    await delay()
    const stored = localStorage.getItem('mock_token')
    if (!stored || stored !== token) {
      const err = { message: 'Unauthorized' }
      const e = new Error(err.message)
      e.response = { ok: false, json: async () => err }
      throw e
    }

    // decode token to find email (we encoded email as second part)
    try {
      const decoded = atob(token)
      const parts = decoded.split(':')
      const email = parts[1]
      const users = readUsers()
      const user = users.find(u => u.email === email)
      if (!user) throw new Error('User not found')

      return {
        user: {
          user_id: user.user_id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email
        }
      }
    } catch (err) {
      const e = new Error('Invalid token')
      e.response = { ok: false, json: async () => ({ message: e.message }) }
      throw e
    }
  },

  async logout() {
    await delay()
    localStorage.removeItem('mock_token')
    return { message: 'Logged out successfully' }
  }
}

export default mockAuthService
