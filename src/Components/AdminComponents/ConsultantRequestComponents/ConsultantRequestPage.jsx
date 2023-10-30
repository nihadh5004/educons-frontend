import React, { useState, useEffect } from 'react';
import Table from './Table'
import axios from 'axios'; // Import Axios
import { baseUrl } from '../../../Store/BaseUrl';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../Store/AxiosInterceptor';

const ConsultantRequestPage = () => {
    const [consultantRequests, setConsultantRequests] = useState([]); // State to store consultant requests
    const { userId } = useSelector((state) => state.user);
    const [wsClient, setWsClient] = useState(null);
    const [isWsOpen, setIsWsOpen] = useState(false);
    useEffect(() => {
        // Define a function to fetch consultant requests
        const fetchConsultantRequests = async () => {
          try {
            // Make an API request to fetch consultant requests
            const response = await axiosInstance.get(`${baseUrl}/get-consultant-request/`); // Replace with your API endpoint
            
            console.log(response.data);
            // Update the state with the fetched consultant requests
            setConsultantRequests(response.data);
          } catch (error) {
            console.error('Error fetching consultant requests:', error);
          }
        };
    
        // Call the fetchConsultantRequests function
        fetchConsultantRequests();
      }, []); // Run the effect only once when the component mounts

      const handleApproveRequest = async (requestId,user) => { 
        const roomName = `${userId}_${user}`;
        const wsUrl = `wss://13.51.204.237/ws/notification/${roomName}/`;
        const client = new WebSocket(wsUrl);
        client.onopen = () => {
          console.log('WebSocket connection established');
          setIsWsOpen(true);
          setWsClient(client);
        };
        // client.onmessage = (message) => {
        //   console.log('Received WebSocket message:');
        //   const data = JSON.parse(message.data);
        //   console.log(data);
         
        //   // Handle incoming messages from the WebSocket
          
        // };
  
        client.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
  
        try {
         
          // Make an API request to approve the request with the given ID
          await axios.post(`${baseUrl}/approve-consultant-request/${requestId}/`); // Replace with your API endpoint for approving requests
          
          consultantRequests.map((request) => {
            if (request.id === requestId) {
              const message={
                text : request.user.username
              }
              // Update the is_approved field to true
              console.log(request.user.username); 
              // if (isWsOpen ) {
                client.send(JSON.stringify(message));
              // }
                     
              
            }
            
          });
          
          
          // If the request is successful, update the state
          const updatedRequests = consultantRequests.map((request) => {
            if (request.id === requestId) {
              // Update the is_approved field to true
              
              return { ...request, is_approved: true };
              
            }
            return request;
          });
    
          setConsultantRequests(updatedRequests);
          if (client) {
            client.close();
              
          }
        } catch (error) {
          console.error('Error approving request:', error);
        }
      };
    
    
  return (
    <div>
        <Table consultantRequests={consultantRequests} onApproveRequest={handleApproveRequest} is_admin={true}/>
    </div>
  )
}

export default ConsultantRequestPage