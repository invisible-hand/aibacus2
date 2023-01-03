import './index.css';

import App from './App';
import AuthContextProvider from './store/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ChildrenContextProvider from './store/ChildrenContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';

ReactGA.initialize(import.meta.env.VITE_GA_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ChildrenContextProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ChildrenContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
