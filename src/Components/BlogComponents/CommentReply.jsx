import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { PiArrowBendDownRightLight } from "react-icons/pi";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { baseUrl } from "../../Store/BaseUrl";
const CommentReply = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const { userId } = useSelector((state) => state.user);
  const [replies, setReplies] = useState([]); // State to store comments

  const toggleOpen = () => setOpen((cur) => !cur);

  const getComments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/reply/?commentId=${id}`);
      setReplies(response.data); // Update the comments state with the fetched data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Use useEffect to fetch comments when the component mounts and when blogId changes
  useEffect(() => {
    getComments();
  }, [id]);

  const handleSendReply = () => {
    setSending(true);
    const data = {
      text: replyText,
      commentId: id,
      userId: userId,
    };
    // Assuming you have an API endpoint to send the reply, replace 'YOUR_API_URL' with the actual URL.
    axios
      .post(`${baseUrl}/reply/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("Reply sent successfully:", response.data);
        // Reset the input field and update the state
        setReplyText("");
        const newComment = response.data;
        setReplies((prevComments) => [...prevComments, newComment]);
        setSending(false);
      })
      .catch((error) => {
        console.error("Error sending reply:", error);
        setSending(false);
      });
  };
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
    <>
      <div className="flex ml-3" >
        
        <p onClick={toggleOpen} className={open ? "ml-2" : "ml-2"}>
          {open ? <PiArrowBendDownRightLight color="black"  className="mt-3"/> : "Reply"}
        </p>
      </div>

      <Collapse open={open}>
        <Card className=" bg--[#E9F8F3B2] mx-auto w-full ">
          <div className="flex mt-3 mb-3 bg-white px-2 rounded-md shadow-sm ml-6">
            <input
              type="text"
              className="w-full outline-none   py-2 px-1"
              placeholder="Send Reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <p
              className="ml-3 mt-2"
              onClick={handleSendReply}
              disabled={sending}
            >
              Send
            </p>
          </div>
          {replies.map((reply, index) => (
            <div key={index} className=" p-3 mt-2 ml-6">
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
                  <h1>{reply.username}</h1>
                </div>
              </div>
              <p className="ml-6 mt-2">{reply.reply}</p>
              <div className="flex"></div>
            </div>
          ))}
        </Card>
      </Collapse>
    </>
  );
};

export default CommentReply;
