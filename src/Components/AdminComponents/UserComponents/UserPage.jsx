import React, { useState, useEffect } from 'react';

import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { baseUrl } from '../../../Store/BaseUrl';
  import axios from 'axios';
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
   
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Students",
      value: "students",
    },
    {
      label: "Consultancies",
      value: "consultancies",
    },
  ];
   
  const TABLE_HEAD = ["Users", "Contact", "Status", "Joined at", "Actions"];
   
  
  const ITEMS_PER_PAGE = 5; // Number of items to display per page


const UserPage = () => {
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('all');
    const [filtersTabs, setFiltersTabs] = useState([]);
    const[trigger,setTrigger]=useState(false)
    useEffect(() => {
      const userlistData = async () => {
        try {
          const response = await axios.get(`${baseUrl}/userlist/`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
  
          setUserList(response.data);
          setFiltersTabs(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
          // setIsLoading(false);
        }
      };
  
      userlistData();
    }, []); // Empty dependency array to ensure the request is made only once
  

    
    const filterUserList = (tab) => {
      if (tab === 'all') {
        return userList;
      } else if (tab === 'students') {
        return userList.filter(user => user.is_student);
      } else if (tab === 'consultancies') {
        console.log('yes');
        return userList.filter(user => user.is_consultancy);
      }
      return userList;
    };

    // Calculate the start and end indices based on the current page and items per page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
  
    // Filter the user list based on the search query
    const filteredUserList = filtersTabs.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Slice the filtered user list based on pagination
    const slicedUserList = filteredUserList.slice(startIndex, endIndex);
  
    // Function to handle page navigation
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    // Function to handle search input change
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    };
    
    
     // Function to block a user
  const blockUser = async (userId) => {
    try {
      const response = await axios.put(`${baseUrl}/blockuser/${userId}/`,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // If the request is successful, update the user's status in the local state
      const updatedUserList = userList.map((user) => {
        if (user.id === userId) {
          // Update the user's is_active status to false
          return { ...user, is_active: false };
        }
        return user;
      });

      
      // Update the local state with the modified user list
      setUserList(updatedUserList);
      setTrigger(!trigger)
      // Handle success response (e.g., show a success message)
      console.log("User blocked successfully", response.data);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error blocking user:", error);
    }
  };

// Add an event handler for unblocking a user
const handleUnblockUser = (userId) => {
    axios
      .put(`${baseUrl}/unblockuser/${userId}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        // Update the user's status in the frontend to indicate unblocking
        // You can update the userList state accordingly
        const updatedUserList = userList.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              is_active: true, // Update the user's status
            };
          }
          return user;
        });
        setUserList(updatedUserList);
        setTrigger(!trigger)

      })
      .catch((error) => {
        // Handle errors
      });
  };
  
  
  useEffect(() => {
    // Filter user list when the selected tab changes
    const filteredList = filterUserList(selectedTab);
    setFiltersTabs(filteredList);
    setCurrentPage(1);
  }, [selectedTab,trigger]);


  return (
    <div>
        <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        
        
        
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value={selectedTab} className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={() => setSelectedTab(value)}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          <div className="w-full md:w-72 md:mt-1">
            <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              />
          </div>
        </div>

        
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 ">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slicedUserList.map(
              ({  id,username, email, contact, is_active, date_joined }, index) => {
                const isLast = index === slicedUserList.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                  // Create a Date object from the date_joined string
                const joinedDate = new Date(date_joined);

                // Format the date as a string with only the date part
                const formattedDate = joinedDate.toLocaleDateString();
                
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {username}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {contact}
                        </Typography>
                        
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={is_active ? "active" : "in-active"}
                          color={is_active ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formattedDate}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {is_active ? <Tooltip content="Block User">
                        <IconButton variant="text" onClick={() => blockUser(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>

                        </IconButton>
                      </Tooltip>:
                      <Tooltip content="Unblock User">
                      <IconButton variant="text" onClick={() => handleUnblockUser(id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>


                      </IconButton>
                    </Tooltip> }
                    
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {Math.ceil(userList.length / ITEMS_PER_PAGE)}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= userList.length}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default UserPage