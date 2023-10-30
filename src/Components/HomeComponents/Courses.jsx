import React,{useState,useEffect} from 'react'
import Card from './Card'
import Slider from "react-slick";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { baseUrl } from '../../Store/BaseUrl';
const Courses = () => {
  const navigate = useNavigate()
  const [courses,setCourses]=useState([])

  const getCourses = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/top-courses/`
      );
      setCourses(response.data); // Update the comments state with the fetched data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Use useEffect to fetch comments when the component mounts and when blogId changes
  useEffect(() => {
    getCourses();
  }, []);


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
      };
  return (
    <div className='w-full bg-[#E9F8F3B2] py-24'>
        
        <div className='md:max-w-[1280px] m-auto  max-w-[350px]'>
        <div className='flex justify-between'>
        <h1 className='md:text-2xl py-2 font-bold'>Most Popular <span className='text-[#20B486]'>Courses</span></h1>
        <h5 className='hidden md:flex mr-5' onClick={()=>navigate('/courses')}>Explore  All  </h5>

        </div>
            <Slider {...settings}>
            {courses.map((course) => (
            <div key={course.id}>
              {/* Render the course name here */}
              <Card course={course} />
            </div>
          ))}
            </Slider>
        </div>
    </div>
  )
}

export default Courses