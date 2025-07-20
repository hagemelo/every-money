import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login/login';

const rootDiv = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootDiv);

root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);

reportWebVitals();
