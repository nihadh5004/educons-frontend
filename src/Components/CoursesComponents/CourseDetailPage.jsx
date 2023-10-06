import React, { useEffect, useState } from 'react';
import senecaImg from '../../assets/Seneca-4.png'
import axios from 'axios'; 
import { baseUrl } from '../../Store/BaseUrl';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
   
   
const CourseDetailPage = () => {
    const [courseDetails, setCourseDetails] = useState({
        course:[],
        collegeName:'',
        courseType:'',
        country:[],
        costOfStudying:''

    });
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    useEffect(() => {
        // Fetch course details data using axios and your API endpoint
        const fetchCourseDetails = async () => {
          try {
            const response = await axios.get(`${baseUrl}/course-details/${id}`,{
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              });
            setCourseDetails(
                {
                    course : response.data,
                    collegeName:response.data.college.name,
                    courseType:response.data.course_type.name,
                    country :response.data.college.country,
                    costOfStudying: response.data.college.country.cost_of_studying,

                }
            );
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching course details:', error);
          }
        };
    
        fetchCourseDetails();
      }, []);

    const data = [
        {
          label: "Key Informations",
          value: "html",
          desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people
          who are like offended by it, it doesn't matter.`,
        },
        {
          label: "Programme Structure",
          value: "react",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
          label: "Admission Requirements",
          value: "vue",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
        {
          label: "Cost of Studying",
          value: "angular",
          desc: `${courseDetails.costOfStudying}`,
        },
        {
          label: "Country Informations",
          value: "svelte",
          desc: `${courseDetails.country.about} `,
        },
      ];

      
      console.log(courseDetails.collegeName)
    return (
    <div>

<div className="relative">
  <img src={`${baseUrl}/${courseDetails.course.image}`} alt="" className="md:h-[600px] h-[400px] w-full" />
  <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-opacity-80 bg-white p-6 md:w-[500px]  w-[300px] rounded-lg">
    <div className=''>
    <h1 className="text-2xl font-semibold">{courseDetails.course.name}</h1>
    <h5 className="text-gray-600">{courseDetails.collegeName}</h5>

    </div>
  </div>
  <div className="absolute md:bottom-10 bottom-2 left-1/2 transform -translate-x-1/2 bg-opacity-80 bg-white p-8 w-5/6 md:w-2/3 rounded-lg">
    <div className="flex justify-between">
      <div>
        <h1 className="md:text-lg text-sm font-semibold">Duration</h1>
        <p>{courseDetails.course.duration} Years</p>
      </div>
      <div>
        <h1 className="md:text-lg text-sm font-semibold">Cost</h1>
        <p>$22000</p>
      </div>
      <div>
        <h1 className="md:text-lg text-sm font-semibold">Course type</h1>
        <p>{courseDetails.courseType}</p>
      </div>
    </div>
  </div>
</div>
<div className="md:px-16 py-3 p-2 mt-3">
  <p className="text-2xl font-bold">About</p>
  <p className='text-lg'>{courseDetails.course.description}</p>
</div>
<div className="md:px-16 py-3 p-2 mt-3">
  <p className="text-2xl font-bold">How to apply?</p>
  <p className='text-lg'>Once you’ve done your research and identified the scholarships that you are interested in, it’s time to complete the applications. Remember that most are competitive, so there’s no guarantee that, however good a match you think you are, that you will be successful. It’s sensible to apply for more than you need. So to help you stand out from other applicants we're here. </p>
  <p className='text-sm text-gray-500 mt-5'>CLick on the below button to get a thoroughout assistance in you admission procedure</p>
  <button className='px-4 py-2 mt-3 border w-full bg-green-500'>Click Here</button>
</div>

<div className='md:px-16 md:mt-11 mt-3 p-2'>
<Tabs value="html" orientation="vertical">
      <TabsHeader className="w-50">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value} className='py-3'>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className='ml-5 mt-10'>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="py-0">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
</div>
</div>
  )
}

export default CourseDetailPage