import React from 'react'
import AdminNavbar from '../../AdminNavbar'
import CoursesPage from '../../CoursesComponents/CoursesPage'
import AddCourseButton from './AddCourseButton'

const Courseslist = () => {
  return (
    <div>
        <AdminNavbar/>
        <CoursesPage is_admin={true} is_consultancy={false} />
    </div>
  )
}

export default Courseslist