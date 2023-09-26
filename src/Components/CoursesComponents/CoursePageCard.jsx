import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
const CoursePageCard = () => {
  return (
    <div>
        <Card className="w-full h-[300px] max-w-2/3 mt-2 flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="black" className="mb-4 uppercase">
          Diploma in Tool and Die Engg.
        </Typography>
        <Typography variant="h6" color="blue-gray" className="">
          Seneca College
        </Typography>
        <Typography variant="p" color="blue-gray" className="mb-2">
          Canada,Ontario
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          Course Duration : 3 Years
        </Typography>
        
        <a href="#" className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
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
        </a>
      </CardBody>
    </Card>
    </div>
  )
}

export default CoursePageCard