import React from 'react';
import senecaImg from '../../assets/Seneca-4.png';
import { baseUrl } from '../../Store/BaseUrl';
import { useNavigate } from 'react-router';
const Card = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className='bg-white drop-shadow-md overflow-hidden rounded-2xl mr-2 my-4 h-[300px] hover:transform hover:-translate-y-2 transition-transform' onClick={() => navigate(`/course-details?id=${course.id}`)}>
      <img src={`${baseUrl}${course.image}`} alt="" className='h-40 w-full object-cover' />
      <div className='p-5 '>
        <h1 className='font-bold text-xl h-[60px]'>{course.name}</h1>
        <p>{course.college.name} ,{course.college.country.name}</p>
      </div>
    </div>
  );
};

export default Card;