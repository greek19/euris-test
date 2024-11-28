import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGIN } from '../utility/routesConstants';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} />; // Redirect a login se non autenticato
  }

  return children; // Se autenticato, rendi il componente figlio
};

export default PrivateRoute;
