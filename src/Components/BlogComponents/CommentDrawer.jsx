import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";
import {FaRegComment} from 'react-icons/fa'
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

import axios from 'axios'; // Import Axios
import { baseUrl } from '../../Store/BaseUrl';
import CommentLikes from './CommentLikes';
import CommentReply from './CommentReply';
const CommentDrawer = ({blogId}) => {
const [openRight, setOpenRight] = React.useState(false);
const [commentText, setCommentText] = useState(''); // State to store the comment text
const username = useSelector(state => state.user.username);
const [comments, setComments] = useState([]); // State to store comments

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const postComment = async () => {
    try {
      // Send a POST request to your API with the comment data
      const response = await axios.post(`${baseUrl}/postcomment/`, {
        blogId: blogId, 
        username: username, 
        comment: commentText,
      });
      
      // Clear the comment text input
      console.log(response.data);
      setCommentText('');
      const newComment = response.data;
      setComments((prevComments) => [...prevComments, newComment]);
      // Optionally, you can reload the comments or update the UI in response to a successful comment post.
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

    // Function to fetch comments
    const getComments = async () => {
        try {
          const response = await axios.get(`${baseUrl}/postcomment/?blogId=${blogId}`);
          setComments(response.data); // Update the comments state with the fetched data
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
    
      // Use useEffect to fetch comments when the component mounts and when blogId changes
      useEffect(() => {
        getComments();
      }, [blogId]);
      
      
    const calculateTimeDifference = (timestamp) => {
        const currentTime = new Date();
        const commentTime = new Date(timestamp);
        const timeDifference = currentTime - commentTime;
    
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days > 0) {
          return `${days} d ago`;
        } else if (hours > 0) {
          return `${hours} h ago`;
        } else if (minutes > 0) {
          return `${minutes} m ago`;
        } else {
          return `${seconds} s ago`;
        }
      };
  return (
    <div>
        <div className='flex'>

            <FaRegComment
              className='cursor-pointer'
              size={20}
              onClick={openDrawerRight}/>
              {/* <span className='ml-1  '>{comments.length}</span> */}
              
        </div>

        <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 "
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Comments
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className='overflow-y-auto max-h-[580px] p-2'>
          {comments.map(comment => (
            <div key={comment.id} className='bg-white rounded-lg shadow-lg p-3 mt-2 bg-[#e1e7e8]'>
                <div className='flex justify-between'>
                <div className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                <h1>{comment.username}</h1>
                </div>
              <p className='text-sm'>{calculateTimeDifference(comment.created_date)}</p>

                </div>
              <p className='ml-6 mt-2'>{comment.comment}</p>
              <div className='flex '>

              {/* <p className='ml-3 mt-3 '>  <CommentLikes/></p> */}
              <p className='mt-3 ml-5 text-gray-500 w-2/3' style={{cursor:'pointer'}}><CommentReply id={comment.id}/></p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="fixed bottom-0  w-full  bg-white  py-6">
            <input
            type="text"
            placeholder="Write your comment"
            className="border p-2 outline-none"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)} // Update the comment text state

            />
            <button className='ml-2' onClick={postComment}>Post</button>
        </div>
        
      </Drawer>
    </div>
  )
}

export default CommentDrawer