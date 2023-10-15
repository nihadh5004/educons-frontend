import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QueryString from 'query-string';
import { useSelector ,useDispatch } from 'react-redux';
import { updatePremium } from '../Store/Redux/Actions/UserAction';
import axios from 'axios';
import { baseUrl } from '../Store/BaseUrl';
import { Blogs, Courses, Footer, Hero, HomeSignup, NavBar, WhyUs } from './HomeComponents'
const Home = () => {
  const location = useLocation();
  const dispatch =useDispatch();
  const {  username,premium } = useSelector((state) => state.user);

  useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		// const query = new URLSearchParams(window.location.search);
		const values = QueryString.parse(location.search);

		if (values.success) {
			console.log(
				'Order placed! You will receive an email confirmation.'
			);
      if(!premium){

        axios.post(`${baseUrl}/api/stripe/user-premium/`, { username: username })
        .then((response) => {
          console.log(response.data.message); 
          dispatch(updatePremium(true));
        })
        .catch((error) => {
          console.error('Error calling the user-premium API:', error);
        });
      }
    }
		

		if (values.canceled) {
			console.log(
				"Order canceled -- continue to shop around and checkout when you're ready."
			);
		}
	}, []);
  return (
    <div>
      <NavBar/>
      <Hero/>
      <Courses/>
      <WhyUs/>
      <HomeSignup/>
      <Blogs/>
      <Footer/>
    </div>
  )
}

export default Home