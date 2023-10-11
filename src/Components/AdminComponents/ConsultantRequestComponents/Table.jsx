import React, { useState } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
    label: "Pending",
    value: "pending",
  },
  {
    label: "Approved",
    value: "approved",
  },
];
 
const TABLE_HEAD = ["User", "Course", "Intake ", "Status", "Actions"];
const ITEMS_PER_PAGE = 5; // Number of items per page

const Table = ({ consultantRequests ,onApproveRequest,is_admin }) => {
    const [activeTab, setActiveTab] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  
  const filteredRequests = consultantRequests.filter((request) => {
    const isUsernameMatched =
      request.user.username.toLowerCase().includes(searchText.toLowerCase());
  
    if (activeTab === "all" && searchText === "") {
      return true; // Show all requests when on "All" tab and no search text
    } else if (activeTab === "all" && isUsernameMatched) {
      return true; // Show requests with matching usernames on "All" tab
    } else if (activeTab === "pending" && !request.is_approved && isUsernameMatched) {
      return true; // Show pending requests with matching usernames
    } else if (activeTab === "approved" && request.is_approved && isUsernameMatched) {
      return true; // Show approved requests with matching usernames
    }
  
    return false; // Filter out requests that don't match the criteria
  });
  

  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    setCurrentPage(1); // Reset to the first page when changing tabs
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing search text
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
        <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 md:flex  items-center justify-between gap-8">
        <Tabs value={activeTab} className="w-full md:w-max md:mt-0 mt-3">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => handleTabChange(value)}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72 md:mt-0 mt-3">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchText}
                onChange={handleSearchChange}
            />
          </div>
        </div>
        
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
              {paginatedRequests.map((request) => (
                <tr key={request.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {request.user.username}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {request.user.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {request.course.name}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {request.course.college.name} ({request.course.college.country.name})
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-col">

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {request.intake_month}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      {request.intake_year}
                    </Typography>
                    </div>
                  </td>
               
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={request.is_approved ? "Approved" : "Pending"}
                        color={request.is_approved ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                    {is_admin ? request.is_approved ? 
                    <div></div>
                    : 
                    <Tooltip content="Approve Request " >
                      <IconButton variant="text"  onClick={() => onApproveRequest(request.id)} >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>


                      </IconButton>
                    </Tooltip>
                    :
                    <div></div>
                    }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
        Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm"
           onClick={() => handlePageChange(currentPage - 1)}
           disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="outlined" size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Table