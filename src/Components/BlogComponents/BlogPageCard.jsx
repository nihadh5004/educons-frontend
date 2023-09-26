import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
  } from "@material-tailwind/react";
const BlogPageCard = () => {
  return (
    <div>
        <Card className="w-full max-w-[28rem] mt-2  shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          src="https://m.economictimes.com/thumb/msid-103273405,width-2121,height-1413,resizemode-4,imgsize-289970/canada.jpg"
          alt="ui/ux review check"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        
      </CardHeader>
      <CardBody>
        <div className=" flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            My Experience in Canada
          </Typography>
          
        </div>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="p" color="gray" className="font-medium text-sm text-gray-500">
            Daniel Johns, on 10 Dec 2023
          </Typography>
          
        </div>
        <Typography color="gray">
          Enter a freshly updated and thoughtfully furnished peaceful home
          surrounded by ancient trees, stone walls, and open meadows.
        </Typography>
        
      </CardBody>
      <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true} className='bg-gray-700 '>
         view Full blog
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default BlogPageCard