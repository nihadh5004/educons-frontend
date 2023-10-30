import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../Store/BaseUrl';
import { TEInput, TERipple } from "tw-elements-react";
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Store/Redux/Actions/UserAction';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "@material-tailwind/react";
import NavBar from '../NavBar';
import Lottie  from 'lottie-react';
import email from '../Animation/email.json'
import mailSend from '../Animation/mailSend.json'
const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username,setUsername]=useState('')
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const[load,setload]=useState(false)

    const handleVerify = async () => {
        if (!username) {
            // Handle case where the username is empty
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${baseUrl}/forgot-password/`, {
                username: username,
            });

            // Handle the API response, e.g., show a success message
            console.log('Response from the API:', response.data);
            setload(true)


            // You can also redirect to another page here if needed
            // navigate('/reset-password');
        } catch (error) {
            // Handle API errors, e.g., show an error message
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


  return (
    <>
    <NavBar/>
    <section className="h-screen  ">
    <div className="container h-full md:px-6 py-24  md:w-[1380px] w-[600px] ">
      <div className="g-6 flex h-full w-full flex-wrap items-center justify-center lg:justify-between">
        {/* <!-- Left column container with background--> */}

        {
            load ?

        <div className=" flex flex-col items-center mb-12  md:mb-0 ml-16  md:w-4/12 lg:w-4/12">
        <Lottie animationData={mailSend}/>
        </div>
        :
        <div className=" flex flex-col items-center mb-12 md:mb-0 ml-16   md:w-8/12 lg:w-6/12">
        <Lottie animationData={email}/>
        </div>
        }
        


        {/* <!-- Right column container with form --> */}

        {
            load ? 
            <div className=" md:ml-1 ml-16 md:w-8/12 w-full lg:ml-6 lg:w-5/12">
            <h1 className='text-center  md:text-5xl py-4 mb-3 '>Email sent Succesfully</h1>
            <p>Please check your registered mail and click on the link sent to your mail</p>
            </div>
            :
        <div className=" md:ml-1 ml-16 md:w-8/12 w-full lg:ml-6 lg:w-5/12">
            <h1 className='text-center  md:text-5xl py-4 mb-3 '>Forgot Password?</h1>
          {isLoading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
          <form> 
            <TEInput
              type="username"
              label=" username"
              size="lg"
              className="mb-6 md:mt-11"
              value={username} onChange={(e) => setUsername(e.target.value)} 
            ></TEInput>

     

            
              <button
                type="button"
                className="inline-block w-full rounded bg-[#20B486] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleVerify}             
              >
                Verify
              </button>
          </form>
          )}
        </div>
        }
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

export default ForgotPassword