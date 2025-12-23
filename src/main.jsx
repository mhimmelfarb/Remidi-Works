import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import UserDemo from './UserDemo';
import InvestorDemo from './InvestorDemo';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserDemo />} />
        <Route path="/investor" element={<InvestorDemo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
