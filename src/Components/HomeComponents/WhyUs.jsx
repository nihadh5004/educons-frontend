import React from 'react'
import HeroImage from '../../assets/achievement.png'
import {BiSolidInstitution} from 'react-icons/bi'
import {FaGlobeAsia , FaUserGraduate} from 'react-icons/fa'
import {PiBookFill} from 'react-icons/pi'
const WhyUs = () => {
  return (
    <div className='w-full bg-white py-24'>
    <div className='md:max-w-[1080px] m-auto grid md:grid-cols-2 max-w-[350px]'>
        <div className='flex flex-col justify-center   '>
            <h1 className='text-3xl py-2 font-semibold '>Why <span className='text-[#20B486]'>Choose Us ?</span></h1>
            <p className='text-gray-500 py-2'>Choose Us for a World of Knowledge and Endless Opportunities in Your Educational Journey Abroad.</p>
            <div className='grid grid-cols-2 py-16'>
                <div className=' py-6 flex'>
                    <div className='p-4  rounded-xl bg-[#E9F8F3]'>
                        <FaGlobeAsia
                            size={30}
                            style={{color:'#1A906B'}}
                        />
                    </div>
                    <div className='px-3'>
                        <h1 className='text-2xl font-bold'>10+</h1>
                        <p className='text-[#6D737A]'>Countries</p>
                    </div>
                </div>
                <div className=' py-6 flex'>
                    <div className='p-4  rounded-xl bg-[#FFFAF5]'>
                        <BiSolidInstitution
                            size={30}
                            style={{color:'#FFC27A'}}
                        />
                    </div>
                    <div className='px-3'>
                        <h1 className='text-2xl font-bold'>100+</h1>
                        <p className='text-[#6D737A]'>Instituitions</p>
                    </div>
                </div>
                <div className=' py-6 flex'>
                    <div className='p-4  rounded-xl bg-[#FFEEF0]'>
                        <PiBookFill
                            size={30}
                            style={{color:'#ED4459'}}
                        />
                    </div>
                    <div className='px-3'>
                        <h1 className='text-2xl font-bold'>1000+</h1>
                        <p className='text-[#6D737A]'>Courses</p>
                    </div>
                </div>
                <div className=' py-6 flex'>
                    <div className='p-4  rounded-xl bg-[#F0F7FF]'>
                        <FaUserGraduate
                            size={30}
                            style={{color:'#0075FD'}}
                        />
                    </div>
                    <div className='px-3'>
                        <h1 className='text-2xl font-bold'>10000+</h1>
                        <p className='text-[#6D737A]'>Students</p>
                    </div>
                </div>
            </div>
        </div>
            <img className=' m-auto md:order-last order-first' src={HeroImage} alt="" />


    </div>
</div>
  )
}

export default WhyUs