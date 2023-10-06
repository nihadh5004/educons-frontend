import React from 'react'
import AdminNavbar from '../../AdminNavbar'
import AdminBlogDetailPage from './AdminBlogDetailPage'
import BlogDetailPage from '../../BlogComponents/BlogDetailPage'

const AdminBlogDetail = () => {
  return (
    <div>
        <AdminNavbar/>
        <BlogDetailPage is_admin={true}/>
        {/* <AdminBlogDetailPage/> */}
    </div>
  )
}

export default AdminBlogDetail