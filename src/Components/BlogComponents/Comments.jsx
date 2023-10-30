import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FaRegComment } from "react-icons/fa";
import { BsArrowRightCircle } from "react-icons/bs";
import { useSelector } from "react-redux"; // Import useSelector from react-redux

import axios from "axios"; // Import Axios
import { baseUrl } from "../../Store/BaseUrl";
import CommentLikes from "./CommentLikes";
import CommentReply from "./CommentReply";
const Comments = ({ blogId }) => {
  const [openRight, setOpenRight] = React.useState(false);
  const [commentText, setCommentText] = useState(""); // State to store the comment text
  const username = useSelector((state) => state.user.username);
  const [comments, setComments] = useState([]); // State to store comments

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const postComment = async () => {
    if (commentText === ""){
        console.log('no');
        return
    }
    try {
      // Send a POST request to your API with the comment data
      const response = await axios.post(`${baseUrl}/postcomment/`, {
        blogId: blogId,
        username: username,
        comment: commentText,
      });

      // Clear the comment text input
      console.log(response.data);
      setCommentText("");
      const newComment = response.data;
      setComments((prevComments) => [...prevComments, newComment]);
      // Optionally, you can reload the comments or update the UI in response to a successful comment post.
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Function to fetch comments
  const getComments = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/postcomment/?blogId=${blogId}`
      );
      setComments(response.data); // Update the comments state with the fetched data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
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
      return `${days} days ago`;
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
      <h1 className="font-bold text-xl mt-11">Comments <span className=' font-medium'>({comments.length})</span></h1>
      <div>
        <div className=" w-full bg-white flex   mt-7 m shadow-xl rounded-lg">
          <div className="bg-indigo-600 rounded-l-lg py-2 md:w-[8px]  w-[4px]"></div>
          <div className="flex gap-2 md:py-8 py-3 md:w-full">
            <input
              type="text"
              placeholder="Write your comment"
              className=" py-4 px-2 md:w-5/6 w-[200px] md:ml-14 ml-7 outline-none"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)} // Update the comment text state
            />
            <button className=" text-indigo-600 md:ml-5 ml-14" onClick={postComment} >
           
                    <BsArrowRightCircle size={30} />

            </button>
          </div>
        </div>

        <div className="overflow-y-scroll custom-scrollbar max-h-[580px] p-2">
          {comments.map((comment) => (
            <div key={comment.id} className=" p-3 mt-2 border-b-2">
              <div className="flex justify-between">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <h1>{comment.username}</h1>
                </div>
                <p className="text-sm text-gray-500">
                  {calculateTimeDifference(comment.created_date)}
                </p>
              </div>
              <p className="ml-6 mt-2">{comment.comment}</p>
              <div className="flex w-full">
                <p className='ml-3 mt-3 ' style={{ cursor: "pointer" }}>  <CommentLikes/></p>
                <p
                  className="mt-3  text-gray-500 w-2/3"
                  style={{ cursor: "pointer" }}
                >
                  <CommentReply id={comment.id} />
                </p>
                {/* <p className="ml-auto">likes</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
