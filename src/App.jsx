import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Components/Home'
import './App.css'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Profile from './Components/Profile';
import OtpConfirmation from './Components/OtpConfirmation';
import Courses from './Components/Courses';
import Blogs from './Components/Blogs';
const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/signup"  element={<Signup/>} />
        <Route path="/otpconfirmation"  element={<OtpConfirmation/>} />
        <Route path="/login"  element={<Login/>} />
        <Route path="/profile"  element={<Profile/>} />
        <Route path="/courses"  element={<Courses/>} />
        <Route path="/blogs"  element={<Blogs/>} />
        
      </Routes>
    </Router>
    
  )
}

export default App