import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import LogoutConfirm from '../components/LogoutConfirm'

export default function Profile() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const confirmLogout = () => {
    setShowLogoutModal(false)
    handleLogout()
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>MiniApp</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#" onClick={() => navigate('/dashboard')} className="nav-item">
            <span className="nav-icon">📊</span>
            Dashboard
          </a>
          <a href="#" className="nav-item active">
            <span className="nav-icon">👤</span>
            Profile
          </a>
        </nav>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <div className="header-left">
            <h1>Profile</h1>
            <p className="header-subtitle">Manage your account information</p>
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
              <button onClick={() => setShowLogoutModal(true)} className="btn-logout-header">
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <div className="profile-container">
            <div className="profile-card">
              <div className="profile-avatar-section">
                <div className="profile-avatar-large">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <h2>{user?.firstName} {user?.lastName}</h2>
                <p className="profile-email">{user?.email}</p>
                <span className="profile-badge">Active Member</span>
              </div>

              <div className="profile-details">
                <h3>Personal Information</h3>
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <span className="profile-label">First Name</span>
                    <span className="profile-value">{user?.firstName}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-label">Last Name</span>
                    <span className="profile-value">{user?.lastName}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-label">Email Address</span>
                    <span className="profile-value">{user?.email}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-label">Account Status</span>
                    <span className="profile-value status-active">Active</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-label">User ID</span>
                    <span className="profile-value">#{user?.userId || 'N/A'}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-label">Member Since</span>
                    <span className="profile-value">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LogoutConfirm 
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  )
}
