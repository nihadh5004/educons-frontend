import React from 'react'
import AdminNavbar from '../../AdminNavbar'
import BlogPage from '../../BlogComponents/BlogPage'
const Blogslist = () => {
  return (
    <div>
        <AdminNavbar/>
        {/* <BloglistPage/> */}
        <BlogPage is_admin={true}/>
    </div>
  )
}

export default Blogslist