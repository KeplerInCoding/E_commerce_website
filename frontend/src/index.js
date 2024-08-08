import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
import { SnackbarProvider } from 'notistack';

const options = {
  autoHideDuration: 5000,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transition: 'scale', // Use a string or appropriate transition component
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <SnackbarProvider {...options}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
);
