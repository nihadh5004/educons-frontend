import React from 'react'
import { Blogs, Courses, Footer, Hero, HomeSignup, NavBar, WhyUs } from './HomeComponents'
const Home = () => {
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