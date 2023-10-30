import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import { baseUrl } from "../../Store/BaseUrl";
import { useSelector } from "react-redux"; 
import BlogPageCard from "../BlogComponents/BlogPageCard";
import NavBar from "../NavBar";
import axiosInstance from "../../Store/AxiosInterceptor";
const SavedBlogs = () => {
    const [blogs, setBlogs] = useState([]); // State variable to store the blog data
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector((state) => state.user.userId);
    const is_admin=false
    useEffect(() => {
        const fetchBlogs = async () => {

          try {
            const response = await axiosInstance.get(`${baseUrl}/saved-blogs/${userId}/`,);
            const filteredBlogs = is_admin
              ? response.data
              : response.data.filter((blog) => blog.blog.is_active);
            // Assuming the API response is an array of blogs
            setBlogs(response.data);
            console.log(filteredBlogs);
            setIsLoading(false);
          } catch (error) {
            console.error("Error fetching blogs:", error);
            setIsLoading(false);
          }
        };
    
        // Call the function to fetch data when the component mounts
        fetchBlogs();
      }, []); // Empty dependency array to ensure the request is made only once
  return (

    <div className="bg-gray-200 h-screen">
           <NavBar/>
        <div className="md:flex flex-wrap gap-5 md:p-2 p-4 md:ml-16 mt-5">
        {isLoading ? (
          <div className="flex justify-center p-16 h-[900px]">
            <Spinner />
          </div>
        ) : (
            <div>

                <h1 className="font-bold text-xl md:ml-5 mb-3">Saved Blogs</h1>
                <div className="md:flex md:flex-wrap gap-4">

                {blogs.map((blog) => 

                <BlogPageCard
                  key={blog.blog.id}
                  id={blog.blog.id}
                  heading={blog.blog.heading}
                  user={blog.blog.username}
                  image={`${baseUrl}${blog.blog.image}`}
                  created_at={blog.blog.created_date}
                  content={blog.blog.truncated_content}
                  is_admin={false}
                />
            )}
                </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default SavedBlogs