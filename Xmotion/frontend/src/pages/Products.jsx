import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import ProductCard from '../components/ProductCard.jsx';

function Products() {
  const { state } = useApp();

  return (
    <div style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.1)', minHeight: 'calc(100vh - 80px)', textAlign: 'center' }}>
      <h2 style={{ 
        color: '#1a202c',
        fontSize: '2rem', 
        fontWeight: '800', 
        marginBottom: '2rem', 
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '1rem 2rem',
        borderRadius: '20px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
        border: '3px solid transparent',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        display: 'inline-block',
        margin: '0 0 2rem 0'
      }}>🛍️ Productos Disponibles</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {state.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {state.products.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '2rem', fontSize: '1.1rem' }}>
          No hay productos disponibles
        </p>
      )}
    </div>
  );
}

export default Products;