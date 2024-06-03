import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';
import { ToastContainer } from 'react-toastify';
import { Authprovider } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Authprovider>
      <App />
    </Authprovider>
    <ToastContainer />
  </React.StrictMode>
);
