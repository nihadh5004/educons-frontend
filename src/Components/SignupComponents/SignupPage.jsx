import React,{useState} from 'react'
// import 'tw-elements-react/dist/styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { TEInput, TERipple } from "tw-elements-react";
import { Spinner } from "@material-tailwind/react";
import { baseUrl } from '../../Store/BaseUrl';

const SignupPage = ({is_consultancy}) => {
        
        
        // Create state variables to store form data
        const [username, setUsername] = useState('');
        const [usernameError, setUsernameError] = useState('');
        const [email, setEmail] = useState('');
        const [emailError, setEmailError] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [isLoading, setIsLoading] = useState(false); // State to track loading
        const navigate = useNavigate();

        const validateEmail = (emailValue) => {
          if (emailValue) {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!emailRegex.test(emailValue) || !emailValue.includes(".com")) {
              setEmailError("Invalid email address.");
            } else {
              setEmailError('');
            }
          } else {
            setEmailError('Email address is required.');
          }
        };

        const validateUsername = (usernameValue) => {
          if (/\d/.test(usernameValue)) {
            setUsernameError('Username should not contain numbers.');
          } else {
            setUsernameError('');
          }
        };


        // Handle form submission
      const handleSubmit = async () => {
       
        // Access form data from state variables
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        if (emailError) {
          toast.error('Please fix the email validation error.');
        } else if (password !== confirmPassword) {
          toast.error('Password didn\'t match');
        } else if (usernameError) {
          toast.error('Please fix the username validation error.');
        }else {
          setIsLoading(true); // Start loading
          try{
  
            const userData = {
              username,
              email,
              password,
              is_consultancy,
            };
            const response = await axios.post(`${baseUrl}/signup`,
                            userData ,{headers: 
                          {'Content-Type': 'application/json'}, withCredentials: true });
                          if(response.status === 201) {
                            console.log(response.data);
                          // Clear the form fields after successful registration if needed
                            setUsername('');
                            setEmail('');
                            setPassword('');
                            setConfirmPassword('');
                            if(is_consultancy == true){
                              navigate(`/consultancy-confirmation?username=${username}`)
                            }else{

                              navigate(`/otpconfirmation?username=${username}`)
                            }
                          }else if(response.status === 400){
                              toast.error(response.message);
                          }
            
          }catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle 400 Bad Request error
                toast.error('Username or email already exists');
            } else {
              // Handle other errors
              toast.error(error.message);
              console.error('Login failed:', error.message);
            }
          }finally {
            setIsLoading(false); // Stop loading
          };
        }
      }

  return (
    <>
    <section className="h-screen  ">
    <div className="container h-full md:px-6 w-[600px] py-24  md:w-[1380px]  ">
      <div className="g-6 flex h-full  flex-wrap items-center justify-center lg:justify-between">
        {/* <!-- Left column container with background--> */}
        <div className=" flex flex-col ml-16 items-center mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
          <h1 className='md:text-7xl text-6xl font-bold text-[#20B486] '>EduCons.</h1>
          <h4>Best Study Abroad Platform</h4>
        </div>

        {/* <!-- Right column container with form --> */}
        <div className=" md:ml-1 ml-16 md:w-8/12 lg:ml-6 lg:w-5/12">
          {is_consultancy?
          
          <h1 className='text-center  md:text-5xl py-4 mb-3 '>Consultancy Signup</h1>
          :
          
            <h1 className='text-center  md:text-5xl py-4 mb-3 '>User Signup</h1>
          }
            {isLoading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
          <form>
            {/* <!-- username input --> */}
            <div className="mb-6"
>

            <TEInput
              type="text"
              label="Username"
              size="lg"
              value={username} onChange={(e) => {
                const usernameValue = e.target.value;
                setUsername(usernameValue);
                validateUsername(usernameValue);
              }}
            ></TEInput>
            {usernameError && <p className="text-red-500">{usernameError}</p>}
            </div>


            {/* <!-- Email input --> */}
            <div className='mb-6'>

            <TEInput
              type="email"
              label="Email address"
              size="lg"
              className=""
              value={email} onChange={(e) => {
                const emailValue = e.target.value;
                setEmail(emailValue);
                validateEmail(emailValue);
              }}
            ></TEInput>
            {emailError && <p className="text-red-500">{emailError}</p>}
            </div>

            

            {/* <!--Password input--> */}
            <TEInput
              type="password"
              label="Password"
              className="mb-6"
              size="lg"
              value={password}  onChange={(e) => setPassword(e.target.value)}
            ></TEInput>
            {/* <!--Password input--> */}
            <TEInput
              type="password"
              label="Confirm Password"
              className="mb-6"
              size="lg"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            ></TEInput>

            {/* <!-- Remember me checkbox --> */}
            <div className="mb-6 flex items-center justify-between">
              
              <p>Already have an account? <span className='text-red-500' style={{ cursor:'pointer'}} onClick={()=>navigate('/login')}>Login</span></p>
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
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            

            {/* <!-- Divider --> */}
            
           
           
          </form>
           )}
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

export default SignupPage