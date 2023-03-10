import { Box, Spinner } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Arithmetics from './pages/Arithmetics';
import Demo from './pages/Demo';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Math from './pages/Math';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTE } from './utils/constants/Route';
import Reading from './pages/Reading';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import SetNewPassword from './pages/SetNewPassword';
import useGAPageView from './components/hooks/useGAPageView';

const AdminPromptTest = lazy(() => import('./pages/AdminPromptTest'));
const DevTestPage = lazy(() => import('./pages/DevTestPage'));

const App = () => {
  useGAPageView();

  return (
    <Layout>
      <Routes>
        <Route path={ROUTE.INDEX} element={<Home />} />
        <Route path={ROUTE.DEMO} element={<Demo />} />
        <Route path={ROUTE.LOGIN} element={<Login />} />
        <Route
          path={ROUTE.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTE.REGISTER} element={<Register />} />
        <Route path={ROUTE.RESET_PASSWORD} element={<ResetPassword />} />
        <Route
          path={ROUTE.SET_NEW_PASSWORD}
          element={
            <ProtectedRoute>
              <SetNewPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE.ARITHMETICS}
          element={
            <ProtectedRoute>
              <Arithmetics />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE.MATH}
          element={
            <ProtectedRoute>
              <Math />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE.READING}
          element={
            <ProtectedRoute>
              <Reading />
            </ProtectedRoute>
          }
        />
        //dev Pages
        <Route
          path={ROUTE.PROMPT_TEST}
          element={
            <ProtectedRoute>
              <Suspense
                fallback={
                  <Box justifyContent={'center'} alignItems={'center'}>
                    <Spinner
                      thickness='6px'
                      speed='0.95s'
                      //emptyColor='gray.100'
                      color='green.400'
                      size='xl'
                    />
                  </Box>
                }
              >
                <AdminPromptTest />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE.DEV_TEST_PAGE}
          element={
            <ProtectedRoute>
              <Suspense
                fallback={
                  <Box justifyContent={'center'} alignItems={'center'}>
                    <Spinner
                      thickness='6px'
                      speed='0.95s'
                      color='green.400'
                      size='xl'
                    />
                  </Box>
                }
              >
                <DevTestPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
