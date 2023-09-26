import React from 'react'
import HeroImage from '../../assets/cta.png'
import { useNavigate } from 'react-router'
const HomeSignup = () => {
   const  navigate=useNavigate();
  return (
    <div className='w-full bg-[#E9F8F3] md:py-24 p-6'>
        <div className='md:max-w-[1380px] m-auto grid md:grid-cols-2 gap-8 max-w-[450px] items-center'>
            
            <img className=' order-first w-[500px] mx-auto' src={HeroImage} alt="" />

            <div className=''>

                
                <h1 className='md:text-3xl md:py-2 font-semibold '>Join <span className='text-[#20B486]'>Kerala's largest </span>study abroad consultancy.</h1>
                {/* <p className='py-2 text-lg text-gray-600'>Start exploring for free</p> */}
                <button className='max-[780px]:w-full my-4 px-7 py-2 rounded bg-[#20B486] text-white ' onClick={()=>navigate('/signup')}>Signup For Free</button>
            </div>

        </div>
    </div>  )
}

export default HomeSignup