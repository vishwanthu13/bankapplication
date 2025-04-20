import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isLoggedin, ...rest }) => {
  return isLoggedin ? <Component {...rest} /> : <Navigate to="/customerLogin" />;
};

export default ProtectedRoute;
