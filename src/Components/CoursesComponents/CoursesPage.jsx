import React from "react";

import CoursePageCard from "./CoursePageCard";
import FilterDrawer from "./FilterDrawer";
import CoursePagination from "./CoursePagination";
const CoursesPage = () => {
  
 
  return (
    <div className="bg-[#F2F5EB]">
      <FilterDrawer/>
      <div className=" md:p-4 p-2">
        <CoursePageCard/>
        <CoursePageCard/>
        <CoursePageCard/>
      </div>
      <div className="flex justify-center p-4">

      <CoursePagination/>
      </div>
    </div>
  )
}

export default CoursesPage