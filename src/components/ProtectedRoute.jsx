import React, { useContext } from 'react';

import { AuthContext } from '../store/AuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTE } from '../constants/Route';

const ProtectedRoute = ({ children }) => {
  const { session, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <p>Loading...</p>; //TODO! Styles
  }

  const auth = session?.user.aud === 'authenticated';

  return auth ? children : <Navigate to={ROUTE.LOGIN} />;
};

export default ProtectedRoute;
