import React from 'react'
import {BiLogoFacebook, BiLogoLinkedin} from 'react-icons/bi'
import {BsInstagram} from 'react-icons/bs'
import {AiOutlineTwitter} from 'react-icons/ai'
import {CiLocationArrow1} from 'react-icons/ci'
const Footer = () => {
  return (
        <div className='w-full bg-white md:py-24 p-6'>
            <h1 className='md:max-w-[1080px] m-auto  font-bold py-2   max-w-[450px] '>Subscribe to newsletter.</h1>
            <div className='md:max-w-[1080px] m-auto grid md:grid-cols-3 gap-2  py-3 max-w-[450px] items-center'>
                <form action="" className='border py-2 rounded-lg '><input type="text" placeholder='Enter your mail' className='ml-2 outline-none'/></form>
                <form action="" className='border py-2 rounded-lg '><input type="text" placeholder='Enter your contact' className='ml-2 outline-none' /></form>
                
                <div className=' py-3 px-3 w-[50px] flex items-center bg-[#20B486] rounded-lg'>
                <CiLocationArrow1 
                size={20}
                style={{color:'white' }}/>
                </div>
            </div>


            <div className='md:max-w-[1080px] m-auto grid md:grid-cols-3   mt-7 gap-8 max-w-[450px] items-center'>

                <div className=''>

                    <h1 className='h-[25px] text-2xl text-[#20B486] font-bold'>EduCons</h1>
                    <h3 className='text-xl mt-10 font-semibold'>Contact Us</h3>
                    <h3 className='text-gray-500 py-3'>Call : +91 9876543210</h3>
                    <h3 className='text-gray-500 '>5th FLoor,Hilite Business Park <br /> Calicut,kerala </h3>
                    <h3 className='text- py-2'>Email : educons@gov.in</h3>
                    <div className='flex gap-4'>
                        <div className=' p-2 bg-[#E9F8F3B2] rounded-xl'>
                        <BiLogoFacebook
                        size={25}/>

                        </div>
                        <div className=' p-2 bg-[#E9F8F3B2] rounded-xl'>
                        <BsInstagram
                        size={25}/>

                        </div>
                        <div className=' p-2 bg-[#E9F8F3B2] rounded-xl'>
                        <AiOutlineTwitter
                        size={25}/>

                        </div>
                        <div className=' p-2 bg-[#E9F8F3B2] rounded-xl'>
                        <BiLogoLinkedin
                        size={25}/>

                        </div>
                        
                    </div>
                </div>
                
                <div className=''>
                    <h3 className='text-xl font-bold'>Explore</h3>
                    <ul className='py-6 text-gray-500'>
                        <li className='py-2'>Home</li>
                        <li className='py-2'>Courses</li>
                        <li className='py-2'>Blogs</li>
                        <li className='py-2'>Communities</li>
                    </ul>
                </div>
                
                <div>
                    <h3 className='text-xl font-bold'>Categories</h3>
                    <ul className='py-6 text-gray-500'>
                        <li className='py-2'>Colleges</li>
                        <li className='py-2'>Courses</li>
                        <li className='py-2'>Countries</li>
                        <li className='py-2'>Languages</li>
                    </ul>
                </div>
            </div>
        </div>
       
  )
}

export default Footer