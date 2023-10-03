import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Button } from '@material-tailwind/react';
const AddCourseButton = () => {
    const navigate = useNavigate();
    return (
        <div>
          <div className='bg-[#F2F5EB] p-2' >
          <Button  fullWidth onClick={()=>navigate('/addcourse')}>Add New Courses</Button>
          </div>
        </div>
      );
    };


export default AddCourseButton