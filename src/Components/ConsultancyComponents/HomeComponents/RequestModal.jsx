import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseUrl } from '../../../Store/BaseUrl';
import { useSelector ,useDispatch } from 'react-redux';

const RequestModal = ({ isOpen, onClose }) => {
    const { userId } = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    userId: userId,
    username: '',
    courseId: '',
    intakeMonth: '',
    intakeYear: '',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseUrl}/consultant-courses/`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/submit-request/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // Handle success or display a success message to the user
      console.log('Request submitted:', response.data);

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Request Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          },
          content: {
            width: '50%',
            height: 'auto',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
            padding: '20px',
          },
        }}
      >
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">Request for student</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <form onSubmit={handleSubmit}>
          <h1 className="mt-4">User Details</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full mt-3 p-2 border border-black"
            value={formData.username}
            onChange={handleInputChange}
            required
          />

          <h1 className="mt-4">Select Course</h1>
          <select
            name="courseId"
            className="w-full mt-3 p-2 border border-black"
            value={formData.courseId}
            onChange={handleInputChange}
            required
          >
            <option value="">--Select--</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} -- {course.college.name} ({course.college.country.name})
              </option>
            ))}
          </select>

          <h1 className="mt-4">Enter the Intake</h1>
          <div className="flex space-x-12 mt-3">
            <input
              type="text"
              name="intakeMonth"
              placeholder="Month"
              value={formData.intakeMonth}
              onChange={handleInputChange}
              className="border border-black p-2"
              required
            />
            <input
              type="text"
              name="intakeYear"
              placeholder="Year"
              value={formData.intakeYear}
              onChange={handleInputChange}
              className="border border-black p-2"
              required
            />
          </div>
          <div className="flex">
            <button type="submit" className="ml-auto mr-9 px-4 py-2 bg-green-500 rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RequestModal;
