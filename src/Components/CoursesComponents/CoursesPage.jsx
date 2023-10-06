import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import { baseUrl } from "../../Store/BaseUrl";
import CoursePageCard from "./CoursePageCard";
import FilterDrawer from "./FilterDrawer";
import CoursePagination from "./CoursePagination";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
const CoursesPage = ({is_admin ,is_consultancy}) => {
  const [coursesData, setCoursesData] = useState({
    courses: [],
    currentPage: 1,
    itemsPerPage: 2,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [countryFilter, setCountryFilter] = useState([]);
  const [courseTypeFilter, setCourseTypeFilter] = useState([]);
  const [consultancyFilter, setConsultancyFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = React.useState(1);
  const userId =useSelector((state) => state.user.userId);
  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    // Filter the courses based on the current search query (value)
    const filteredCourses = originalCourses.filter((course) =>
      course.name.toLowerCase().includes(value.toLowerCase())
    );

    setCoursesData({
      courses: filteredCourses,
      currentPage: 1,
      itemsPerPage: 2,
      totalPages: Math.ceil(filteredCourses.length / 2),
    });
  };
  
  
  const deleteCourse = (deletedCourseId) => {
    // Filter out the course with the specified ID
    const updatedCourses = coursesData.courses.filter((course) => course.id !== deletedCourseId);
    setCoursesData({
      courses:updatedCourses});
      setOriginalCourses(updatedCourses);
      console.log(updatedCourses);
  };



  const updateCountryFilter = (newFilter) => {
    setCountryFilter(newFilter);
  };

  const updateConsultancyFilter = (newFilter) => {
    setConsultancyFilter(newFilter);
  };

  // Function to update the course type filter state
  const updateCourseTypeFilter = (newFilter) => {
    setCourseTypeFilter(newFilter);
  };

  const next = () => {
    if (active < coursesData.totalPages) {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const [originalCourses, setOriginalCourses] = useState([]);
{is_consultancy ?
useEffect(() => {
  const fetchCoursesData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/consultancy-courses/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const courses = response.data;
      setCoursesData({
        courses,
        currentPage: 1,
        itemsPerPage: 2,
        totalPages: Math.ceil(courses.length / 2),
      });
      setOriginalCourses(courses);
      console.log(courses);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setIsLoading(false);
    }
  };

  fetchCoursesData();
}, []) // Empty dependency array to ensure the request is made only once  
:
  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/courses/`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        const courses = response.data;
        setCoursesData({
          courses,
          currentPage: 1,
          itemsPerPage: 2,
          totalPages: Math.ceil(courses.length / 2),
        });
        setOriginalCourses(courses);
        console.log(courses);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
      }
    };

    fetchCoursesData();
  }, []) // Empty dependency array to ensure the request is made only once
}

  useEffect(() => {
    // Apply filters based on selected countryFilter
    let filteredCourses = [...originalCourses]; // Start with all courses
    if (countryFilter.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        countryFilter.includes(course.college.country.name)
      );
    }

    // Apply filters based on selected courseTypeFilter
    if (courseTypeFilter.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        courseTypeFilter.includes(course.course_type.name)
      );
    }
    if (consultancyFilter.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
      consultancyFilter.includes(course.added_by.username)
      );
    }

    // Apply search query filter
    if (searchQuery.trim() !== "") {
      filteredCourses = filteredCourses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setCoursesData({
      courses: filteredCourses,
      currentPage: 1,
      itemsPerPage: 2,
      totalPages: Math.ceil(filteredCourses.length / 2),
    });
  }, [countryFilter, courseTypeFilter, searchQuery ,originalCourses , consultancyFilter ]);

  const startIndex = (active - 1) * coursesData.itemsPerPage;
  const endIndex = startIndex + coursesData.itemsPerPage;
  const slicedCourses = coursesData.courses.slice(startIndex, endIndex);
  
  return (
    <div className="bg-[#e4f5eb]">
      <div className="flex justify-between w-full">

      <FilterDrawer
        countryFilter={countryFilter}
        courseTypeFilter={courseTypeFilter}
        updateCountryFilter={updateCountryFilter}
        updateCourseTypeFilter={updateCourseTypeFilter}
        updateConsultancyFilter={updateConsultancyFilter}
      />
      <form action="" className='bg-white border  max-w-[250px] md:p-2 p-2 mb-2 mr-5 md:mr-16 md:mt-7   mt-4  shadow-lg rounded-lg flex justify-between'>
      <input
          className='bg-white w-full outline-none focus:outline-none' 
          type="text"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
         <i className="fa fa-search fa-lg mt-1"></i>
        </form>
      
      </div>
      <div className="md:p-4 p-2">
        {isLoading ? (
          <div className="flex justify-center p-16 h-[900px]">
            <Spinner />
          </div>
        ) : (
          slicedCourses.map((course) => (
            <CoursePageCard
              key={course.id}
              course={course.name}
              college = {course.college.name}
              image={`http://127.0.0.1:8000/${course.image}`}
              duration={course.duration}
              is_admin = {is_admin}
              is_consultancy = {is_consultancy}
              courseId={course.id}
              deleteCourse={deleteCourse}
            />
          ))
        )}
      </div>
      <div className="flex justify-center p-4">
        <div className="flex items-center gap-8">
          <IconButton
            size="sm"
            variant="outlined"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <Typography color="gray" className="font-normal">
            Page <strong className="text-gray-900">{active}</strong> of{" "}
            <strong className="text-gray-900">{coursesData.totalPages}</strong>
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            onClick={next}
            disabled={active === coursesData.totalPages}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
