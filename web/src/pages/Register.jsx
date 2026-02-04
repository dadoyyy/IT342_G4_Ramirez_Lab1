import { Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

export default function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        <p>Create your MediGo account</p>
        <RegisterForm />
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
