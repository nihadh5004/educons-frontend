import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Spinner } from "@material-tailwind/react";
import BlogPageCard from "./BlogPageCard";
import BlogFilter from "./BlogFilter";
import CoursePagination from "../CoursesComponents/CoursePagination";
import { baseUrl } from "../../Store/BaseUrl";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import blogImage from '../../assets/Creative thinking.gif'
import swingImage from '../../assets/girl_on_a_swing.jpg'
const BlogPage = ({ is_admin }) => {
  const [blogs, setBlogs] = useState([]); // State variable to store the blog data
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable for the modal
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [trigger, setTrigger] = useState(false); // Add a trigger state variable
  const username = useSelector((state) => state.user.username);
  const student = useSelector((state) => state.user.student);
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
    username: "",
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
        const filteredBlogs = is_admin
          ? response.data
          : response.data.filter((blog) => blog.is_active);
        // Assuming the API response is an array of blogs
        setBlogs(filteredBlogs);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setIsLoading(false);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchBlogs();
  }, [trigger]); // Empty dependency array to ensure the request is made only once

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
      const response = await axios.post(
        `${baseUrl}/submit-blog/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response as needed
      console.log("Blog submitted successfully:", response.data);

      // Close the modal after successful submission
      closeModal();
      setTrigger((prevTrigger) => !prevTrigger);
    } catch (error) {
      console.error("Error submitting the blog:", error);
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
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.heading?.toLowerCase().includes(searchQuery?.toLowerCase() ?? "") ||
      blog.username?.toLowerCase().includes(searchQuery?.toLowerCase() ?? "")
  );

  // Implement pagination using slice
  const indexOfLastBlog = active * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="bg-[#F2F5EB]">
      <div className="relative w-full">
        <div className=" md:h-[507px] h-[300px]  w-full flex bg-white">
          <div className="md:w-1/2">
              <img src={swingImage} alt="" className="md:w-2/3 h-full " />
          </div>

  {/* <img
    src={blogImage}
    alt=""
    className=" h-full ml-auto "
  /> */}
        </div>
  <div className="absolute top-0 left-0  md:w-[1450px] w-[400px]   md:ml-16 ml-3 md:flex justify-between p-2">
    {!is_admin && (
      <div>
      <button className=" ml-2  mt-4  " onClick={openModal}>
        <a
          
          class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
        >
          <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#20B486] group-hover:h-full"></span>
          <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg
              class="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span class="relative w-full text-left text-[#20B486] transition-colors duration-200 ease-in-out group-hover:text-white">
            Add Blog
          </span>
        </a>
      </button>
    </div>
    )}
    <form
          action=""
          className="bg-white border md:w-[350px] md:mt-4 md:p-2 p-2 mb-2 mr-11 mt-36 shadow-lg rounded-lg ml-auto flex justify-between"
        >
          <input
            className="bg-white w-full outline-none focus:outline-none"
            type="text"
            placeholder="Search for blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa fa-search fa-lg mt-1"></i>
        </form>
  </div>
</div>


      <div className="md:flex flex-wrap gap-5 md:p-2 p-4 md:ml-16 mt-5">
        {isLoading ? (
          <div className="flex justify-center p-16 h-[900px]">
            <Spinner />
          </div>
        ) : (
          currentBlogs.map((blog) => (
            <BlogPageCard
              key={blog.id}
              id={blog.id}
              heading={blog.heading}
              user={blog.username}
              image={`${baseUrl}${blog.image}`}
              created_at={blog.created_date}
              content={blog.truncated_content}
              is_admin={is_admin}
            />
          ))
        )}
      </div>
      <div className="flex justify-center p-6">
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
            <strong className="text-gray-900">
              {Math.ceil(filteredBlogs.length / blogsPerPage)}
            </strong>
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
        {student ? (
          <div className="modal-content bg-white w-96 md:w-[920px] md:h-[600px] md:mt-11 mt-16 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Add Blog</h2>
              <h4 onClick={closeModal} className="cursor-pointer text-red-300">
                Close
              </h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="blogHeading"
                  className="block text-sm font-semibold mb-2"
                >
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
                <label
                  htmlFor="blogImage"
                  className="block text-sm font-semibold mb-2"
                >
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
                <label
                  htmlFor="blogContent"
                  className="block text-sm font-semibold mb-2"
                >
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
        ) : (
          <div className="modal-content bg-white w-96 md:w-[920px] md:h-[200px] md:mt-11 mt-16 p-4 rounded-lg shadow-lg">
            <div className="flex">
              <h4
                onClick={closeModal}
                className=" cursor-pointer text-red-300 ml-auto"
              >
                Close
              </h4>
            </div>

            <div className="  ">
              <h1 className="mt-5">
                Sorry, We only allow our international students to write blogs
                here , If you are interested in studying abroad just explore our
                website , for any enqueries we're here to assist you.
              </h1>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogPage;
