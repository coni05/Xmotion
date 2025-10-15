import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Auth from './pages/Auth.jsx';
import './App.css';

function AppContent() {
  const { state } = useApp();
  const [currentView, setCurrentView] = useState('products');

  useEffect(() => {
    if (state.user?.role === 'admin') {
      setCurrentView('dashboard');
    } else if (state.isAuthenticated) {
      setCurrentView('products');
    }
  }, [state.user, state.isAuthenticated]);

  if (!state.isAuthenticated) {
    return <Auth />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'products':
        return <Products />;
      case 'cart':
        return state.user.role === 'user' ? <Cart /> : <Products />;
      case 'dashboard':
        return state.user.role === 'admin' ? <Dashboard /> : <Products />;
      default:
        return <Products />;
    }
  };

  return (
    <div className="App">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;