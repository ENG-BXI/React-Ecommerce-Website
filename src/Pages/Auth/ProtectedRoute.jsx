import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import Register from './register';
import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = () => {
  let cookie = new Cookies();
  let token = cookie.get('Bearer');
  console.log(token);
    
  return token ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
