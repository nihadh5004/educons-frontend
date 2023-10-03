import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseUrl } from '../../../Store/BaseUrl';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    marginTop: '40px',
    transform: 'translate(-50%, -50%)',
    width: '66%',
    zIndex: 49, // 2/3 of the screen width
  },
};

const AddCountryModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    description: '',
    advantages: '',
    imageFile: null, // Store the selected image file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imageFile: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData(); // Create a FormData object
      formDataToSend.append('name', formData.name);
      formDataToSend.append('about', formData.about);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('advantages', formData.advantages);
      formDataToSend.append('image', formData.imageFile);

      // Send a POST request to the backend endpoint 'addcountry' with the form data
      const response = await axios.post(`${baseUrl}/addcountry/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for form data
        },
      });

      // Handle the response as needed, e.g., close the modal or show a success message
      console.log('Country added successfully:', response.data);

      // Close the modal
      onRequestClose();
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error adding country:', error);
    }
  };
  return (
    <div className='z-50'>

   
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add Country Modal"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add New Country</h2>
        <button
          className="text-red-500 hover:text-red-700 focus:outline-none"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name">Name:</label>
          <div className="w-full border border-black rounded">

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full  border-black rounded "

          />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="about">About:</label>
            <div className="w-full border border-black rounded">
                <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleChange}
                required
                className="w-full p-2 border-none rounded outline-none"
                />
            </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description">Description:</label>
          <div className="w-full border border-black rounded">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border-none rounded outline-none"
          />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="advantages">Advantages:</label>
          <div className="w-full border border-black rounded">

          <textarea
            id="advantages"
            name="advantages"
            value={formData.advantages}
            onChange={handleChange}
            required
            className="w-full p-2 border-none rounded outline-none"

          />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="imageFile">Upload Image:</label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*" // Allow only image files
            onChange={handleImageChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </Modal>
    </div>
  );
};

export default AddCountryModal;
