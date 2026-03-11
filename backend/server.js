import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', app: 'mini-app' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MiniApp Backend API running on http://localhost:${PORT}`)
  console.log(`📡 Status endpoint: http://localhost:${PORT}/api/status`)
})
