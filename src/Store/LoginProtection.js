// Create a higher-order component (HOC)
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from './Redux/Actions/UserAction';
import toast, { Toaster } from 'react-hot-toast';

const LoginProtection = ({ element, requiredRole }) => {
    const userRole = useSelector((state) => state.user.role);
    const navigate = useNavigate();
    useEffect(() => {
        // Check if the user's role matches the required role
        if (userRole !== requiredRole) {
          toast.error('Login failed. Please check your credentials.');
          navigate('/'); 
        }
      }, [userRole, requiredRole, navigate]);
    
      // Return the element only if the user's role matches
      return (userRole === requiredRole ? element : null);
      
}

export default LoginProtection