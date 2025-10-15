const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, image } = req.body;
    
    const productId = await Product.create({ name, price, stock, image });
    const product = await Product.findById(productId);
    
    res.status(201).json({
      message: 'Producto creado exitosamente',
      product
    });
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, image } = req.body;
    
    const updated = await Product.update(id, { name, price, stock, image });
    
    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    const product = await Product.findById(id);
    res.json({
      message: 'Producto actualizado exitosamente',
      product
    });
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await Product.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};