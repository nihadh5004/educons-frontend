// Create a higher-order component (HOC)
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from './Redux/Actions/UserAction';
const ProtectedRoute = ({ element, requiredRole }) => {
  const userRole = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user's role matches the required role
    if (userRole !== requiredRole) {
      localStorage.clear()
      dispatch(clearUserData());

      navigate('/login'); // Redirect to login or unauthorized page
    }
  }, [userRole, requiredRole, navigate]);

  // Return the element only if the user's role matches
  return userRole === requiredRole ? element : null;
};

export default ProtectedRoute;
