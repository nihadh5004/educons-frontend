import React from 'react'
import NavBar from '../NavBar'
import { useNavigate } from 'react-router'
const ConsultantConfimation = () => {
    const navigate=useNavigate()
  return (
      <div>
    <NavBar/>
        <section className="h-screen  ">
    <div className="container h-full md:px-6 py-24  md:w-[1380px] w-[600px] ">
      <div className="g-6 flex h-full w-full flex-wrap items-center justify-center lg:justify-between">
        {/* <!-- Left column container with background--> */}
        <div className=" flex flex-col items-center mb-12 md:mb-0 ml-16  md:w-8/12 lg:w-6/12">
          <h1 className='md:text-7xl text-6xl font-bold text-[#20B486] '>EduCons.</h1>
          <h4 className='text-sm'>Best Study Abroad Platform</h4>
        </div>

        {/* <!-- Right column container with form --> */}
        <div className=" md:ml-1 ml-16 md:w-8/12 w-full lg:ml-6 lg:w-5/12">
            <h1 className='text-center font-bold  md:text-3xl  mb-3 '>Signed up succesfully!!</h1>
            <h1 className='text-center  py-1 mb-3 '>Please wait until we review your application </h1>
         
         
          <p className='text-sm text-gray-500 text-center '> Only login to your account after confimration send to your mail</p>
          <button className='border w-full p-2 mt-3 bg-[#20B486]' onClick={()=>navigate('/')}>Back to Home</button>
        </div>
      </div>
    </div>
  </section>
    </div>  )
}

export default ConsultantConfimation