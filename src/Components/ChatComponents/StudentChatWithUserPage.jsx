// In your React component

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../Store/BaseUrl';
import { useNavigate } from 'react-router';
import ChatPage from './ChatPage';
const StudentChatWithUserPage = () => {
    const { userId } = useSelector((state) => state.user);
    const [chattedUsers, setChattedUsers] = useState([]);
    const[selectedChat,setSelectedChat] = useState({
      id: null,
      username:null,
    })
    const navigate = useNavigate();
    useEffect(() => {
        const fetchChattedUsers = async () => {
            try {
                const response = await axios.get(`${baseUrl}/users-chatted-with/${userId}/`);
                if (response.status === 200) {
                    setChattedUsers(response.data);
                    console.log(response.data)
                }
            } catch (error) {
                console.error('Error fetching chatted users:', error);
            }
        };

        fetchChattedUsers();
    }, [userId]);

    return (
        <div>
      {/* Chat header */}
      <div className="w-full h-32" style={{ backgroundColor: '#449388' }}></div>

      <div className="container mx-auto" style={{ marginTop: '-128px' }}>
        <div className="py-6 h-screen">
          <div className="flex   rounded shadow-lg h-full">
            {/* Left panel */}
            <div className="w-1/3 border flex flex-col">
              {/* Left panel header */}
              <div className="py-2 px-3 bg-[#e4f2ee] flex flex-row justify-between items-center">
                <div className='py-2 flex justify-between w-full'>
                    <div>
                    <p className='font-bold mt-2'>Chats</p>
                    </div>
                    <div>

                    </div>
                 </div>
              </div>

              {/* Left panel search input */}
             

              {/* Chat list */}
              <div className="bg-white flex-1 overflow-auto">
                {/* Chat list items */}
                {/* Example chat item */}
                  {chattedUsers.map((user) => (
                <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                  <div>
                    <img className="h-12 w-12 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="Chat User" />
                  </div>
                  <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                    <div key={user.id} className="flex items-bottom justify-between">
                      <p className="text-grey-darkest" onClick={()=>setSelectedChat({
                        id:user.id,
                        username:user.username,
                      })}>
                      {user.username}
                      </p>
                      <p className="text-xs text-grey-darkest">
                        12:45 pm
                      </p>
                    </div>
                  </div>
                    
                </div>
                    ))}
                {/* End of example chat item */}
                {/* Repeat similar code for other chat items */}
              </div>
            </div>

            {/* Right panel */}
            <div className="w-2/3 border flex flex-col">
              {/* Right panel header */}
              <div className="py-2 px-3 bg-[#e4f2ee] flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <div>
                    <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="User Profile" />
                  </div>
                  <div className="ml-4">
                    <p className="text-grey-darkest">
                      {selectedChat.username}
                    </p>
                    
                  </div>
                </div>

               
              </div>

              {/* Right panel content */}
              <div className="flex-1 overflow-auto bg-[#dad3cc]" style={{ backgroundColor: '#DAD3CC' }}>
                <div className="py-1 px- ">
                  {/* Date separator */}
                  <div className="flex justify-center mb-2">
                    
                  </div>

                  {/* Info message */}
                  <div className="flex justify-center mb-4">
                    <div className="rounded py-2 px-4" style={{ backgroundColor: '#FCF4CB' }}>
                      <p className="text-xs">
                        Messages to this chat and calls are now secured with end-to-end encryption. 
                      </p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  {/* Example incoming message */}
                  {/* <div className="flex mb-2">
                    <div className="rounded py-2 px-3" style={{ backgroundColor: '#F2F2F2' }}>
                      <p className="text-sm text-teal">
                        Sylverter Stallone
                      </p>
                      <p className="text-sm mt-1">
                        Hi everyone! Glad you could join! I am making a new movie.
                      </p>
                      <p className="text-right text-xs text-grey-dark mt-1">
                        12:45 pm
                      </p>
                    </div>
                  </div> */}



                  {selectedChat && <ChatPage id={selectedChat.id}/>}
                  {/* End of example incoming message */}
                  {/* Repeat similar code for other messages */}
                </div>
              </div>

              {/* Message input */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default StudentChatWithUserPage;
