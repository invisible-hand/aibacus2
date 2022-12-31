import React, { useContext } from 'react';

import { AuthContext } from '../store/AuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTE } from '../constants/Route';

const ProtectedRoute = ({ children }) => {
  const { session } = useContext(AuthContext);

  if (session?.user.aud === 'authenticated') {
    return children;
  } else {
    return <Navigate to={ROUTE.LOGIN} />;
  }
};

export default ProtectedRoute;
