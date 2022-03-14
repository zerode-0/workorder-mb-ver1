import React from 'react';
import { Route , BrowserRouter, Routes } from 'react-router-dom';

import './App.css'; 
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} /> 
        <Route  path="/Dashboard/*" element={<Dashboard />} /> 
      </Routes>
    </BrowserRouter>
  );
}
export default App;
