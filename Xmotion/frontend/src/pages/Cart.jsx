import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import ApiService from '../services/api';

function Cart() {
  const { state, dispatch, loadProducts, refreshDashboard } = useApp();

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'rgba(255, 255, 255, 0.1)', 
      minHeight: 'calc(100vh - 80px)' 
    }}>
      <h2 style={{ 
        background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent', 
        fontSize: '2rem', 
        fontWeight: '700', 
        marginBottom: '2rem', 
        textAlign: 'center' 
      }}>🛒 Carrito de Compras</h2>
      
      {state.cart.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(255, 107, 107, 0.2)',
          maxWidth: '500px',
          margin: '2rem auto'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <p style={{ color: '#6b7280', fontSize: '1.2rem', fontWeight: '500' }}>
            Tu carrito está vacío
          </p>
          <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>
            ¡Agrega algunos productos increíbles!
          </p>
        </div>
      ) : (
        <>
          <div style={{ marginTop: '1rem' }}>
            {state.cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                marginBottom: '1rem',
                boxShadow: '0 8px 25px rgba(255, 107, 107, 0.15)',
                border: '2px solid rgba(255, 107, 107, 0.1)'
              }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    objectFit: 'cover', 
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 107, 107, 0.2)'
                  }}
                />
                <div style={{ flex: 1, marginLeft: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: '600' }}>{item.name}</h4>
                  <p style={{ 
                    margin: '0', 
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: '700',
                    fontSize: '1.1rem'
                  }}>
                    💰 ${item.price}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid rgba(255, 107, 107, 0.3)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: '#ff6b6b',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      minWidth: '40px', 
                      textAlign: 'center',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid rgba(78, 205, 196, 0.3)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: '#4ecdc4',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    style={{
                      padding: '0.8rem 1rem',
                      background: 'linear-gradient(135deg, #ff3838 0%, #ff9ff3 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(255, 56, 56, 0.4)'
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            marginTop: '2rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(255, 107, 107, 0.2)',
            border: '2px solid rgba(255, 107, 107, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '2rem', 
              margin: '0 0 1rem 0',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '800'
            }}>
              💎 Total: ${total.toFixed(2)}
            </h3>
            <button 
              onClick={async () => {
                try {
                  console.log('💳 Procesando pago...');
                  console.log('Usuario:', state.user);
                  console.log('Carrito:', state.cart);
                  
                  // Crear orden en la base de datos
                  const orderData = {
                    user_id: state.user.id,
                    total: total,
                    items: state.cart.map(item => ({
                      product_id: item.id,
                      quantity: item.quantity,
                      price: item.price
                    }))
                  };
                  
                  console.log('Datos de la orden:', orderData);
                  
                  const response = await ApiService.createOrder(orderData);
                  console.log('Respuesta del servidor:', response);
                  
                  alert('🎉 ¡Pago exitoso! Gracias por tu compra en Xmotion');
                  
                  // Limpiar carrito y recargar productos con stock actualizado
                  dispatch({ type: 'LOGOUT' });
                  dispatch({ type: 'LOGIN', payload: state.user });
                  
                  console.log('🔄 Recargando productos...');
                  await loadProducts();
                  await refreshDashboard();
                  
                  console.log('✅ Proceso completado');
                } catch (error) {
                  console.error('❌ Error procesando pago:', error);
                  alert('⚠️ Error procesando el pago: ' + error.message);
                }
              }}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginTop: '1rem',
                boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
            >
              💳 Proceder al Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;