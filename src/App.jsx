import { Route, Routes } from 'react-router-dom';

import AdminPromptTest from './pages/AdminPromptTest';
import Arithmetics from './pages/Arithmetics';
import Demo from './pages/Demo';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Math from './pages/Math';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTE } from './constants/Route';
import ReactGA from 'react-ga';
import Reading from './pages/Reading';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import SetNewPassword from './pages/SetNewPassword';
import useGAPageView from './components/hooks/useGAPageView';

ReactGA.initialize('G-Y09KX781K6');

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

        <Route
          path={ROUTE.PROMPT_TEST}
          element={
            <ProtectedRoute>
              <AdminPromptTest />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
