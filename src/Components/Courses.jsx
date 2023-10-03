import React from 'react'
import NavBar from './NavBar'
import CoursesPage from './CoursesComponents/CoursesPage'
import Footer from './Footer'

const Courses = () => {
  return (
    <div>
        <NavBar/>
        <CoursesPage is_admin={false}/>
        <Footer/>
    </div>
  )
}

export default Courses