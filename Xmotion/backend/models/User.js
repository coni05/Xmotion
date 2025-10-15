const { createConnection } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const connection = await createConnection();
    const { name, email, password, role = 'user' } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    
    await connection.end();
    return result.insertId;
  }

  static async findByEmail(email) {
    const connection = await createConnection();
    
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    await connection.end();
    return rows[0];
  }

  static async findById(id) {
    const connection = await createConnection();
    
    const [rows] = await connection.execute(
      'SELECT id, name, email, role FROM users WHERE id = ?',
      [id]
    );
    
    await connection.end();
    return rows[0];
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;