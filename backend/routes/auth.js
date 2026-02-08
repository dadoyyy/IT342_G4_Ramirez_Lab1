import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/User.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    console.log('Register request received:', req.body)
    const { firstName, lastName, email, password } = req.body

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      console.log('Validation failed - missing fields')
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email)
    if (existingUser) {
      console.log('Email already exists:', email)
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    console.log('User created successfully:', user.user_id)

    // Generate token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        ...userWithoutPassword,
        firstName: user.first_name,
        lastName: user.last_name
      },
      token
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Find user
    const user = UserModel.findByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Update last login
    UserModel.updateLastLogin(user.user_id)

    // Generate token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user
    res.json({
      message: 'Login successful',
      user: {
        ...userWithoutPassword,
        firstName: user.first_name,
        lastName: user.last_name
      },
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Get profile endpoint (protected)
router.get('/profile', authMiddleware, (req, res) => {
  try {
    const user = UserModel.findById(req.userId)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const { password: _, ...userWithoutPassword } = user
    res.json({
      user: {
        ...userWithoutPassword,
        firstName: user.first_name,
        lastName: user.last_name
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Logout endpoint
router.post('/logout', authMiddleware, (req, res) => {
  // In a real app, you might invalidate the token here
  // For now, we'll just send a success response
  res.json({ message: 'Logged out successfully' })
})

export default router
