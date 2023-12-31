import React from 'react'
import Card from './Card'
import Slider from "react-slick";
import BlogCards from './BlogCards';

const Blogs = () => {
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
        <h1 className='md:text-2xl py-2 font-bold'>Most Popular <span className='text-[#20B486]'>Blogs</span></h1>
        <h5 className='hidden md:flex mr-5'>Explore  All  </h5>

        </div>
            <Slider {...settings}>
                <BlogCards/>
                <BlogCards/>
                <BlogCards/>
                <BlogCards/>
            </Slider>
        </div>
        </div>  )
}

export default Blogs