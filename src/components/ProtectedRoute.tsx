import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isSignedIn: boolean;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isSignedIn, children }) => {
  console.log('ProtectedRoute='+ isSignedIn);
  if (!isSignedIn) {
    return <Navigate to="/auth/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
