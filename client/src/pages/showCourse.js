
import React from "react";
import { Button } from "antd";
import CourseInventory from "./courseInventory";
import { useNavigate } from "react-router-dom";

function ShowCourse() {
    const navigate = useNavigate();
  return (
    <div className="mt-3 p-10">
          <div className="flex justify-center mt-5">
            <span className="text-2xl w-full text-black font-semibold">
              Courses we Offered
            </span>
            <div className="flex justify-end w-full">
            <Button
            onClick={() => {
                navigate("/add-course")
            }}
              type="primary"
              className=" bg-black w-1/6 ml-16 font-medium"
            >
              Add Course
            </Button>
            </div>
          </div>
          <div>
            <CourseInventory/>
          </div>
    </div>
  );
}

export default ShowCourse;
