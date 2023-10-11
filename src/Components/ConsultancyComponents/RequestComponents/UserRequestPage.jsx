import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../Store/BaseUrl';

const UserRequestPage = () => {
  const { userId } = useSelector((state) => state.user);
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user-requests/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setUserRequests(response.data.user_requests);
        console.log(response.data.user_requests);
      } catch (error) {
        console.error('Error fetching user requests:', error);
      }
    };

    fetchUserRequests();
  }, [userId]);

  return (
    <div className='md:p-11 p-2 md:mt-1 mt-4 bg-[#e4f5eb] h-screen'>
        {userRequests.map((request) => (
      <div className='border p-2 md:p-4 rounded-xl mt-3 shadow-lg bg-white'>

          <div key={request.id}  >
            <div className='flex justify-between'>
              <h1>Username: {request.user.username}</h1>
              <h1 className='mr-4'>contact: {request.user.phone}</h1>
            </div>
            <h1 className='mr-5 mt-2'>Email: {request.user.email}</h1>
            <h3 className='mt-2'>Course: {request.course.name}</h3>
            </div>
      </div>
        ))}
    </div>
  );
}

export default UserRequestPage;
