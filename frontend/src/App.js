
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/sul';
import Home from './pages/home';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/rest" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
