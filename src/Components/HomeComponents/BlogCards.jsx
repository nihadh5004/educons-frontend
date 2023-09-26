import React from 'react'
import senecaImg from '../../assets/Seneca-4.png'

const BlogCards = () => {
  return (
    <div className='bg-white drop-shadow-md overflow-hidden rounded-2xl mr-2 my-4 '>
    <img src="https://m.economictimes.com/thumb/msid-103273405,width-2121,height-1413,resizemode-4,imgsize-289970/canada.jpg" alt=""
    className='h-40 w-full object-cover '
    />
    <div className='p-5 '>
        <h1 className='font-medium text-xl'>My experience in canada</h1>
        <h1 className='font-sm text-gray-700 text-sm mb-2'>Daniel John ,on Dec 12 2023</h1>
        <p className='text-sm'>Canada is known for its stunning natural landscapes, including vast forests, pristine lakes, and majestic mountains. </p>
    </div>
    <button className='py-2 mb-2 ml-6 px-2 w-5/6 border mt-2 mb-2 rounded-xl hover:bg-gray-500'>View More</button>
    </div>
  )
}

export default BlogCards