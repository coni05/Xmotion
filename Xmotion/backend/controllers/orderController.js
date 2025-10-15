const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { user_id, total, items } = req.body;
    
    console.log('📦 Creando orden:', { user_id, total, items });
    
    // Validar que hay suficiente stock antes de crear la orden
    const Product = require('../models/Product');
    for (const item of items) {
      const product = await Product.findById(item.product_id);
      console.log(`📊 Producto ${item.product_id}: Stock actual ${product?.stock}, Solicitado: ${item.quantity}`);
      
      if (!product) {
        return res.status(400).json({ 
          message: `Producto no encontrado: ${item.product_id}` 
        });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Stock insuficiente para ${product.name}. Disponible: ${product.stock}, Solicitado: ${item.quantity}` 
        });
      }
    }
    
    const orderId = await Order.create({ user_id, total, items });
    
    console.log('✅ Orden creada exitosamente:', orderId);
    
    res.status(201).json({
      message: 'Orden creada exitosamente',
      orderId
    });
  } catch (error) {
    console.error('❌ Error creando orden:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getTotalSales = async (req, res) => {
  try {
    const totalSales = await Order.getTotalSales();
    
    res.json({ totalSales });
  } catch (error) {
    console.error('Error obteniendo total de ventas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  createOrder,
  getTotalSales
};