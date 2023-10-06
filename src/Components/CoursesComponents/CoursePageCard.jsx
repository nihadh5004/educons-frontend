import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { baseUrl } from '../../Store/BaseUrl';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
const CoursePageCard = ({ course, image,college, duration , is_admin ,is_consultancy, courseId, deleteCourse }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend to delete the course
      await axios.delete(`${baseUrl}/deletecourse/${courseId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If the delete request is successful, call the onDelete callback
      deleteCourse(courseId);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
  return (
    <div className='md:px-14'>
        <Card className="w-full h-[300px] max-w-2/3 mt-3 flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="black" className="mb-4 uppercase">
        {course}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="">
          {college}
        </Typography>
        <Typography variant="p" color="blue-gray" className="mb-2">
          Canada,Ontario
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          Course Duration : {duration} Years
        </Typography>
        
        
        {/* <a href="#" className="inline-block"> */}
       
          <Button variant="text" className="flex items-center gap-2" onClick={()=>navigate(`/course-details?id=${courseId}`)}>
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
          {/* </a> */}
          {is_consultancy &&(

                    
          <div className='flex'>

          <Button variant="text" className="flex items-center gap-2">
            Edit
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
          <Button variant="text" className="flex items-center gap-2" onClick={handleDelete}>
            Delete
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
          </div>
          )}
      </CardBody>
    </Card>
    </div>
  )
}

export default CoursePageCard