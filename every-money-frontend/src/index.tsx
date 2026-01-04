import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login/login';
import Home from './pages/home/home';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Account from './pages/account/account';
import Category from './pages/category/category';
import Budget from './pages/budget/budget';
import Transaction from './pages/transaction/transaction';

const rootDiv = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootDiv);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/budget" element={<Budget/>}/>
        <Route path="/transaction" element={<Transaction/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);  

reportWebVitals();
