import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGIN } from '../utility/routesConstants';
import PropTypes from 'prop-types';

PrivateRoute.propType = {
  children: PropTypes.any.isRequired
}

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} />; 
  }

  return children;
};

export default PrivateRoute;
