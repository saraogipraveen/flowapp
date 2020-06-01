import React from 'react';
import Login from '../components/auth/login';

function Authenticate(Comp) {
  const token = localStorage.getItem('auth-token')

  return token ? <Comp /> : <Login />
}

export default Authenticate;