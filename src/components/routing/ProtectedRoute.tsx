import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { state } = useAuth();
  const location = useLocation();

  if (!state.isAuthenticated) {
    // Redirect to login page if not authenticated, but save the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;