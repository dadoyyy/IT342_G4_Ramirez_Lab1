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
          <h2>MiniApp</h2>
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
              <h3>Account Status</h3>
              <p className="stat-value">Active</p>
              <p className="stat-label">All systems operational</p>
            </div>
            <div className="stat-card stat-info">
              <h3>User ID</h3>
              <p className="stat-value">#{user?.user_id || Math.floor(Math.random() * 10000)}</p>
              <p className="stat-label">Your unique identifier</p>
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
              <h2>Quick Actions</h2>
              <div className="quick-actions">
                <button className="action-btn" onClick={() => alert('Profile view coming soon')}>
                  <span className="action-icon">👤</span>
                  <span>View Full Profile</span>
                </button>
                <button className="action-btn" onClick={handleLogout}>
                  <span className="action-icon">🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
