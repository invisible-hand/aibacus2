import { Route, Routes } from 'react-router-dom';

import Demo from './pages/Demo';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Math from './pages/Math';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTE } from './constants/Route';
import Reading from './pages/Reading';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import SetNewPassword from './pages/SetNewPassword';

// import Layout from './components/layout/Layout';

const App = () => {
  return (
    <Routes>
      <Route
        path={ROUTE.INDEX}
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path={ROUTE.DEMO}
        element={
          <Layout>
            <Demo />
          </Layout>
        }
      />
      <Route
        path={ROUTE.LOGIN}
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path={ROUTE.PROFILE}
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.REGISTER}
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path={ROUTE.RESET_PASSWORD}
        element={
          <Layout>
            <ResetPassword />
          </Layout>
        }
      />
      <Route
        path={ROUTE.SET_NEW_PASSWORD}
        element={
          <ProtectedRoute>
            <Layout>
              <SetNewPassword />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.MATH}
        element={
          <ProtectedRoute>
            <Layout>
              <Math />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.READING}
        element={
          <ProtectedRoute>
            <Layout>
              <Reading />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
