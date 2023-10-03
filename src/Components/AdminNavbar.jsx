import React,{useState} from 'react'
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router';
import { useSelector ,useDispatch } from 'react-redux';
import { baseUrl } from '../Store/BaseUrl';
import axios from 'axios';
import { clearUserData } from '../Store/Redux/Actions/UserAction';
import { Button } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";

const AdminNavbar = () => {
    const { isAuthenticated, username, role } = useSelector((state) => state.user);


    const [toggle,setToggle] =useState(false)
    const navigate =useNavigate();
    const dispatch = useDispatch();


    const handleLogout= async () => {
        try {
          const response = await  
                axios.post(`${baseUrl}/logout/`,
                { refresh_token:localStorage.getItem('refreshToken')} ,
                {headers: {'Content-Type': 'application/json'}  
                });
                if (response.status === 200) { // Check for the appropriate status code
                  
                  dispatch(clearUserData());
                //   axios.defaults.headers.common['Authorization'] = null;
                  navigate('/login');
                  console.log('success');
                } else {
                  console.log('Logout request was not successful');
                }
          } catch (e) {
            console.log('logout not working', e)
          }
        }
  return (
    <div>

    
    <div className='w-full h-[80px] bg-black border-b  fixed z-50  '>
        <div className='md:max-w-[1240px]  max-w-[330px] w-full h-full flex justify-between items-center m-auto'>

            <h1 className='h-[25px] md:text-2xl text-[#20B486] font-bold' style={{ cursor: 'pointer' }} onClick={()=>navigate('/dashboard')}>EduCons-Admin</h1>

            <div className='hidden md:flex'>
                <ul className='flex gap-9'>
                    <li className='group relative px-3 py-2 text-sm text-white ' style={{ cursor: 'pointer' }} onClick={()=>navigate('/dashboard')} >
                    Dashboard
                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#20B486] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>
                    
                    <li className='group relative px-3 py-2 text-sm text-white' style={{ cursor: 'pointer' }} onClick={()=>navigate('/userlist')}>
                    Users
                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#20B486] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>
                    <li className='group relative px-3 py-2 text-sm text-white ' style={{ cursor: 'pointer' }} onClick={()=>navigate('/countries')}>
                    Country
                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#20B486]  transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>
                    <li className='group relative px-3 py-2 text-sm text-white ' style={{ cursor: 'pointer' }} onClick={()=>navigate('/courseslist')} >
                    Courses
                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#20B486] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>
                    <li className='group relative px-3 py-2 text-sm text-white ' style={{ cursor: 'pointer' }}  >
                    Blogs
                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#20B486] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>
                    <li className='group relative px-3 py-2 text-sm text-white ' style={{ cursor: 'pointer' }}  >
                    Applications
                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#20B486] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>
                </ul>
            </div>
            <div className='hidden md:flex gap-6'>
                <div className='flex'>
                {isAuthenticated &&<IconButton
      className="bg-black text-white rounded-full p-2 transition-all duration-300 transform group hover:bg-green-500 hover:scale-105"
      onClick={()=>navigate('/profile')}
    >
      
      <i className="fa fa-user" />
    </IconButton>}
                </div>
                {isAuthenticated ? <IconButton variant="text" className='  bg-red-500 text-white rounded-full transition-all duration-300 transform group hover:bg-gray-500 hover:scale-105' onClick={handleLogout} ><i className="fa fa-power-off" /></IconButton > :  <IconButton variant="text" className='  bg-[#20B486] text-white rounded-full hover:bg-black' onClick={()=>(navigate('/login'))} ><i className="fa fa-power-off" /></IconButton >
 }
            </div>
            {/* <button className=' px-3 py-2 rounded-md bg-[#20B486] text-white text-sm' style={{ cursor: 'pointer' }} onClick={()=>navigate('/login')}>Login</button> */}

            <div className="md:hidden bg-black" onClick={()=>setToggle(!toggle)}>
               {toggle ? <i className="fa fa-times bg-white"></i> : <i  className="fa fa-bars bg-white"></i> }
                {/* <i  className="fa fa-bars"></i> */}
                {/* <i className="fa fa-times"></i> */}
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
  )
}

export default AdminNavbar