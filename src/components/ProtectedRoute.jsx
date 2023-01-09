import { Box, Spinner } from '@chakra-ui/react';
import React, { useContext } from 'react';

import { AuthContext } from '../store/AuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTE } from '../utils/constants/Route';

const ProtectedRoute = ({ children }) => {
  const { session, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <Box justifyContent={'center'} alignItems={'center'}>
        <Spinner thickness='6px' speed='0.95s' color='green.400' size='xl' />
      </Box>
    );
  }

  const auth = session?.user.aud === 'authenticated';

  return auth ? children : <Navigate to={ROUTE.LOGIN} />;
};

export default ProtectedRoute;
