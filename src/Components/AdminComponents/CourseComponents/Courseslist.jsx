import React from 'react'
import AdminNavbar from '../../AdminNavbar'
import CoursesPage from '../../CoursesComponents/CoursesPage'
import AddCourseButton from './AddCourseButton'

const Courseslist = () => {
  return (
    <div>
        <AdminNavbar/>
        <AddCourseButton/>
        <CoursesPage is_admin={true} />
    </div>
  )
}

export default Courseslist