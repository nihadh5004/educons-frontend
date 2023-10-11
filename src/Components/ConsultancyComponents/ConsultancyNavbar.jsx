import React,{useState} from 'react'
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router';
import { useSelector ,useDispatch } from 'react-redux';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { baseUrl } from '../../Store/BaseUrl';
import { clearUserData } from '../../Store/Redux/Actions/UserAction';
const ConsultancyNavbar = () => {
    const { isAuthenticated, username, role } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [toggle,setToggle] =useState(false)
    const navigate = useNavigate();


    const handleLogout= async () => {
        try {
          const response = await  
                axios.post(`${baseUrl}/logout/`,
                { refresh_token:localStorage.getItem('refreshToken')} ,
                {headers: {'Content-Type': 'application/json'}  
                });
                if (response.status === 200) { // Check for the appropriate status code
                  
                  dispatch(clearUserData());
                  axios.defaults.headers.common['Authorization'] = null;
                  navigate('/login');
                  console.log('suii');
                } else {
                  console.log('Logout request was not successful');
                }
          } catch (e) {
            console.log('logout not working', e)
          }
        }
  return (
    <div>
         <div>

    
<div className='w-full h-[80px] bg-white border-b  fixed z-50  '>
    <div className='md:max-w-[1240px]  max-w-[330px] w-full h-full flex justify-between items-center m-auto'>

        <h1 className='h-[25px] text-2xl text-[#20B486] font-bold' style={{ cursor: 'pointer' }} onClick={()=>navigate('/consultancy-dashboard')}>EduCons-Consultant</h1>

        <div className='hidden md:flex'>
            <ul className='flex gap-9'>
                <li className='group relative px-3 py-2 text-sm  ' style={{ cursor: 'pointer' }} onClick={()=>navigate('/consultancy-dashboard')}>
                Dashboard
                <div className='absolute inset-x-0 bottom-0 h-1 bg-[#20B486] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                </li>
                <li className='group relative px-3 py-2 text-sm ' style={{ cursor: 'pointer' }} onClick={()=>navigate('/consultancy-courses')}>
                Courses
                <div className='absolute inset-x-0 bottom-0 h-1 bg-[#20B486] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                </li>
                <li className='group relative px-3 py-2 text-sm ' style={{ cursor: 'pointer' }} onClick={()=>navigate('/user-requests')}>
                Requests
                <div className='absolute inset-x-0 bottom-0 h-1 bg-[#20B486] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                </li>
                <li className='group relative px-3 py-2 text-sm ' style={{ cursor: 'pointer' }}  onClick={()=>navigate('/consultancy-students')} >
                Students
                <div className='absolute inset-x-0 bottom-0 h-1 bg-[#20B486] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                </li>
               
               
                

            </ul>
        </div>
        <div className='hidden md:flex gap-6'>

            <div className='flex gap-8'> 
                {/* <button className='text-white bg-black p-2'>Request For Student Approval</button> */}

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
                <IconButton variant="text" className='  bg-red-500 text-white rounded-full transition-all duration-300 transform group hover:bg-black hover:scale-105' onClick={handleLogout}><i className="fa fa-power-off" /></IconButton > 
            </div>


           
                           
        </div>

        
    </div>


    <div className={toggle ? 'absolute z-10 p-4 bg-white w-full px-8 md:hidden' :'hidden'}>
        <ul>
            <li className='p-4 hover:bg-gray-100 ' onClick={()=>navigate('/')}>HOME</li>
            <li className='p-4 hover:bg-gray-100' onClick={()=>navigate('/courses')}>COURSES</li>
            <li className='p-4 hover:bg-gray-100' onClick={()=>navigate('/blogs')}>BLOGS</li>
            <li className='p-4 hover:bg-gray-100'>COMMUNITIES</li>
            <li className='p-4 hover:bg-gray-100' onClick={()=>navigate('/profile')}>PROFILE</li>
            <li className='p-4 hover:bg-gray-100'>ABOUT US</li>
            <div className='flex flex-col my-4 gap-4'>
            <button className='px-7 py-2 rounded bg-[#20B486] text-white font-bold'>Login</button>
            </div>
        </ul>
    </div>
</div>
<div className='w-full h-[80px] bg-white border-b  '></div>

</div>
    </div>
  )
}

export default ConsultancyNavbar