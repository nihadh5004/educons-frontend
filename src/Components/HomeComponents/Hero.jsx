import React from 'react'
import HeroImage from '../../assets/hand-drawn-study-abroad-illustration_23-2150314526.avif'
const Hero = () => {
  return (
    <div className='w-full bg-white'>
        <div className='md:max-w-[1380px] m-auto grid md:grid-cols-2 max-w-[350px]'>
            <div className='flex flex-col justify-center gap-4 '>
                <p className='md:text-2xl md:py-2 text-[#20B486] font-medium'>EXPAND YOUR HORIZONS</p>
                <h1 className='md:text-6xl md:py-2 font-semibold '>Access to <span className='text-[#20B486]'>5000+</span> courses from <span className='text-[#20B486]'>100+</span> Instituitions</h1>
                <form action="" className='bg-[#e4f7f1] border max-w-[650px] md:p-4 p-2 mb-2  md:mt-5  shadow-lg rounded-lg flex justify-between'>
                    <input className='bg-[#e4f7f1] placeholder-gray-500 w-full outline-none focus:outline-none' type="text" 
                    placeholder='What do you want to find?' style={{ color: 'black' }}/>
                    <i className="fa fa-search fa-lg mt-1"></i>
                </form>
            </div>
            <img className='md:order-last order-first' src={HeroImage} alt="" />

        </div>
    </div>
  )
}

export default Hero