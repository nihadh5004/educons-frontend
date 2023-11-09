import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaymentDrawer from "../PaymentComponents/PaymentDrawer";
import loadinglottie from '../Animation/loading.json'
import Lottie  from 'lottie-react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { baseUrl } from "../../Store/BaseUrl";
import axios from "axios";
import { w3cwebsocket as WebSocket } from "websocket";
import { useNavigate } from "react-router";
const ChatStudentsPage = () => {
  const { premium } = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);
  const [wsClient, setWsClient] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch the list of students from your API when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/student-chat-list/`);
        setStudents(response.data);
        setIsLoading(false); // Set loading state to false when data is fetched

      } catch (error) {
        console.error("Error fetching students:", error);
        setIsLoading(false); // Set loading state to false on error

      }
    };

    fetchStudents();
  }, []);



  return (
    <div className={`p-12 bg-${isLoading ? 'white' : '[#e4f5eb]'} flex flex-wrap h-screen`}>
      {isLoading ? (
          <div className="flex justify-center items-center  p-16 h-[500px]">
          <Lottie animationData={loadinglottie} className="w-1/6 " />
         </div>
        ) : (
          <div>

      {students.map((student) => (
        <Card className="md:w-96  h-[400px] md:ml-12" key={student.id}>
          <CardHeader floated={false} className="h-50">
            <img src={`${baseUrl}${student.image}`} alt="profile-picture" />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {student.username}
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              {student.email}
            </Typography>
            {premium ? (
              <div>
                <button
                  className="mt-3"
                  onClick={() =>
                    navigate(
                      `/chat-page?student_id=${student.id}&student_name=${student.username}`
                    )
                  }
                >
                  <a class="relative inline-flex items-center justify-center p-4 px-14 py-2 overflow-hidden font-medium text-[#20B486] transition duration-300 ease-out border-2 border-[#20B486] rounded-sm shadow-md group">
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#20B486] group-hover:translate-x-0 ease">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span class="absolute flex items-center justify-center w-full h-full text-[#20B486] transition-all duration-300 transform group-hover:translate-x-full ease">
            Chat with {student.username} 
          </span>
          <span class="relative invisible">Chat </span>
        </a>
                </button>
              </div>
            ) : (
              <PaymentDrawer />
            )}
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">
            <Tooltip content="Like">
              <Typography
                as="a"
                href="#facebook"
                variant="lead"
                color="blue"
                textGradient
              >
                <i className="fa fa-facebook" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#twitter"
                variant="lead"
                color="light-blue"
                textGradient
              >
                <i className="fa fa-twitter" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#instagram"
                variant="lead"
                color="purple"
                textGradient
              >
                <i className="fa fa-instagram" />
              </Typography>
            </Tooltip>
          </CardFooter>
        </Card>
      ))}
                </div>

        )}
    </div>
  );
};

export default ChatStudentsPage;
