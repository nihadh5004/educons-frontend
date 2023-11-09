import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseUrl } from '../../../Store/BaseUrl';
const EditCourseModal = ({ course,courseId, image, college, duration, country, description, closeModal ,updateChanges }) => {
  const [editedCourse, setEditedCourse] = useState({
    course: course,
    image: image,
    college: college,
    duration: duration,
    country: country,
    description: description,
    previewImage:image,
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse({ ...editedCourse, [name]: value });
  };

  // Function to handle image input changes
  const handleImageChange = (e) => {
      const imageFile = e.target.files[0];
      setEditedCourse({ ...editedCourse, image: imageFile ,previewImage: URL.createObjectURL(imageFile),});
    
      // // Read the selected file and set it as the image URL
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setEditedCourse({ ...editedCourse, previewImage: reader.result });
      // };
      // reader.readAsDataURL(file);
    
   
     
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Create a new FormData object
  
      // Append the course details to the FormData object
      formData.append('courseId', courseId);
      formData.append('course', editedCourse.course);
      formData.append('college', editedCourse.college);
      formData.append('duration', editedCourse.duration);
      formData.append('country', editedCourse.country);
      formData.append('description', editedCourse.description);
  
      // Append the image file to the FormData object
      // if (editedCourse.image instanceof File) {
        formData.append('image', editedCourse.image);
      // }
      console.log(editedCourse.image);
      const response = await axios.post(`${baseUrl}/edit-course/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to 'multipart/form-data'
        },
        withCredentials: true,
      });
  
      // Check if the response status is successful (you may need to customize this)
      if (response.status === 200) {
        updateChanges();
        closeModal();
      } else {
        // Handle error or show an error message to the user
        console.error('Edit course failed:', response.data);
      }
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };
  

  return (
    <Modal isOpen={true} onRequestClose={closeModal} contentLabel="Edit Course Modal">
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
        <div className="mb-4">
          <label htmlFor="course" className="block text-gray-700 font-semibold">Course Name:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={editedCourse.course}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            required

          />
        </div>
       
        <div className="mb-4">
          <label htmlFor="college" className="block text-gray-700 font-semibold">College:</label>
          <input
            type="text"
            id="college"
            name="college"
            value={editedCourse.college}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700 font-semibold">Duration:</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={editedCourse.duration}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
            min="1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700 font-semibold">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={editedCourse.country}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            required

          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Image Preview:</label>
          <img
            src={editedCourse.previewImage}
            alt="Course"
            className="w-32 h-32 object-cover border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageFile" className="block text-gray-700 font-semibold">Upload New Image:</label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold">Description:</label>
          <textarea
            id="description"
            name="description"
            value={editedCourse.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            required

          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Save Changes
          </button>
          <button type="button" onClick={closeModal} className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 focus:outline-none focus:bg-gray-500">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCourseModal;
