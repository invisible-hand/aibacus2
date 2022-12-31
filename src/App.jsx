import { Route, Routes } from 'react-router-dom';

import Demo from './pages/Demo';
import Home from './pages/Home';
import Login from './pages/Login';
import Math from './pages/Math';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTE } from './pages/Route';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import SetNewPassword from './pages/SetNewPassword';
// import Layout from './components/layout/Layout';

const App = () => {
  return (
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
        path={ROUTE.MATH}
        element={
          <ProtectedRoute>
            <Math />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
