import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { baseUrl } from "../../Store/BaseUrl";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import EditCourseModal from "../ConsultancyComponents/CourseComponents.jsx/EditCourseModal";
const CoursePageCard = ({
  course,
  image,
  college,
  duration,
  country,
  description,
  updateChanges,
  is_admin,
  is_active,
  is_consultancy,
  courseId,
  deleteCourse,
  updateCourseIsActive,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend to delete the course
      await axios.delete(`${baseUrl}/deletecourse/${courseId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // If the delete request is successful, call the onDelete callback
      deleteCourse(courseId);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleCourse = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/block-course/`,
        { courseId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      updateCourseIsActive(courseId, response.data.is_active);
    } catch (error) {
      console.error("Error Blocking course:", error);
    }
  };
  return (
    <div className="md:px-14">
      <Card className="w-full h-[300px] max-w-2/3 mt-3 flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src={image}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="black" className="mb-4 uppercase">
            {course}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="">
            {college}
          </Typography>
          <Typography variant="p" color="blue-gray" className="mb-2">
            {country}
          </Typography>

          <Typography color="gray" className="mb-8 font-normal text-xs md:text-sm">
  {description.split(" ").slice(0, 10).join(" ")}
  <span className="hidden sm:inline"> {description.split(" ").slice(10).join(" ")}...</span>
</Typography>


          {/* <a href="#" className="inline-block"> */}
        <div className="flex gap-2">
        <button
            variant="text"
            className="flex items-center gap-2 rounded-full md:mt-0 "
            onClick={() => navigate(`/course-details?id=${courseId}`)}
          >
            <a
             
              class="relative inline-flex items-center justify-center p-4 px-4 py-2 overflow-hidden font-medium text-[#20B486] transition duration-300 ease-out border-2 border-[#20B486] rounded-full shadow-md group"
            >
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#20B486] group-hover:translate-x-0 ease">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="absolute flex items-center justify-center w-full h-full text-[#20B486] transition-all duration-300 transform group-hover:translate-x-full ease">
                Learn More
              </span>
              <span class="relative invisible">Learn More</span>
            </a>
          </button>
          {is_consultancy && (
            <div className="flex gap-2">
              <button
                variant="text"
                className="flex items-center gap-2"
                onClick={openModal}
              >
                <a
             
             class="relative inline-flex items-center justify-center p-4 px-4 py-2 overflow-hidden font-medium text-[#20B486] transition duration-300 ease-out border-2 border-[#20B486] rounded-full shadow-md group"
           >
             <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#20B486] group-hover:translate-x-0 ease">
               <svg
                 class="w-6 h-6"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   stroke-linecap="round"
                   stroke-linejoin="round"
                   stroke-width="2"
                   d="M14 5l7 7m0 0l-7 7m7-7H3"
                 ></path>
               </svg>
             </span>
             <span class="absolute flex items-center justify-center w-full h-full text-[#20B486] transition-all duration-300 transform group-hover:translate-x-full ease">
               Edit
             </span>
             <span class="relative invisible">Learn More</span>
           </a>
              </button>
              <button
                variant="text"
                className="flex items-center gap-2"
                onClick={handleDelete}
              >
                <a
             
             class="relative inline-flex items-center justify-center p-4 px-4 py-2 overflow-hidden font-medium text-[#20B486] transition duration-300 ease-out border-2 border-[#20B486] rounded-full shadow-md group"
           >
             <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#20B486] group-hover:translate-x-0 ease">
               <svg
                 class="w-6 h-6"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   stroke-linecap="round"
                   stroke-linejoin="round"
                   stroke-width="2"
                   d="M14 5l7 7m0 0l-7 7m7-7H3"
                 ></path>
               </svg>
             </span>
             <span class="absolute flex items-center justify-center w-full h-full text-[#20B486] transition-all duration-300 transform group-hover:translate-x-full ease">
               Delete
             </span>
             <span class="relative invisible">Learn More</span>
           </a>
              </button>
            </div>
          )}
          {is_admin && (
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={handleCourse}
            >
              {is_active ? "Block" : "Unblock"}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          )}
        </div>
          
          {/* </a> */}
          
          
        </CardBody>
      </Card>
      {isModalOpen && (
        <EditCourseModal
          course={course}
          courseId={courseId}
          image={image}
          college={college}
          duration={duration}
          country={country}
          description={description}
          closeModal={closeModal} // Pass the closeModal function to close the modal
          updateChanges={updateChanges}
        />
      )}
    </div>
  );
};

export default CoursePageCard;
