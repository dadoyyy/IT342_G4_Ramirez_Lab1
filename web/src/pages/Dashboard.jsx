import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>MediGo</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">📊</span>
            Dashboard
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">👤</span>
            Profile
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙️</span>
            Settings
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📈</span>
            Analytics
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📧</span>
            Messages
          </a>
        </nav>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p className="header-subtitle">Welcome back, {user?.firstName}!</p>
          </div>
          <div className="header-right">
            <div className="user-menu">
              <div className="user-avatar">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <div className="user-info">
                <p className="user-name">{user?.firstName} {user?.lastName}</p>
                <p className="user-email">{user?.email}</p>
              </div>
              <button onClick={handleLogout} className="btn-logout-header">
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <div className="stats-grid">
            <div className="stat-card stat-primary">
              <h3>Total Sessions</h3>
              <p className="stat-value">24</p>
              <p className="stat-label">Active this month</p>
            </div>
            <div className="stat-card stat-success">
              <h3>Account Status</h3>
              <p className="stat-value">Active</p>
              <p className="stat-label">Since registration</p>
            </div>
            <div className="stat-card stat-info">
              <h3>Last Login</h3>
              <p className="stat-value">Today</p>
              <p className="stat-label">5:30 PM</p>
            </div>
            <div className="stat-card stat-warning">
              <h3>Security</h3>
              <p className="stat-value">100%</p>
              <p className="stat-label">All checks passed</p>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="profile-info">
              <h2>Profile Information</h2>
              <div className="info-row">
                <span className="label">Name:</span>
                <span className="value">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{user?.email}</span>
              </div>
              <div className="info-row">
                <span className="label">User ID:</span>
                <span className="value">#USR-{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="info-row">
                <span className="label">Status:</span>
                <span className="value status-active">Active</span>
              </div>
            </div>

            <div className="activity-card">
              <h2>Recent Activity</h2>
              <ul className="activity-list">
                <li className="activity-item">
                  <div className="activity-icon">📝</div>
                  <div className="activity-content">
                    <p className="activity-title">Profile Updated</p>
                    <p className="activity-time">2 hours ago</p>
                  </div>
                </li>
                <li className="activity-item">
                  <div className="activity-icon">🔐</div>
                  <div className="activity-content">
                    <p className="activity-title">Password Changed</p>
                    <p className="activity-time">1 day ago</p>
                  </div>
                </li>
                <li className="activity-item">
                  <div className="activity-icon">✅</div>
                  <div className="activity-content">
                    <p className="activity-title">Account Verified</p>
                    <p className="activity-time">3 days ago</p>
                  </div>
                </li>
                <li className="activity-item">
                  <div className="activity-icon">🎯</div>
                  <div className="activity-content">
                    <p className="activity-title">Account Created</p>
                    <p className="activity-time">1 week ago</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
