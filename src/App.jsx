import { Route, Routes } from 'react-router-dom';
import Demo from './pages/Demo';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='demo' element={<Demo />} />
        <Route path='login' element={<Login />} />
        <Route path='profile' element={<Profile />} />
        <Route path='signup' element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
