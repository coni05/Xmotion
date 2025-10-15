const { createConnection } = require('../config/database');

class Product {
  static async create(productData) {
    const connection = await createConnection();
    const { name, price, stock, image } = productData;
    
    const [result] = await connection.execute(
      'INSERT INTO products (name, price, stock, image) VALUES (?, ?, ?, ?)',
      [name, price, stock, image]
    );
    
    await connection.end();
    return result.insertId;
  }

  static async findAll() {
    const connection = await createConnection();
    
    const [rows] = await connection.execute(
      'SELECT * FROM products ORDER BY id DESC'
    );
    
    await connection.end();
    return rows;
  }

  static async findById(id) {
    const connection = await createConnection();
    
    const [rows] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    
    await connection.end();
    return rows[0];
  }

  static async update(id, productData) {
    const connection = await createConnection();
    const { name, price, stock, image } = productData;
    
    const [result] = await connection.execute(
      'UPDATE products SET name = ?, price = ?, stock = ?, image = ? WHERE id = ?',
      [name, price, stock, image, id]
    );
    
    await connection.end();
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const connection = await createConnection();
    
    const [result] = await connection.execute(
      'DELETE FROM products WHERE id = ?',
      [id]
    );
    
    await connection.end();
    return result.affectedRows > 0;
  }
}

module.exports = Product;