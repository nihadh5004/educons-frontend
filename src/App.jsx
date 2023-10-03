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
import BlogDetail from './Components/BlogDetail';
import Dashboard from './Components/Dashboard';
import ProtectedRoute from './Store/ProtectedRoute';
import Users from './Components/AdminComponents/UserComponents/Users';
import Countries from './Components/AdminComponents/CountryComponents/Countries';
import Courseslist from './Components/AdminComponents/CourseComponents/Courseslist';
import AddCoursPage from './Components/AdminComponents/CourseComponents/AddCoursPage';
import CourseDetail from './Components/CourseDetail';
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
        <Route path="/course-details"  element={<CourseDetail/>} />
        <Route path="/blogs"  element={<Blogs/>} />
        <Route path="/blog-details"  element={<BlogDetail/>} />
        <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} requiredRole={true} />}
            />        
        <Route
              path="/userlist"
              element={<ProtectedRoute element={<Users />} requiredRole={true} />}
            />        
        <Route
              path="/countries"
              element={<ProtectedRoute element={<Countries />} requiredRole={true} />}
            />        
        <Route
              path="/courseslist"
              element={<ProtectedRoute element={<Courseslist />} requiredRole={true} />}
            />        
        <Route
              path="/addcourse"
              element={<ProtectedRoute element={<AddCoursPage />} requiredRole={true} />}
            />        
      </Routes>
    </Router>
    
  )
}

export default App