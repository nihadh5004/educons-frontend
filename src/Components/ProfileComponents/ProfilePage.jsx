import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Store/BaseUrl";
import { Spinner } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axiosInstance from "../../Store/AxiosInterceptor";
import { useNavigate } from "react-router";
import loadinglottie from '../Animation/loading.json'
import Lottie  from 'lottie-react';
import toast, { Toaster } from 'react-hot-toast';
import {  useDispatch } from "react-redux";
import { updateUsername } from "../../Store/Redux/Actions/UserAction";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, username, role, student, premium } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProfilePic, setIsProfilePic] = useState(false);
  useEffect(() => {
    const fetchProfileData = async () => {
      
      
      try {
        const accessToken = localStorage.getItem('accessToken');
       
        const response = await axiosInstance.get(
          `${baseUrl}/profile/?username=${username}`
          
        );
        setProfileData(response.data);
        setSelectedImage(response.data.image);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [isProfilePic]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    contact: "",
  });

  const handleCameraIconClick = () => {
    // Trigger the file input element to open the file picker dialog
    window.fileInput.click();
  };

  const handleFileInputChange = async (event) => {
    const selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("username", username);

    try {
      const response = await axios.post(
        `${baseUrl}/upload-profile-pic/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // File upload successful
        console.log("File uploaded successfully");
        setSelectedImage(URL.createObjectURL(selectedFile));
        setIsProfilePic(true);
        // Handle the response data if needed
      } else {
        // File upload failed
        console.error("File upload failed");
        // Handle the error
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("File upload error:", error);
    }

    // setIsUploadingPhoto(true);
  };


  // Update `editFormData` when `profileData` changes
  useEffect(() => {
    setEditFormData({
      username: profileData.username,
      email: profileData.email,
      contact: profileData.phone,
    });
  }, [profileData]);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${baseUrl}/update-profile/${profileData.id}/`,
        editFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status ==200){

        setProfileData(response.data);
        console.log(response.data.username);
        dispatch(updateUsername(response.data.username))
        closeEditModal();
      }else{
        toast.error(response.message);

      }

    } catch (error) {
      toast.error('username already exists');

      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center  p-16 h-[500px]">
       <Lottie animationData={loadinglottie} className="w-1/6"/>
      </div>
    );
  }

  return (
    <div className="md:p-16 p-3 bg-[#E9F8F3B2]">
      <div className="p-7 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {selectedImage ? ( // Check if an image is selected
                <img
                  src={`${baseUrl}${selectedImage}`}
                  alt="Profile"
                  className="w-48 h-48 mx-auto rounded-full shadow-2xl object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                  onClick={handleCameraIconClick}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 17l-2 4 4-2 9-9-2-2-9 9zM14 9l1-1-4-4-1 1v2h2v2z"
                  />
                </svg>
              )}
              {/* Add camera icon */}
              <div className="bg-black ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="h-9 w-6 absolute right-0 bottom-0  m-2 "
                  onClick={handleCameraIconClick}
                  style={{ cursor: "pointer", transform: "rotate(0deg)" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
                ref={(input) => input && (window.fileInput = input)}
              />
            </div>
          </div>

          <div className=" md:flex  justify-between mt-32 md:mt-0 md:justify-center">
            <div className=" p-2 md:ml-2 mt-2 ">
              <button onClick={()=>navigate('/saved-blogs')} ><a  class="px-5 py-2.5 relative rounded group overflow-hidden font-medium  bg-[#E9F8F3B2] text-black inline-block">
<span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#20B486] group-hover:h-full opacity-90"></span>
<span class="relative group-hover:text-white">Saved Items</span>
</a></button>
            </div>
            <div className=" p-2  md:ml-2 mt-2 ">
              <button onClick={openEditModal}>
                <a class="px-5 py-2.5 relative rounded group overflow-hidden font-medium  bg-[#E9F8F3B2] text-black inline-block">
                  <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#20B486] group-hover:h-full opacity-90"></span>
                  <span class="relative group-hover:text-white">
                    Edit Profile
                  </span>
                </a>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center pb-12">
          <div className=" flex justify-center">
            <h1 className="text-4xl font-medium text-gray-700">
              {profileData.username}
            </h1>
            {premium && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="parisGreen"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6 mt-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            )}
          </div>
          <p className="font-light text-gray-600 mt-3">
            Email : {profileData.email}
          </p>
          <p className="font-light text-gray-600 mt-3">
            Contact : {profileData.phone}
          </p>
          <p className="font-light text-gray-600 mt-3">India</p>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="modal fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-content bg-white w-96 md:w-[920px] md:h-[600px] md:mt-11 p-4 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <h4
              onClick={closeEditModal}
              className="cursor-pointer text-red-300"
            >
              Close
            </h4>
          </div>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label
                htmlFor="editUsername"
                className="block text-sm font-semibold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="editUsername"
                name="username"
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={editFormData.username}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editEmail"
                className="block text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="editEmail"
                name="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={editFormData.email}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editContact"
                className="block text-sm font-semibold mb-2"
              >
                Contact
              </label>
              <input
                type="text"
                id="editContact"
                name="contact"
                placeholder="Contact"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={editFormData.contact}
                onChange={handleEditInputChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Save Changes
            </button>
          </form>
        </div>
      </Modal>
      <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 3000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    </div>
  );
};

export default ProfilePage;
