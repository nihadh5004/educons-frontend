import React, { useState, useEffect } from 'react';
import Table from './Table'
import axios from 'axios'; // Import Axios
import { baseUrl } from '../../../Store/BaseUrl';

const ConsultantRequestPage = () => {
    const [consultantRequests, setConsultantRequests] = useState([]); // State to store consultant requests

    useEffect(() => {
        // Define a function to fetch consultant requests
        const fetchConsultantRequests = async () => {
          try {
            // Make an API request to fetch consultant requests
            const response = await axios.get(`${baseUrl}/get-consultant-request/`); // Replace with your API endpoint
            
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

      const handleApproveRequest = async (requestId) => {
        try {
          // Make an API request to approve the request with the given ID
          await axios.post(`${baseUrl}/approve-consultant-request/${requestId}/`); // Replace with your API endpoint for approving requests
    
          // If the request is successful, update the state
          const updatedRequests = consultantRequests.map((request) => {
            if (request.id === requestId) {
              // Update the is_approved field to true
              return { ...request, is_approved: true };
            }
            return request;
          });
    
          setConsultantRequests(updatedRequests);
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