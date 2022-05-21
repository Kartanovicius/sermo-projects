import React from 'react';
import { getApps } from 'firebase/app';
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import AuthProvider from './context/authContext'
import HTTP404 from './pages/HTTP404';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<HTTP404 />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
