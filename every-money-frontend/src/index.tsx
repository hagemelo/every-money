import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login/login';
import Home from './pages/home/home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Account from './pages/account/account';
import Category from './pages/category/category';
import Budget from './pages/budget/budget';
import Transaction from './pages/transaction/transaction';
import { ToastProvider } from './components/toast/toast';
import { useLoginService } from './share/context/context.tsx';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const loginService = useLoginService();
  if (!loginService.isLoggedIn()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

const rootDiv = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootDiv);

root.render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
          <Route path="/transaction" element={<ProtectedRoute><Transaction /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
);

reportWebVitals();
