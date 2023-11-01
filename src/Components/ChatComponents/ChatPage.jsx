import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { w3cwebsocket as WebSocket } from 'websocket';
import { baseUrl } from '../../Store/BaseUrl';
import axios from 'axios';
import './Chat.css'
import chatImg from '../../assets/patterns020422_10.jpg'
const ChatPage = ({id}) => {
  const { student } = useSelector((state) => state.user);
  const user_id = useSelector((state) => state.user.userId);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentName = queryParams.get('student_name');
  const token = localStorage.getItem('accessToken')
  let userId, studentId;

  if (student) {
    studentId = user_id
    // userId = queryParams.get('user_id');
    userId=id
  } else {
    studentId = queryParams.get('student_id');
    userId = user_id
  }

  const [wsClient, setWsClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isWsOpen, setIsWsOpen] = useState(false);
  const [online,setOnline] = useState(false)
  const [trigger ,setTrigger]=useState(false)
  // useEffect(()=>{
  //   let other_side
  //   if (student) {
  //      other_side=userId
  //   } else {
  //      other_side=studentId
  //   }

  //   const fetchOnline = async () => {
  //     try {
  //       const response = await axios.get(`${baseUrl}/online-status/${other_side}/`);
  //       console.log(response.data);
  //       setOnline(response.data)
  //     } catch (error) {
  //       console.error('Error fetching :', error);
  //     }
  //   };
  //   fetchOnline();

  // },[userId, studentId])


  useEffect(() => {
    // Function to fetch messages from the server
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${baseUrl}/chat/messages/${userId}/${studentId}/`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userId, studentId,trigger]);

  useEffect(() => {
    const connectToWebSocket = (userId, studentId) => {
      const roomName = `${userId}_${studentId}`;
      const wsUrl = `wss://www.edu-cons.online/ws/chat/${roomName}/`;
      const client = new WebSocket(wsUrl);

      client.onopen = () => {
        console.log('WebSocket connection established');
        setIsWsOpen(true);
        setWsClient(client);
      };

      client.onmessage = (message) => {
        console.log('Received WebSocket message:', message);
        const data = JSON.parse(message.data);
        
        const message_get = data.message_content;
        console.log(data, 'return message user');
        setMessages((prevMessages) => [...prevMessages, data]);
        // Handle incoming messages from the WebSocket
        
      };

      client.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return client;
    };

    // Establish WebSocket connection when the component mounts
    const client = connectToWebSocket(userId, studentId);

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (client) {
        client.close();
          
      }
    };
  }, [userId, studentId]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === '') return;

    try {
      const newMessage = {
        sender: student ? studentId : userId,
        receiver: student ? userId : studentId,
        message_content: messageInput,
      };
      const response = await axios.post(`${baseUrl}/chat/create/`, newMessage);

      if (response.status === 201) {
      // Check if WebSocket is open before sending the message
        if (isWsOpen && wsClient) {
          wsClient.send(JSON.stringify(newMessage));
        } else {
          setTrigger(!trigger)
          console.error('WebSocket is not open');
        }
      }
      setMessageInput('');
    } catch (error) {
      console.error('Error for sending messages:', error);
    }
  };


  const getTimeDifference = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const timeDifference = now - messageTime;
  
    if (timeDifference < 60000) {
      // Less than 1 minute ago
      return `${Math.floor(timeDifference / 1000)} s ago`;
    } else if (timeDifference < 3600000) {
      // Less than 1 hour ago
      return `${Math.floor(timeDifference / 60000)} m ago`;
    } else if (timeDifference < 86400000) {
      // Less than 1 day ago
      return `${Math.floor(timeDifference / 3600000)} h ago`;
    } else {
      // More than 1 day ago
      return `${Math.floor(timeDifference / 86400000)} d ago`;
    }
  };
return (
  <div>

 
  {
    student ?
    <div className="h-[485px] flex flex-col " >
    {/* You now have a WebSocket connection in wsClient */}
    <div className="flex-grow overflow-y-auto px-4 py-8 custom-scrollbar">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex flex-col mb-4 ${ student ?

            message.sender === studentId ? 'items-end' : 'items-start':

            message.sender === userId ? 'items-end' : 'items-start'
          }`}
        >
          <div
            className={`rounded-lg p-2 max-w-md ${ student ?
              message.sender === studentId
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white'
              :
              message.sender === userId
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            <div className='text-lg'>

           {message.message_content} 
           <div className='text-sm'>

           </div>
            </div>

          </div>
          <div className="text-xs text-gray-400 mt-1 ml-2">
            
            {getTimeDifference(message.timestamp)}

          </div>
        </div>
      ))}
    </div>
    <div className=" p-2  border-t flex bg-[#DAD3CC]">
      <input
        className="border rounded p-2 w-full  focus:outline-none  shadow-lg"
        type="text"
        placeholder="Type your message..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  </div> 
  :
  <div className="  mx-auto mt-0" >
  <div className="py-2 w-full ">
    <div className="flex   rounded shadow-lg h-full">
        <div className="w-full border flex flex-col">
        {/* Right panel header */}
          <div className="py-2 px-3 bg-[#e4f2ee] flex flex-row justify-between items-center">
            <div className="flex items-center">
              <div>
                <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="User Profile" />
              </div>
              <div className="ml-4">
                <p className="text-grey-darkest">
                  {studentName}
                </p>
                {online ? <span className="online-indicator">Online</span> : null}
              </div>
            </div>

         
          </div>

          {/* Right panel content */}
          <div className="flex-1 overflow-auto" style={{ backgroundColor: '#DAD3CC' }}>
            <div className="py-1 px-">
            

            {/* Info message */}
              <div className="flex justify-center md:px-0 px-3 mb-4">
                <div className="rounded py-2 mt-2 px-6" style={{ backgroundColor: '#FCF4CB' }}>
                  <p className="text-xs ">
                    Messages to this chat and calls are now secured with end-to-end encryption. 
                  </p>
                </div>
              </div>

         



              <div className="relative  md:h-[504px]  h-[448px] flex flex-col">
  {/* You now have a WebSocket connection in wsClient */}
  <div className="flex-grow overflow-y-auto px-4 py-8 custom-scrollbar">
    {messages.map((message, index) => (
      <div
        key={index}
        className={`flex flex-col mb-4 ${
          student
            ? message.sender === studentId
              ? 'items-end'
              : 'items-start'
            : message.sender === userId
            ? 'items-end'
            : 'items-start'
        }`}
      >
        <div
          className={`rounded-lg p-2 max-w-md ${
            student
              ? message.sender === studentId
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white'
              : message.sender === userId
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          <div className="text-lg">{message.message_content}</div>
        </div>
        <div className="text-xs text-gray-400 mt-1 ml-2">
          {getTimeDifference(message.timestamp)}
        </div>
      </div>
    ))}
  </div>
  <div className="px-2 border-t flex bg-[#DAD3CC] py-2 absolute bottom-0 right-0 left-0">
    <input
      className="border rounded-full p-2 w-full focus:outline-none shadow-lg"
      type="text"
      placeholder="Type your message..."
      value={messageInput}
      onChange={(e) => setMessageInput(e.target.value)}
    />
    <button
      className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
      onClick={handleSendMessage}
    >
      Send
    </button>
  </div>
</div>

            {/* End of example incoming message */}
            {/* Repeat similar code for other messages */}
          </div>
        </div>

        {/* Message input */}
        
      </div>
      </div>
      </div>
      </div>
  }
   </div>
);
};

export default ChatPage;
