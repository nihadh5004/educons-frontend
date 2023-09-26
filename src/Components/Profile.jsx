import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavBar from './NavBar'
import ProfilePage from './ProfileComponents/ProfilePage'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
   
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);
  return (

    <div>
        <NavBar/>
        <ProfilePage/>
        <Footer/>
    </div>
  )
}

export default Profile