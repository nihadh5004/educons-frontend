import React from 'react'
import BlogPageCard from './BlogPageCard'
import BlogFilter from './BlogFilter'
import CoursePagination from '../CoursesComponents/CoursePagination'

const BlogPage = () => {
  return (
    <div className='bg-[#F2F5EB]'>
      <div className='md:ml-16 ml-3 '>
    <BlogFilter/>

      </div>
  <div className='md:flex flex-wrap gap-5 md:p-2 p-4 md:ml-16 mt-5'>
    <BlogPageCard />
    <BlogPageCard />
    <BlogPageCard />
    <BlogPageCard />
    <BlogPageCard />
    <BlogPageCard />
    {/* Additional cards go here */}
  </div>
  <div className='flex justify-center p-6'>

    <CoursePagination/>
  </div>
</div>
  )
}

export default BlogPage