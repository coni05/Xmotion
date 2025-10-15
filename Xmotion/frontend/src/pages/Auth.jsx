import React, { useState } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <Login switchToRegister={() => setIsLogin(false)} />
  ) : (
    <Register switchToLogin={() => setIsLogin(true)} />
  );
}

export default Auth;