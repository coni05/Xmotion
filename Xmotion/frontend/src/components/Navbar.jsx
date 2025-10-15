import React from 'react';
import { useApp } from '../context/AppContext.jsx';

function Navbar({ currentView, setCurrentView }) {
  const { state, dispatch } = useApp();
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)', 
      color: 'white', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)',
      borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
        animation: 'shine 3s infinite'
      }}></div>
      
      <h1 style={{ 
        fontSize: '1.8rem', 
        fontWeight: '800',
        background: 'linear-gradient(135deg, #ffffff 0%, #ffeaa7 50%, #ffffff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
        position: 'relative',
        zIndex: 1
      }}>Xmotion</h1>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <span style={{ 
          color: '#ffffff', 
          marginRight: '1rem',
          fontSize: '0.9rem',
          fontWeight: '600',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Hola, {state.user.name}
        </span>
        
        {state.user.role === 'admin' ? (
          <button 
            onClick={() => setCurrentView('dashboard')}
            style={{ 
              padding: '0.6rem 1.2rem', 
              background: currentView === 'dashboard' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            📊 Dashboard
          </button>
        ) : (
          <>
            <button 
              onClick={() => setCurrentView('products')}
              style={{ 
                padding: '0.6rem 1.2rem', 
                background: currentView === 'products' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              🛍️ Productos
            </button>
            <button 
              onClick={() => setCurrentView('cart')}
              style={{ 
                padding: '0.6rem 1.2rem', 
                background: currentView === 'cart' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                position: 'relative',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              🛒 Carrito
              {cartItemsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'linear-gradient(135deg, #ff3838 0%, #ff9ff3 100%)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  boxShadow: '0 4px 15px rgba(255, 56, 56, 0.6)',
                  animation: 'pulse 2s infinite'
                }}>
                  {cartItemsCount}
                </span>
              )}
            </button>
          </>
        )}
        
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '0.6rem 1.2rem', 
            background: 'linear-gradient(135deg, #ff3838 0%, #ff6b6b 100%)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '25px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 6px 20px rgba(255, 56, 56, 0.5)',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          🚪 Salir
        </button>
      </div>
      

    </nav>
  );
}

export default Navbar;