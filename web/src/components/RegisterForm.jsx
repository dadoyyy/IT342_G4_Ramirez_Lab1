import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterForm() {
  const navigate = useNavigate()
  const { register, error, loading } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    
    const result = await register(formData)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setFormError(result.error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {(formError || error) && (
        <div style={{ 
          padding: '0.75rem', 
          background: '#fee2e2', 
          color: '#dc2626', 
          borderRadius: '8px',
          fontSize: '0.875rem'
        }}>
          {formError || error}
        </div>
      )}
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Jordan"
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Ramirez"
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@medigo.dev"
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          disabled={loading}
        />
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Creating account...' : 'Register'}
      </button>
    </form>
  )
}
