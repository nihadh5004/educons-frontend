import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
const AddCourseButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-[#e4f5eb]  p-2">
        <button onClick={() => navigate("/addcourse")} className="ml-4 ">
          <a class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">Add Course</span>
          </a>
        </button>
      </div>
    </div>
  );
};

export default AddCourseButton;
