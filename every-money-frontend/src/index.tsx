import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login/login';
import Home from './pages/home/home';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

const rootDiv = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootDiv);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);  

reportWebVitals();
