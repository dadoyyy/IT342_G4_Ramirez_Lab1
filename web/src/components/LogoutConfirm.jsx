export default function LogoutConfirm({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">🚪</span>
          <h3>Confirm Logout</h3>
        </div>
        <p className="modal-message">
          Are you sure you want to log out? You will need to sign in again to access your account.
        </p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-confirm-logout" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
