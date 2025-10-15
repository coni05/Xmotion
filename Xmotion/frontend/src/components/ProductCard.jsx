import React from 'react';
import { useApp } from '../context/AppContext.jsx';

function ProductCard({ product, isAdmin = false, onEdit, onDelete }) {
  const { dispatch } = useApp();

  const addToCart = () => {
    // Verificar si hay stock disponible
    if (product.stock <= 0) {
      alert('⚠️ Producto sin stock disponible');
      return;
    }
    
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div style={{
      border: '3px solid transparent',
      borderRadius: '20px',
      padding: '1.5rem',
      margin: '0.5rem',
      background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1) border-box',
      boxShadow: '0 15px 35px rgba(255, 107, 107, 0.2)',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
        color: 'white',
        padding: '0.3rem 0.8rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600',
        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
      }}>
        💎 Premium
      </div>
      
      <img 
        src={product.image || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&auto=format`} 
        alt={product.name}
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover', 
          borderRadius: '15px',
          border: '2px solid rgba(255, 107, 107, 0.2)'
        }}
        onError={(e) => {
          e.target.src = `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&auto=format`;
        }}
      />
      
      <h3 style={{ 
        margin: '1.2rem 0 0.8rem 0', 
        color: '#2d3748', 
        fontSize: '1.3rem', 
        fontWeight: '700',
        textAlign: 'center'
      }}>{product.name}</h3>
      
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <p style={{ 
          fontSize: '1.8rem', 
          fontWeight: '800', 
          background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          margin: '0.5rem 0',
          textShadow: '0 0 20px rgba(255, 107, 107, 0.3)'
        }}>
          💰 ${product.price}
        </p>
        <p style={{ 
          color: product.stock > 10 ? '#00d2d3' : product.stock > 0 ? '#feca57' : '#ff3838', 
          fontSize: '1rem', 
          fontWeight: '600',
          background: product.stock > 10 ? 'rgba(0, 210, 211, 0.1)' : product.stock > 0 ? 'rgba(254, 202, 87, 0.1)' : 'rgba(255, 56, 56, 0.1)',
          padding: '0.3rem 0.8rem',
          borderRadius: '15px',
          display: 'inline-block'
        }}>
          📦 Stock: {product.stock}
        </p>
      </div>
      
      {isAdmin ? (
        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
          <button 
            onClick={() => onEdit(product)}
            style={{
              padding: '0.8rem 1rem',
              background: 'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              flex: 1,
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(0, 210, 211, 0.4)',
              fontSize: '1rem'
            }}
          >
            ✏️ Editar
          </button>
          <button 
            onClick={() => onDelete(product.id)}
            style={{
              padding: '0.8rem 1rem',
              background: 'linear-gradient(135deg, #ff3838 0%, #ff9ff3 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              flex: 1,
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(255, 56, 56, 0.4)',
              fontSize: '1rem'
            }}
          >
            🗑️ Eliminar
          </button>
        </div>
      ) : (
        <button 
          onClick={addToCart}
          disabled={product.stock === 0}
          style={{
            width: '100%',
            padding: '1rem',
            background: product.stock === 0 ? 
              'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' : 
              'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
            marginTop: '1.5rem',
            fontWeight: '700',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            boxShadow: product.stock === 0 ? 'none' : '0 8px 25px rgba(255, 107, 107, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          {product.stock === 0 ? '❌ Sin Stock' : '🛒 Agregar al Carrito'}
        </button>
      )}
    </div>
  );
}

export default ProductCard;