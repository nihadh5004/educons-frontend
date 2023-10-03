import React, { useState, useEffect } from 'react';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import Axios
import { baseUrl } from '../../Store/BaseUrl';

const BlogSave = ({ blogId }) => {
  const username = useSelector((state) => state.user.username);
  const [isSaved, setIsSaved] = useState(false); // State to track if the blog is saved

  // Function to check if the blog is saved
  const checkIfBlogIsSaved = async () => {
    try {
      const response = await axios.get(`${baseUrl}/checksave/?blogId=${blogId}&username=${username}`);
      setIsSaved(response.data.isSaved);
    } catch (error) {
      console.error('Error checking if the blog is saved:', error);
    }
  };

  useEffect(() => {
    checkIfBlogIsSaved(); // Check if the blog is saved when the component mounts
  }, []); // Empty dependency array to ensure this effect runs only once

  const handleSave = async () => {
    try {
      // Send a POST request to your API to save the blog
      const response = await axios.post(`${baseUrl}/blogsave/`, {
        blogId: blogId,
        username: username,
      });
  
      // Check the response status
      if (response.status === 200) {
        setIsSaved(false); // Blog was removed, set saved state to false
      } else if (response.status === 201) {
        setIsSaved(true); // Blog was saved, set saved state to true
      }
    } catch (error) {
      console.error('Error saving/removing the blog:', error);
    }
  };
  
  return (
    <div>
      {isSaved ? (
        <BsBookmarkFill
          size={20}
          className="mr-11 cursor-pointer"
          onClick={handleSave}
        />
      ) : (
        <BsBookmark
          size={20}
          className="mr-11 cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default BlogSave;
