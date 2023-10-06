import React from 'react'
import NavBar from './NavBar'
import BlogDetailPage from './BlogComponents/BlogDetailPage'
import Footer from './Footer'

const BlogDetail = () => {
  return (
    <div>
        <NavBar/>
        <BlogDetailPage is_admin={false}/>
        <Footer/>
    </div>
  )
}

export default BlogDetail