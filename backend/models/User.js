import db from '../config/database.js'

export const UserModel = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    return rows[0]
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id])
    return rows[0]
  },

  async create(userData) {
    const [result] = await db.query(
      'INSERT INTO users (first_name, last_name, email, password, status) VALUES (?, ?, ?, ?, ?)',
      [userData.firstName, userData.lastName, userData.email, userData.password, 'active']
    )
    
    const [newUser] = await db.query('SELECT * FROM users WHERE user_id = ?', [result.insertId])
    return newUser[0]
  },

  async updateLastLogin(userId) {
    await db.query('UPDATE users SET updated_at = NOW() WHERE user_id = ?', [userId])
    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId])
    return rows[0]
  },

  async getAllUsers() {
    const [rows] = await db.query('SELECT * FROM users')
    return rows
  }
}
