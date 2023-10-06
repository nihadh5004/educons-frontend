import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@material-tailwind/react';
import {useNavigate} from 'react-router-dom'
const BlogPageCard = ({ id ,user, image,heading, created_at, content , is_admin }) => {
  const formattedDate = new Date(created_at).toLocaleDateString();
  const navigate=useNavigate();
  return (
    <div>
      <Card className='w-full h-[500px] max-w-[28rem] mt-2 shadow-lg'>
        <CardHeader floated={false} color='blue-gray'>
          <img
            src={image} // Use the image prop here
            alt='ui/ux review check'
            className=''
          />
          <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
        </CardHeader>
        <CardBody>
          <div className='flex items-center justify-between'>
            <Typography variant='h5' color='blue-gray' className='font-medium'>
              {heading}
            </Typography>
          </div>
          <div className='mb-3 flex items-center justify-between'>
            <Typography
              variant='p'
              color='gray'
              className='font-medium text-sm text-gray-500'
            >
              {user}, on {formattedDate}
            </Typography>
          </div>
          <Typography color='gray'>{content}....</Typography>
        </CardBody>
        <CardFooter className='pt-3'>
          {is_admin ?
          <Button size='lg' fullWidth={true} className='bg-gray-700 ' onClick={()=>navigate(`/admin-blog-details?id=${id}`)}>
            View Full Blog
          </Button>
          :
          <Button size='lg' fullWidth={true} className='bg-gray-700 ' onClick={()=>navigate(`/blog-details?id=${id}`)}>
            View Full Blog
          </Button>
          }
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogPageCard;
