import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Store/BaseUrl';
import { Spinner } from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
const ProfilePage = () => {
  const { isAuthenticated, username, role } = useSelector((state) => state.user);

  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/profile/?username=${username}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setProfileData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  // console.log(profileData.username);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    contact: '',
  });
 
  const [selectedImage, setSelectedImage] = useState(null);
  const[isProfilePic,setIsProfilePic]=useState(false)
  const handleCameraIconClick = () => {
    // Trigger the file input element to open the file picker dialog
    window.fileInput.click();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(selectedFile));
    setIsProfilePic(true)
    setIsUploadingPhoto(true);
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

      console.log("Profile updated successfully:", response.data);
      setProfileData(response.data);

      closeEditModal();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-16 h-[900px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="md:p-16 p-3 bg-[#E9F8F3B2]">
      <div className="p-7 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="relative">
          <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
          {isProfilePic ? ( // Check if an image is selected
    <img src={selectedImage} alt="Profile" className="w-48 h-48 mx-auto rounded-full shadow-2xl object-cover" />
  ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-54 w-24" onClick={handleCameraIconClick}
        style={{ cursor: 'pointer' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>

  

   
      )}
            {/* Add camera icon */}
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-8 w-8 absolute right-0 bottom-0 m-2 "  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={handleCameraIconClick}
                          style={{ cursor: 'pointer' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
                ref={(input) => input && (window.fileInput = input)}
              />
          </div>

          </div>

          <div className=" md:flex  justify-between mt-32 md:mt-0 md:justify-center">
            <div className='border p-2 mt-2 hover:bg-[#E9F8F3B2]'>
              <button >Applications</button>
            </div>
            <div className='border p-2 md:ml-2 mt-2 hover:bg-[#E9F8F3B2]'>
              <button >Rewards</button>
            </div>
            <div className='border p-2  md:ml-2 mt-2 hover:bg-[#E9F8F3B2]'>
              <button onClick={openEditModal}>Edit Profile</button>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center  pb-12">
          <h1 className="text-4xl font-medium text-gray-700">{profileData.username}</h1>
          <p className="font-light text-gray-600 mt-3">Email : {profileData.email}</p>
          <p className="font-light text-gray-600 mt-3">Contact : {profileData.phone}</p>
          <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p>

          <p className="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
          <p className="mt-2 text-gray-500">University of Computer Science</p>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="modal fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-content bg-white w-96 md:w-[920px] md:h-[600px] md:mt-11 p-4 rounded-lg shadow-lg">
          <div className='flex justify-between'>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <h4 onClick={closeEditModal} className='cursor-pointer text-red-300'>Close</h4>
          </div>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label htmlFor="editUsername" className="block text-sm font-semibold mb-2">
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
              <label htmlFor="editEmail" className="block text-sm font-semibold mb-2">
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
              <label htmlFor="editContact" className="block text-sm font-semibold mb-2">
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
    </div>
  )
}

export default ProfilePage;
