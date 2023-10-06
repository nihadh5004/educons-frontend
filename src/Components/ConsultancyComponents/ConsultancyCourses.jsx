import React from 'react'
import ConsultancyNavbar from './ConsultancyNavbar'
import AddCourseButton from '../AdminComponents/CourseComponents/AddCourseButton'
import CoursesPage from '../CoursesComponents/CoursesPage'

const ConsultancyCourses = () => {
  return (
    <div>
        <ConsultancyNavbar/>
        <AddCourseButton/>
        <CoursesPage is_admin={false} is_consultancy={true}/>
    </div>
  )
}

export default ConsultancyCourses