import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ApiService from '../services/api';

function Dashboard() {
  const { state, createProduct, updateProduct, deleteProduct, refreshDashboard } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }

      setFormData({ name: '', price: '', stock: '', image: '' });
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        alert('Error eliminando producto: ' + error.message);
      }
    }
  };

  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalStock: 0,
    cartItems: 0,
    totalSales: 0
  });

  useEffect(() => {
    const totalProducts = state.products.length;
    const totalStock = state.products.reduce((sum, product) => sum + product.stock, 0);
    const cartItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartValue = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalSales = cartValue + (state.salesTotal || 0);
    
    setDashboardData({
      totalProducts,
      totalStock,
      cartItems,
      totalSales
    });
  }, [state.products, state.cart, state.salesTotal]);

  useEffect(() => {
    refreshDashboard();
    const interval = setInterval(() => {
      refreshDashboard();
    }, 2000);
    return () => clearInterval(interval);
  }, [state.cart, state.products]);

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'rgba(255, 255, 255, 0.1)', 
      minHeight: 'calc(100vh - 80px)' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          marginBottom: '2rem', 
          textAlign: 'center' 
        }}>Panel de Administración</h2>
        
        {/* Estadísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>{dashboardData.totalProducts}</h3>
            <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>Total Productos</p>
          </div>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            color: 'white',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(17, 153, 142, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>{dashboardData.totalStock}</h3>
            <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>Stock Total</p>
          </div>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>{dashboardData.cartItems}</h3>
            <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>Items en Carritos</p>
          </div>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
            color: 'white',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(254, 202, 87, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>${dashboardData.totalSales.toLocaleString()}</h3>
            <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>💰 Total de Ventas</p>
          </div>
        </div>

        {/* Botón agregar producto */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <button 
            onClick={() => {
              setShowForm(true);
              setEditingProduct(null);
              setFormData({ name: '', price: '', stock: '', image: '' });
            }}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
          >
            + Agregar Nuevo Producto
          </button>
        </div>

        {/* Formulario Modal */}
        {showForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
          }}>
            <form onSubmit={handleSubmit} style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '2.5rem',
              borderRadius: '20px',
              width: '450px',
              maxWidth: '90vw',
              boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ 
                marginBottom: '2rem', 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Nombre del producto:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Precio:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.8)'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Stock:</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.8)'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>URL de imagen:</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(17, 153, 142, 0.4)'
                }}>
                  {editingProduct ? 'Actualizar' : 'Crear'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de productos */}
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ 
            color: '#1e293b', 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>Gestión de Inventario</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {state.products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isAdmin={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;