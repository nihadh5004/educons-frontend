import React, { useEffect, useState } from "react";
import senecaImg from "../../assets/Seneca-4.png";
import axios from "axios";
import { baseUrl } from "../../Store/BaseUrl";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const [courseDetails, setCourseDetails] = useState({
    course: [],
    collegeName: "",
    courseType: "",
    country: [],
    costOfStudying: "",
  });
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  useEffect(() => {
    // Fetch course details data using axios and your API endpoint
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/course-details/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setCourseDetails({
          course: response.data,
          collegeName: response.data.college.name,
          courseType: response.data.course_type.name,
          country: response.data.college.country,
          costOfStudying: response.data.college.country.cost_of_studying,
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, []);

  const data = [
    {
      label: "Admission Requirements",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Cost of Studying",
      value: "angular",
      desc: `${courseDetails.costOfStudying}`,
    },
    {
      label: "Country Informations",
      value: "svelte",
      desc: `${courseDetails.country.about} `,
    },
  ];

  console.log(courseDetails.collegeName);

  const handleUserRequest = async () => {
    if(userId ==""){
      navigate('/login')
      return
    }
    try {
      // Create a request object with the user's ID and the course's ID
      const requestData = {
        user: userId,
        course: id,
      };

      // Send a POST request to your API endpoint to create the UserRequest
      const response = await axios.post(
        `${baseUrl}/create-user-request/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Check the response status and handle it as needed
      if (response.status === 201) {
        toast.success("Request sent successfully");

        console.log("Request created successfully");
      } else if (response.status == 400) {
        toast.error("Request already sent");

        // Handle other status codes, such as validation errors
      }else{
        toast.error("internal server error");

        console.error("Request creation failed with status:", response.status);

      }
    } catch (error) {
      toast.error("Request already has been sent");
      console.error("Error creating request:", error);
    }
  };

  return (
    <div>
      <div className="md:flex justify-center   mt-4 md:p-0 p-2">

      <div className="p-4  md:mt-4  border-b mb-3 border-gray-500  md:w-2/3 flex justify-center">
        <div>

                      <h1 className="md:text-4xl text-2xl font-semibold">
                        {courseDetails.course.name}
                      </h1>
                       <h5 className="text-gray-600 text-center w-full">{courseDetails.collegeName}</h5>
        </div>
        </div>
      </div>
      <div className="md:flex ">
       <div className="md:w-2/3 md:p-0 p-2 ">

        

        <div className="md:px-16 py-3 p-2 mt-3">
          <p className="text-2xl font-bold">About</p>
          <p className="text-md">{courseDetails.course.description}</p>
        </div>

        <div className="md:px-16 py-3 p-2 mt-3">
          <h1 className="text-2xl font-bold">Cost of Studying</h1>
          <p className="text-md">{courseDetails.costOfStudying}</p>
        </div>

        <div className="md:px-16 py-3 p-2 mt-3">
          <h1 className="text-2xl font-bold">Country Informations</h1>
          <p className="text-md">{courseDetails.country.about}</p>
        </div>

        <div className="md:px-16 py-3 p-2 mt-3">
          <p className="text-2xl font-bold">How to apply?</p>
          <p className="text-md">
            Once you’ve done your research and identified the scholarships that
            you are interested in, it’s time to complete the applications.
            Remember that most are competitive, so there’s no guarantee that,
            however good a match you think you are, that you will be successful.
            It’s sensible to apply for more than you need. So to help you stand
            out from other applicants we're here.{" "}
          </p>
          
          
        </div>
       
       </div>

        <div className="md:w-1/3  ml-auto p-5 shadow-lg mr-3">

              <img
                src={`${baseUrl}${courseDetails.course.image}`}
                alt=""
                className="md:h-[300px] h-[400px] w-full "
              />
              <div className="bg-white-500 "> 
              

              <div className="p-3">
                <h1 className="md:text-lg text-sm font-semibold">Duration</h1>
                <p>{courseDetails.course.duration} Years</p>
              </div>

              <div className="p-3">
              <h1 className="md:text-lg text-sm font-semibold">Cost</h1>
              <p>$22000</p>
            </div>

            <div className="p-3">
              <h1 className="md:text-lg text-sm font-semibold">Course type</h1>
              <p>{courseDetails.courseType}</p>
            </div>

            

            <button className="px-4 py-2 mt-9 mb-7 " onClick={handleUserRequest}>
          <a class="relative inline-flex w-full items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">Request Callback</span>
          </a>
        </button>


              </div>
        </div>
      </div>
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
    </div>
  );
};

export default CourseDetailPage;
