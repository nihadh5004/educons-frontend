import React from 'react'
import NavBar from './NavBar'
import CoursesPage from './CoursesComponents/CoursesPage'
import Footer from './Footer'

const Courses = () => {
  return (
    <div>
        <NavBar/>
        <CoursesPage is_admin={false} is_consultancy={false}/>
        <Footer/>
    </div>
  )
}

export default Courses