import React,{useState} from 'react'
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { baseUrl } from '../../Store/BaseUrl';
import { useParams } from 'react-router-dom';
import './Animation.css'
const OtpPage = () => {
    const [otp,setOtp]=useState('')
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username')

    const navigate = useNavigate();
    const handleActivation = async () =>{
    try{
            const data = {
                username: username,
                otp : otp,
              };
              console.log(username);
            const response = await axios.post(`${baseUrl}/activate/`, data,{headers: 
              {'Content-Type': 'application/json'}, withCredentials: true });
            if( response.status ===200){
                navigate('/login')
            }
    }catch(error){
            console.error('Login failed:', error.message );
    }
}
  return (
    <div>
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
            <h1 className='text-center  md:text-5xl py-1 mb-3 '>Confirm Your Account</h1>
            <h1 className='text-center text-gray-500  py-1 mb-3 '>Please click the link that has been sent to your mail</h1>
          {/* <form> */}
            

            
            

            {/* <!--Password input--> */}
            {/* <TEInput
              type="text"
              label="Enter OTP"
              className="mb-6"
              size="lg"
              value={otp} onChange={(e) => setOtp(e.target.value)}
            ></TEInput> */}
            

            

            {/* <!-- Submit button --> */}

            
              {/* <button
                type="button"
                className="inline-block w-full rounded bg-[#20B486] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={handleActivation}              
              >
                Activate
              </button>
             */}

           
           
          {/* </form> */}
          <div className='animate-shake flex justify-center'>
            <img src="https://img.icons8.com/bubbles/2x/gmail.png" alt="" />
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M215.4 96H144 107.8 96v8.8V144v40.4 89L.2 202.5c1.6-18.1 10.9-34.9 25.7-45.8L48 140.3V96c0-26.5 21.5-48 48-48h76.6l49.9-36.9C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L339.4 48H416c26.5 0 48 21.5 48 48v44.3l22.1 16.4c14.8 10.9 24.1 27.7 25.7 45.8L416 273.4v-89V144 104.8 96H404.2 368 296.6 215.4zM0 448V242.1L217.6 403.3c11.1 8.2 24.6 12.7 38.4 12.7s27.3-4.4 38.4-12.7L512 242.1V448v0c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64v0zM176 160H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg> */}
          </div>
          <p className='text-sm text-gray-500 text-center '> Only login to your account after activating the link send to your mail</p>
          <button className='border w-full p-2 mt-3 bg-[#20B486]' onClick={()=>navigate('/login')}>Login Now</button>
        </div>
      </div>
    </div>
  </section>
    </div>
  )
}

export default OtpPage