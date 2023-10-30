import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

import { baseUrl } from '../../Store/BaseUrl';
const BlogLikes = ({ blogId }) => {
  const [likesCount, setLikesCount] = useState(0); // State to store the likes count
  const [liked, setLiked] = useState(false); // State to track whether the user has already liked the blog
  const username = useSelector(state => state.user.username);

  // Function to fetch the likes count for the blog post
  const fetchLikesCount = async () => {
    try {
      const response = await axios.get(`${ baseUrl }/bloglikes/?blogId=${blogId}&username=${username}`);
      setLikesCount(response.data.likesCount);
      setLiked(response.data.userLiked);
    } catch (error) {
      console.error('Error fetching likes count:', error);
    }
  };

  // Function to handle the like action
  const handleLike = async () => {
    if (!username){
      setLiked(true)
      
    }else{

      try {
        // Send a POST request to your API to like/unlike the blog post
        const response = await axios.post(`${baseUrl}/bloglikes/`, { blogId, username });
    
        if (response.status === 201) {
          // Liked successfully (201 status)
          setLikesCount(likesCount + 1);
          setLiked(true);
        } else if (response.status === 200) {
          // Unliked successfully (200 status)
          setLikesCount(likesCount - 1);
          setLiked(false);
        }
      } catch (error) {
        console.error('Error liking/unliking the blog:', error);
      }
    }
  };

  // Use the useEffect hook to fetch the initial likes count when the component mounts
  useEffect(() => {
    fetchLikesCount();
  }, [blogId]);

  // Render the like button based on whether the user has already liked the blog
  return (
    <div className=' '>
      
      {liked ? (
        <AiFillHeart color='red' size={20} onClick={handleLike} className='cursor-pointer' />
      ) : (
        <AiOutlineHeart size={20} onClick={handleLike} className='cursor-pointer' />
      )}
      <span className=' ml-1'>{likesCount}  </span>
    </div>
  );
};

export default BlogLikes;
