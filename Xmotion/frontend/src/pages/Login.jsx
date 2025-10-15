import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import ApiService from '../services/api';

function Login({ switchToRegister }) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await ApiService.login(formData);
      localStorage.setItem('token', response.token);
      dispatch({ type: 'LOGIN', payload: response.user });
    } catch (error) {
      alert(error.message || 'Error al iniciar sesión');
    }
  };

  const quickLogin = async (role) => {
    const credentials = {
      email: role === 'admin' ? 'admin123@gmail.com' : 'user@test.com',
      password: 'password'
    };
    
    try {
      const response = await ApiService.login(credentials);
      localStorage.setItem('token', response.token);
      dispatch({ type: 'LOGIN', payload: response.user });
    } catch (error) {
      alert('Error en login rápido: ' + error.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '3rem',
        borderRadius: '25px',
        boxShadow: '0 25px 50px rgba(255, 107, 107, 0.3)',
        width: '450px',
        maxWidth: '90vw',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'conic-gradient(from 0deg, transparent, rgba(255, 107, 107, 0.1), transparent)',
          animation: 'rotate 4s linear infinite'
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '2.5rem',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2rem',
            fontWeight: '800',
            textShadow: '0 0 30px rgba(255, 107, 107, 0.3)'
          }}>🚀 Bienvenido a Xmotion</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: '#2d3748',
                fontWeight: '600',
                fontSize: '1rem'
              }}>📧 Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  border: '3px solid transparent',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ff6b6b, #4ecdc4) border-box',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: '#2d3748',
                fontWeight: '600',
                fontSize: '1rem'
              }}>🔒 Contraseña:</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  border: '3px solid transparent',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ff6b6b, #4ecdc4) border-box',
                  outline: 'none'
                }}
              />
            </div>

            <button type="submit" style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              ✨ Iniciar Sesión
            </button>
          </form>

          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ color: '#6b7280', fontSize: '1rem' }}>¿No tienes cuenta? </span>
            <button 
              onClick={switchToRegister}
              style={{
                background: 'none',
                border: 'none',
                color: '#ff6b6b',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              Registrarse aquí
            </button>
          </div>

          <div style={{ borderTop: '2px solid rgba(255, 107, 107, 0.2)', paddingTop: '1.5rem' }}>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
              🎯 Acceso rápido:
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => quickLogin('user')}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  background: 'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(0, 210, 211, 0.4)',
                  fontSize: '1rem'
                }}
              >
                👤 Usuario
              </button>
              <button 
                onClick={() => quickLogin('admin')}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  background: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(254, 202, 87, 0.4)',
                  fontSize: '1rem'
                }}
              >
                👑 Admin
              </button>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  );
}

export default Login;