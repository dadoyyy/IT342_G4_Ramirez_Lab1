import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        <p>Welcome back to MiniApp</p>
        <LoginForm />
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
