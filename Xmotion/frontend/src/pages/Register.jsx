import React, { useState } from 'react';
import ApiService from '../services/api';

function Register({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await ApiService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      alert('🎉 Registro exitoso. Ahora puedes iniciar sesión.');
      switchToLogin();
    } catch (error) {
      alert(error.message || 'Error en el registro');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '2.5rem',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)',
        width: '420px',
        maxWidth: '90vw',
        border: '2px solid rgba(255, 255, 255, 0.3)'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '1.75rem',
          fontWeight: '700'
        }}>🎯 Crear Cuenta</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#374151',
              fontWeight: '500'
            }}>👤 Nombre completo:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '3px solid transparent',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ff6b6b, #4ecdc4) border-box',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#374151',
              fontWeight: '500'
            }}>📧 Correo electrónico:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '3px solid transparent',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ff6b6b, #4ecdc4) border-box',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#374151',
              fontWeight: '500'
            }}>🔒 Contraseña:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '3px solid transparent',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ff6b6b, #4ecdc4) border-box',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#374151',
              fontWeight: '500'
            }}>🔐 Confirmar contraseña:</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '3px solid transparent',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ff6b6b, #4ecdc4) border-box',
                outline: 'none'
              }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            background: 'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 210, 211, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            ✨ Crear Cuenta
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#6b7280' }}>¿Ya tienes cuenta? </span>
          <button 
            onClick={switchToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff6b6b',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: '500'
            }}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;