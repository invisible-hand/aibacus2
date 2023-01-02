import React, { useContext } from 'react';

import { AuthContext } from '../store/AuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTE } from '../constants/Route';
import { isAuth } from '../database/auth';

const ProtectedRoute = ({ children }) => {
  const { session } = useContext(AuthContext);
  const auth = isAuth.auth || session?.user.aud === 'authenticated';

  return auth ? children : <Navigate to={ROUTE.LOGIN} />;
};

export default ProtectedRoute;
