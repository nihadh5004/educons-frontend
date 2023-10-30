import React, { useEffect, useState } from 'react';
import Table from '../../AdminComponents/ConsultantRequestComponents/Table';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import Axios
import { baseUrl } from '../../../Store/BaseUrl';
import axiosInstance from '../../../Store/AxiosInterceptor';
const StudentListPage = () => {
  const { userId } = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Define a function to fetch the consultant's students list
    const fetchConsultantStudents = async () => {
      try {
        // Make an API request to fetch the consultant's students list
        const response = await axiosInstance.get(`${baseUrl}/consultant-students/${userId}`); // Replace with your API endpoint
        
        // Update the state with the fetched students list
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching consultant students:', error);
      }
    };

    // Call the fetchConsultantStudents function
    fetchConsultantStudents();
  }, [userId]); // Run the effect whenever userId changes

  return (
    <div>
      {/* Render the students list using the Table component */}
      <Table consultantRequests={students} is_admin={false}/>
    </div>
  );
};

export default StudentListPage;
