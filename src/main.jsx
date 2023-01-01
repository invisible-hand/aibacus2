import './index.css';

import App from './App';
import AuthContextProvider from './store/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import ChildrenContextProvider from './store/ChildrenContext';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ChildrenContextProvider>
          <App />
        </ChildrenContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
