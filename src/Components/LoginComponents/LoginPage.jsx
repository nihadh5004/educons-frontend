import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../Store/BaseUrl';
import { TEInput, TERipple } from "tw-elements-react";
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Store/Redux/Actions/UserAction';
import toast, { Toaster } from 'react-hot-toast';

// import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const notify = () => toast.error('Here is your toast.');

  const handleLogin = async () => {
    try {
      const loginData = {
        username: username,
        password: password,
      };
  
      const response = await axios.post(`${baseUrl}/token/`, loginData);
      if(response.status === 200){

        // Assuming the Django API returns the token in response.data.access
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        const role = response.data.is_superuser;
        const userId = response.data.id;
  
  
        localStorage.clear();
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    
        dispatch(setUserData({ username, role , userId }));
        navigate('/'); 
      }else {
        toast.error('Login failed. Please check your credentials.');
      }
  
    } catch (error) {
      // Handle login error here
      toast.error('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };
  return (
    <>
    
    <section className="h-screen  ">
    <div className="container h-full md:px-6 py-24  md:w-[1380px] w-[600px] ">
      <div className="g-6 flex h-full w-full flex-wrap items-center justify-center lg:justify-between">
        {/* <!-- Left column container with background--> */}
        <div className=" flex flex-col items-center mb-12 md:mb-0 ml-16  md:w-8/12 lg:w-6/12">
          <h1 className='md:text-7xl text-6xl font-bold text-[#20B486] '>EduCons.</h1>
          <h4 className='text-sm'>Best Study Abroad Platform</h4>
        </div>

        {/* <!-- Right column container with form --> */}
        <div className=" md:ml-1 ml-16 md:w-8/12 w-full lg:ml-6 lg:w-5/12">
            <h1 className='text-center  md:text-5xl py-4 mb-3 '>Login Here</h1>
          <form>
            {/* <!-- username input --> */}
            <TEInput
              type="text"
              label="Username"
              size="lg"
              className="mb-6"
              value={username} onChange={(e) => setUsername(e.target.value)} 
            ></TEInput>

            
            

            {/* <!--Password input--> */}
            <TEInput
              type="password"
              label="Password"
              className="mb-6"
              size="lg"
              value={password} onChange={(e) => setPassword(e.target.value)}
            ></TEInput>
            

            {/* <!-- Remember me checkbox --> */}
            <div className="mb-6 flex items-center justify-between">
              <p>Doesn't have an account? <span className='text-red-500' style={{cursor:'pointer'}} onClick={()=>navigate('/signup')}>Signup</span> </p>

              {/* <!-- Forgot password link --> */}
              <a
                href=""
                className="text-primary  transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Forgot password?
              </a>
            </div>

            {/* <!-- Submit button --> */}

            
              <button
                type="button"
                className="inline-block w-full rounded bg-[#20B486] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleLogin}              
              >
                Sign In
              </button>
            

            {/* <!-- Divider --> */}
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                OR
              </p>
            </div>

            {/* <!-- Social login buttons --> */}
            
              <a
                className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                style={{ backgroundColor: "	#DB4437" }}
                href="#!"
                role="button"
              >
                {/* <!-- Facebook --> */}
                <i className='fa fa-google px-3'></i>
                Continue with Google
              </a>
           
           
          </form>
        </div>
      </div>
    </div>
   
  </section>
  <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 3000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>

  </>
  )
}

export default LoginPage