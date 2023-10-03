import React from 'react'
import senecaImg from '../../assets/Seneca-4.png'
const Card = () => {
  return (
    <div className='bg-white drop-shadow-md overflow-hidden rounded-2xl mr-2 my-4 hover:transform hover:-translate-y-2 transition-transform'>
        <img src={senecaImg} alt=""
        className='h-40 w-full object-cover '
        />
        <div className='p-5 border border-b'>
            <h1 className='font-bold text-xl'>Seneca College</h1>
            <p>Ontario,Canada</p>
        </div>
        <h3 className='p-5 text-xl'>15 Courses</h3>
    </div>
  )
}

export default Card