import React from 'react'
import NavBar from './NavBar'
import BlogPage from './BlogComponents/BlogPage'
import Footer from './Footer'
const Blogs = () => {
  return (
    <div>
        <NavBar/>
        <BlogPage is_admin={false} />
        
        <Footer/>
    </div>
  )
}

export default Blogs