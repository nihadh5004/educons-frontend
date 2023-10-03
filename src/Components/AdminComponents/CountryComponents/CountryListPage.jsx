import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../../Store/BaseUrl';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid"; // Import the TrashIcon
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
import axios from 'axios';
import AddCountryModal from './AddCountryModel';

const ITEMS_PER_PAGE = 2;

const TABLE_HEAD = ["Country", 'Actions'];

const CountryListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [editCountry, setEditCountry] = useState(null); // State to store the country being edited
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${baseUrl}/countries/`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, [isModalOpen]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedCountries = filteredCountries.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCountry = (formData) => {
    console.log(formData);
    closeModal();
  };

  const handleDeleteCountry = async (countryId) => {
    try {
      // Send a DELETE request to the backend to delete the country
      await axios.delete(`${baseUrl}/deletecountry/${countryId}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // Update the list of countries after successful deletion
      const updatedCountries = countries.filter((country) => country.id !== countryId);
      setCountries(updatedCountries);
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  return (
    <div className='bg-gray-500 md:p-5 p-1'>
      <Card className="h-full shadow-lg md:mt-5 md:mb-11 border rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 md:flex items-center justify-between gap-8">
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:mb-0 mb-2">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={openModal}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add country
              </Button>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className=" px-0">
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
              {paginatedCountries.map(({ id, name }, index) => {
                const isLast = index === paginatedCountries.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

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
                            {name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-2 ">
                        <Tooltip content="Edit">
                          <IconButton
                            size="sm"
                            onClick={() => handleEditCountry(id)}
                          >
                            <PencilIcon className="h-4 w-4 text-blue-500" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete">
                          <IconButton
                            size="sm"
                            onClick={() => handleDeleteCountry(id)}
                          >
                            <TrashIcon className="h-4 w-4 text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={endIndex >= filteredCountries.length}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <AddCountryModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={handleAddCountry}
      />
    </div>
  );
};

export default CountryListPage;
