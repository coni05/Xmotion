const { createConnection } = require('../config/database');

class Order {
  static async create(orderData) {
    const connection = await createConnection();
    const { user_id, total, items } = orderData;
    
    try {
      await connection.beginTransaction();
      
      // Crear la orden
      const [orderResult] = await connection.execute(
        'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
        [user_id, total, 'completed']
      );
      
      const orderId = orderResult.insertId;
      
      // Insertar items de la orden y reducir stock
      for (const item of items) {
        await connection.execute(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.price]
        );
        
        // Reducir stock del producto
        const [updateResult] = await connection.execute(
          'UPDATE products SET stock = GREATEST(0, stock - ?) WHERE id = ?',
          [item.quantity, item.product_id]
        );
        
        console.log(`Stock actualizado para producto ${item.product_id}: -${item.quantity} unidades`);
      }
      
      await connection.commit();
      await connection.end();
      
      return orderId;
    } catch (error) {
      await connection.rollback();
      await connection.end();
      throw error;
    }
  }

  static async getTotalSales() {
    const connection = await createConnection();
    
    const [rows] = await connection.execute(
      'SELECT COALESCE(SUM(total), 0) as total_sales FROM orders WHERE status = "completed"'
    );
    
    await connection.end();
    return rows[0].total_sales;
  }
}

module.exports = Order;