import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../Store/BaseUrl";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
const FilterDrawer = ({
  countryFilter,
  courseTypeFilter,
  updateCountryFilter,
  updateCourseTypeFilter,
  updateConsultancyFilter,
}) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCountires, setSelectedCountries] = useState([]);
  const [selectedConsultancies, setSelectedConsultancies] = useState([]);
  const { role } = useSelector((state) => state.user);
  // const [selectedColleges, setSelectedColleges] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [filterData, setFilterData] = useState({
    countries: [],
    courseType: [],
    colleges: [],
    consultancies: [],
  });
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const applyFilter = () => {
    updateCountryFilter(selectedCountires);
    updateCourseTypeFilter(selectedCourses);
    updateConsultancyFilter(selectedConsultancies);
    console.log("select" + selectedConsultancies);
    console.log("applied");
    closeDrawer();
  };

  useEffect(() => {
    // Define a function to fetch filter list data
    const fetchFilterData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/filterview/`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials if needed
        });

        // Assuming the API response contains the filter data
        setFilterData({
          countries: response.data.countriesData,
          courseType: response.data.coursetypeData,
          colleges: response.data.collegesData,
          consultancies: response.data.ConsultanciesData,
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchFilterData();
  }, []); // Empty dependency array to run this effect only once when the component mounts
  return (
    <div>
      <button
        onClick={openDrawer}
        className="bg-white  text-black rounded-sm md:ml-16 ml-3 md:mt-7 mt-4"
      >
        <a class="relative rounded px-5 py-2.5 overflow-hidden group bg-[#20B486] relative hover:bg-gradient-to-r hover:from-[#20B486] hover:to-[#20B486] text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
          <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span class="relative">
            <i className="fa fa-filter"></i>Filter
          </span>
        </a>
      </button>
      <Drawer open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Filter Courses
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
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
        <List>
          <ListItem>
            <div className="w-full">
              <p className="text-lg font-semibold mb-2">Country</p>
              <ul className="space-y-2">
                {filterData.countries.map((country) => (
                  <li key={country.id} className="flex items-center space-x-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="selectedCountries"
                        value={country.id}
                        className="form-checkbox h-4 w-4 text-blue-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCountries((prevNames) => [
                              ...prevNames,
                              country.name,
                            ]);
                          } else {
                            setSelectedCountries((prevNames) =>
                              prevNames.filter((name) => name !== country.name)
                            );
                          }
                        }}
                      />
                      <span className="ml-2">{country.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </ListItem>

          <ListItem>
            <div className="w-full">
              <p className="text-lg font-semibold mb-2">Courses</p>
              <ul className="space-y-2">
                {filterData.courseType.map((courseType) => (
                  <li
                    key={courseType.id}
                    className="flex items-center space-x-2"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="selectedCountries"
                        value={courseType.id}
                        className="form-checkbox h-4 w-4 text-blue-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCourses((prevNames) => [
                              ...prevNames,
                              courseType.name,
                            ]);
                          } else {
                            setSelectedCourses((prevNames) =>
                              prevNames.filter(
                                (name) => name !== courseType.name
                              )
                            ); // Clear the name if unchecked
                          }
                        }}
                      />
                      <span className="ml-2">{courseType.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </ListItem>
          {role != 800 && (
            <ListItem>
              <div className="w-full">
                <p className="text-lg font-semibold mb-2">Consultancies</p>
                <ul className="space-y-2">
                  {filterData.consultancies.map((consultancy) => (
                    <li
                      key={consultancy.id}
                      className="flex items-center space-x-2"
                    >
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="selectedConsultancies"
                          value={consultancy.id}
                          className="form-checkbox h-4 w-4 text-blue-500"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedConsultancies((prevNames) => [
                                ...prevNames,
                                consultancy.username,
                              ]);
                            } else {
                              setSelectedConsultancies((prevNames) =>
                                prevNames.filter(
                                  (username) =>
                                    username !== consultancy.username
                                )
                              ); // Clear the name if unchecked
                            }
                          }}
                        />
                        <span className="ml-2">{consultancy.username}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </ListItem>
          )}
        </List>
        <button className="ml-11 mt-7" onClick={applyFilter}>
          <a
            
            class="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
          >
            <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
              Apply Filters
            </span>
          </a>
        </button>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
