import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../Store/BaseUrl';
import {useNavigate} from 'react-router-dom'
import { useSelector ,useDispatch } from 'react-redux';

const AddCourseFormPage = () => {
  // Local state for form fields
  const { userId } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    course_type: '',
    image: null,
    duration: 0,
    description: '',
    is_active: true,
  });

  // Local state for college and course type options
  const [options, setOptions] = useState({
    countries: [],
    courseTypes: [],
    colleges: [],
  });

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send files
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('college', formData.college);
    formDataToSend.append('course_type', formData.course_type);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('duration', formData.duration);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('is_active', formData.is_active);
    formDataToSend.append('user_id', userId);

    try {
      // Send a POST request to the backend to add the course
      const response = await axios.post(`${baseUrl}/add_course/`, formDataToSend,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success, e.g., show a success message
      console.log('Course added successfully:', response.data);

      // Reset the form
      setFormData({
        name: '',
        college: '',
        course_type: '',
        image: null,
        duration: 0,
        description: '',
        is_active: true,
      });
      navigate('/consultancy-courses')
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error adding course:', error);
    }
  };

  useEffect(() => {
    // Define a function to fetch filter list data
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/filterview/`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include credentials if needed
        });

        // Assuming the API response contains the filter data
        setOptions({
          countries: response.data.countriesData,
          courseTypes: response.data.coursetypeData,
          colleges: response.data.collegesData,
        });
      } catch (error) {
        console.error('Error fetching filter data:', error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchOptions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Course Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        {/* College Dropdown */}
        <div>
          <label htmlFor="college" className="block text-sm font-medium text-gray-700">
            Select College
          </label>
          <select
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          >
            <option value="">Select College</option>
            {options.colleges.map((college) => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>

        {/* Course Type Dropdown */}
        <div>
          <label htmlFor="course_type" className="block text-sm font-medium text-gray-700">
            Select Course Type
          </label>
          <select
            id="course_type"
            name="course_type"
            value={formData.course_type}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          >
            <option value="">Select Course Type</option>
            {options.courseTypes.map((courseType) => (
              <option key={courseType.id} value={courseType.id}>
                {courseType.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
        </label>
        <label className="mt-1 p-7 block w-full border border-gray-300 border-dotted rounded-md focus:ring focus:ring-blue-200 focus:outline-none cursor-pointer">
            <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            />
            <div className='flex '>
            <div>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

            </div>
            Choose File
            </div>

        </label>
        </div>


        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (in Years)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          ></textarea>
        </div>

        {/* Is Active */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={() => setFormData({ ...formData, is_active: !formData.is_active })}
            className="mr-2 mt-1 focus:ring focus:ring-blue-200"
          />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
            Is Active
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseFormPage;
