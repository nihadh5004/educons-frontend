import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from '@material-tailwind/react';
import { baseUrl } from '../../Store/BaseUrl';
import axios from 'axios';
import { w3cwebsocket as WebSocket } from 'websocket';
import { useNavigate } from 'react-router';
const ChatStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [wsClient, setWsClient] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the list of students from your API when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/student-chat-list/`);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Function to open a WebSocket connection


  // Cleanup function to close the WebSocket connection
 

  return (
    <div className='p-12 bg-[#e4f5eb] h-screen '>
      <Button className='mb-3 ml-12 '>Chats</Button>
      {students.map((student) => (
        <Card className='w-96 ml-12' key={student.id}>
          <CardHeader floated={false} className='h-50'>
            <img src={`${baseUrl}${student.image}`} alt='profile-picture' />
          </CardHeader>
          <CardBody className='text-center'>
            <Typography variant='h4' color='blue-gray' className='mb-2'>
              {student.username}
            </Typography>
            <Typography color='blue-gray' className='font-medium' textGradient>
              {student.email}
            </Typography>
            <Button
              className='mt-3'
              onClick={() => navigate(`/chat-page?student_id=${student.id}`)}
            >
              Message
            </Button>
          </CardBody>
          <CardFooter className='flex justify-center gap-7 pt-2'>
            <Tooltip content='Like'>
              <Typography
                as='a'
                href='#facebook'
                variant='lead'
                color='blue'
                textGradient
              >
                <i className='fa fa-facebook' />
              </Typography>
            </Tooltip>
            <Tooltip content='Follow'>
              <Typography
                as='a'
                href='#twitter'
                variant='lead'
                color='light-blue'
                textGradient
              >
                <i className='fa fa-twitter' />
              </Typography>
            </Tooltip>
            <Tooltip content='Follow'>
              <Typography
                as='a'
                href='#instagram'
                variant='lead'
                color='purple'
                textGradient
              >
                <i className='fa fa-instagram' />
              </Typography>
            </Tooltip>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ChatStudentsPage;
