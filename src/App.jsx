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
import Blogslist from './Components/AdminComponents/BlogComponents/Blogslist';
import AdminBlogDetail from './Components/AdminComponents/BlogComponents/AdminBlogDetail';
import ConsultancyLoginPage from './Components/LoginComponents/ConsultancyLoginPage';
import ConsultancyHome from './Components/ConsultancyComponents/ConsultancyHome';
import ConsultancyCourses from './Components/ConsultancyComponents/ConsultancyCourses';
import AdminLoginPage from './Components/LoginComponents/AdminLoginPage';
import ConsultancySignup from './Components/ConsultancySignup';
import UserRequest from './Components/ConsultancyComponents/UserRequest';
import ConsultantRequestsList from './Components/AdminComponents/ConsultantRequestComponents/ConsultantRequestsList';
import StudentsList from './Components/ConsultancyComponents/StudentComponents/StudentsList';
import ChatStudents from './Components/ChatComponents/ChatStudents';
import Chat from './Components/ChatComponents/Chat'
import StudentChatWithUser from './Components/ChatComponents/StudentChatWithUser';
import LoginProtection from './Store/LoginProtection';
import ConsultantConfimation from './Components/AccountConfirmComponents/ConsultantConfimation';
import SavedBlogs from './Components/ProfileComponents/SavedBlogs';
import ForgotPassword from './Components/LoginComponents/ForgotPassword';
import ResetPassword from './Components/LoginComponents/ResetPassword';
const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/signup"  element={<LoginProtection element={<Signup/>} requiredRole={''} />}
        />
        <Route path="/consultancy-signup"  element={<ConsultancySignup/>} />
        <Route path="/otpconfirmation"  element={<OtpConfirmation/>} />
        <Route path="/consultancy-confirmation"  element={<ConsultantConfimation/>} />
        <Route path="/login"  element={<LoginProtection element={<Login/>} requiredRole={''} />}
         />
        <Route path="/forgot-password"  element={<LoginProtection element={<ForgotPassword/>} requiredRole={''} />}
         />
        <Route path="/reset-password"  element={<LoginProtection element={<ResetPassword/>} requiredRole={''} />}
         />
        <Route path="/admin-login"  element={<AdminLoginPage/>} />
        <Route path="/consultancy-login"  element={<ConsultancyLoginPage/>} />
        <Route path="/profile"  element={<Profile/>} />
        <Route path="/saved-blogs"  element={<SavedBlogs/>} />
        <Route path="/courses"  element={<Courses/>} />
        <Route path="/course-details"  element={<CourseDetail/>} />
        <Route path="/blogs"  element={<Blogs/>} />
        <Route path="/blog-details"  element={<BlogDetail/>} />
        <Route path="/chat-students"  element={<ChatStudents/>} />
        <Route path="/student-chat-users"  element={<StudentChatWithUser/>} />
        <Route path="/chat-page"  element={<Chat/>} />
        
        <Route path="/consultancy-dashboard"  element={<ProtectedRoute element={<ConsultancyHome/>} requiredRole={800} />}
        />
        <Route path="/user-requests"  element={<ProtectedRoute element={<UserRequest/>} requiredRole={800} />}
        />
        
        <Route path="/consultancy-courses"  element={<ProtectedRoute element={<ConsultancyCourses/>} requiredRole={800} />}
        />
        <Route path="/consultancy-students"  element={<ProtectedRoute element={<StudentsList/>} requiredRole={800} />}
        />
        
        <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} requiredRole={200} />}
            />        
        
        <Route
              path="/userlist"
              element={<ProtectedRoute element={<Users />} requiredRole={200} />}
            />        
        
        <Route
              path="/countries"
              element={<ProtectedRoute element={<Countries />} requiredRole={200} />}
            />        
        <Route
              path="/courseslist"
              element={<ProtectedRoute element={<Courseslist />} requiredRole={200} />}
            />        
        <Route
              path="/consultant-request-list"
              element={<ProtectedRoute element={<ConsultantRequestsList />} requiredRole={200} />}
            />        
        <Route
              path="/addcourse"
              element={<ProtectedRoute element={<AddCoursPage />} requiredRole={800} />}
            />        
        <Route
              path="/blogslist"
              element={<ProtectedRoute element={<Blogslist />} requiredRole={200} />}
            />        
        <Route
              path="/admin-blog-details"
              element={<ProtectedRoute element={<AdminBlogDetail />} requiredRole={200} />}
            />        
      </Routes>
    </Router>
    
  )
}

export default App