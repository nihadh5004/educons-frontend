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

    
<div className='w-full h-[80px] bg-white border-b   fixed z-50  '>
    <div className='md:max-w-[1240px]  max-w-[530px] w-full  h-full flex justify-between items-center m-auto'>

        <h1 className='h-[25px] text-2xl text-[#20B486] ml-3 font-bold' style={{ cursor: 'pointer' }} onClick={()=>navigate('/consultancy-dashboard')}>EduCons-Consultant</h1>

        <div className='hidden lg:flex'>
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
        <div className='hidden lg:flex gap-6'>

            <div className='flex gap-8'> 
                {/* <button className='text-white bg-black p-2'>Request For Student Approval</button> */}

                
                <IconButton variant="text" className='  bg-red-500 text-white rounded-full transition-all duration-300 transform group hover:bg-black hover:scale-105 mr-5' onClick={handleLogout}><i className="fa fa-power-off" /></IconButton > 
            </div>


                           
        </div>
            <div className="lg:hidden ml-auto">
           
            <button
              className="w-14 h-14 relative focus:outline-none  rounded"
              onClick={() => setToggle(!toggle)}
            >
              <div className="block w-5 absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`block absolute h-0.5 w-7 text-[#20B486] bg-current transform transition duration-500 ease-in-out ${
                    toggle ? "rotate-45" : " -translate-y-1.5"
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-7 text-[#20B486] bg-current transform transition duration-500 ease-in-out ${
                    toggle ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-7 text-[#20B486] bg-current transform transition duration-500 ease-in-out ${
                    toggle ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>  

        
    </div>


    <div className={toggle ? 'absolute z-10 p-4 bg-white w-full shadow-lg px-8 md:hidden' :'hidden'}>
        <ul>
            <li className='p-4 hover:bg-gray-100 ' onClick={()=>navigate('/consultancy-dashboard')}>DASHBOARD</li>
            <li className='p-4 hover:bg-gray-100' onClick={()=>navigate('/consultancy-courses')}>COURSES</li>
            <li className='p-4 hover:bg-gray-100' onClick={()=>navigate('/user-requests')}>REQUESTS</li>
            <li className='p-4 hover:bg-gray-100' onClick={()=>navigate('/consultancy-students')}>STUDENTS</li>
            
        </ul>
    </div>
</div>
<div className='w-full h-[80px] bg-white border-b  '></div>

</div>
    </div>
  )
}

export default ConsultancyNavbar