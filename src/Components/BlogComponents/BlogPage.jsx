import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Spinner } from '@material-tailwind/react';
import BlogPageCard from './BlogPageCard';
import BlogFilter from './BlogFilter';
import CoursePagination from '../CoursesComponents/CoursePagination';
import { baseUrl } from '../../Store/BaseUrl';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { Button, IconButton,Typography  } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
const BlogPage = () => {
  const [blogs, setBlogs] = useState([]); // State variable to store the blog data
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable for the modal
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const username = useSelector(state => state.user.username);
  const student = true;
  const [active, setActive] = React.useState(1);
  const blogsPerPage = 2; 
  const next = () => {
    if (active === Math.ceil(blogs.length / blogsPerPage)) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };
  const [formData, setFormData] = useState({
    heading: "",
    image: null,
    content: "",
    username : "",
  }); // State variable to store the form data


  // Function to open the modal
const openModal = () => {
  setIsModalOpen(true);
};

// Function to close the modal
const closeModal = () => {
  setIsModalOpen(false);
};

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Replace 'YOUR_BLOG_API_ENDPOINT' with the actual API endpoint to fetch blogs
        const response = await axios.get(`${baseUrl}/blogs/`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        // Assuming the API response is an array of blogs
        setBlogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setIsLoading(false);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchBlogs();
  }, [closeModal]); // Empty dependency array to ensure the request is made only once

  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object to send the form data
    const formDataToSend = new FormData();
    formDataToSend.append("heading", formData.heading);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("username", username);

    try {
      // Send a POST request to your API to submit the blog data
      const response = await axios.post(`${baseUrl}/submit-blog/`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response as needed
      console.log("Blog submitted successfully:", response.data);

      // Close the modal after successful submission
      closeModal();
    } catch (error) {
      console.error('Error submitting the blog:', error);
    }
  };

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    // If the input is a file input, update the image property in formData
    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0], // Assuming you only select one image file
      });
    } else {
      // Otherwise, update the corresponding property in formData
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Filter blogs based on the search query (by heading and username)
  const filteredBlogs = blogs.filter((blog) =>
    blog.heading?.toLowerCase().includes(searchQuery?.toLowerCase() ?? '') ||
    blog.username?.toLowerCase().includes(searchQuery?.toLowerCase() ?? '')
  );
 
  // Implement pagination using slice
 const indexOfLastBlog = active * blogsPerPage;
 const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
 const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className='bg-[#F2F5EB]'>
      <div className='md:ml-16 ml-3 md:flex justify-between'>
        <button className='py-2 px-4 mt-4 border bg-gray-300' onClick={openModal}>
          Add Blog
        </button>
        <form
          action=""
          className='bg-white border max-w-[350px] md:p-2 p-2 mb-2 mr-5 mt-4 shadow-lg rounded-lg flex justify-between'
        >
          <input
            className='bg-white w-full outline-none focus:outline-none'
            type="text"
            placeholder="Search for blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa fa-search fa-lg mt-1"></i>
        </form>
      </div>
      <div className='md:flex flex-wrap gap-5 md:p-2 p-4 md:ml-16 mt-5'>
        {isLoading ? (
          <div className='flex justify-center p-16 h-[900px]'>
            <Spinner />
          </div>
        ) : (
          currentBlogs.map((blog) => (
            <BlogPageCard
              key={blog.id}
              id={blog.id}
              heading={blog.heading}
              user={blog.username}
              image={`${baseUrl}/${blog.image}`}
              created_at={blog.created_date}
              content={blog.truncated_content}
            />
          ))
        )}
      </div>
      <div className='flex justify-center p-6'>
      <div className="flex items-center gap-8">
    <IconButton
      size="sm"
      variant="outlined"
      onClick={prev}
      disabled={active === 1}
    >
      <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
    </IconButton>
    <Typography color="gray" className="font-normal">
      Page <strong className="text-gray-900">{active}</strong> of{" "}
      <strong className="text-gray-900">{Math.ceil(filteredBlogs.length / blogsPerPage)}</strong>
    </Typography>
    <IconButton
      size="sm"
      variant="outlined"
      onClick={next}
      disabled={active === 10}
    >
      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
    </IconButton>
  </div>      
  </div>

      {/* Modal for adding a blog */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        // Add modal styles and other props as needed
        className="modal fixed inset-0 flex items-center justify-center z-50"
      >
        {student ? 
        <div className="modal-content bg-white w-96 md:w-[920px] md:h-[600px] md:mt-11 mt-16 p-4 rounded-lg shadow-lg">
          <div className='flex justify-between'>
            <h2 className="text-xl font-bold mb-4">Add Blog</h2>
            <h4 onClick={closeModal} className='cursor-pointer text-red-300'>Close</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="blogHeading" className="block text-sm font-semibold mb-2">
                Blog Heading
              </label>
              <input
                type="text"
                id="blogHeading"
                name="heading"
                placeholder="Blog Heading"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={formData.heading}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="blogImage" className="block text-sm font-semibold mb-2">
                Blog Image
              </label>
              <input
                type="file"
                id="blogImage"
                name="image"
                accept="image/*"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="blogContent" className="block text-sm font-semibold mb-2">
                Blog Content
              </label>
              <textarea
                id="blogContent"
                name="content"
                placeholder="Blog Content"
                className="w-full px-3 h-[220px] py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={formData.content}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
        :
        <div className='modal-content bg-white w-96 md:w-[920px] md:h-[200px] md:mt-11 mt-16 p-4 rounded-lg shadow-lg'>

          
            <h4 onClick={closeModal} className='cursor-pointer text-red-300 ml-auto'>Close</h4>
          
        <div className='  '>
            <h1 className='mt-5'>Sorry, We only allow our international students to write blogs here , If you are interested in studying abroad just explore our website , for any enqueries we're here to assist you.</h1>
        </div>
        </div>
        }
      </Modal>
    </div>
  );
};

export default BlogPage;
