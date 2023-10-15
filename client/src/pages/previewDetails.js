import React from "react";
import { Button, message, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterStudent } from "../apicalls/userCalls";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../redux/loaderSlice";

const PreviewDetail = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  console.log(currentUser);

  return (
    <>
      <h1 className="bg-red-500 h-12">
        <span className="text-white ml-10 font-normal text-xl">Preview</span>
      </h1>
      <div className=" bg-secondary w-2/3 h-full m-auto mt-12 border border-solid border-black">
        <h1 className="bg-red-400 h-12">
          <span className="text-white ml-10 font-normal text-xl">
            Student Details
          </span>
        </h1>
        <div className="flex flex-row p-10">
          <div className="grid grid-cols-2 gap-5 w-1/2">
            <span className="col-span-2 font-bold">{currentUser.cname}</span>
            <span>Name :</span>
            <span className="-ml-20">{currentUser.sname}</span>
            <span>father :</span>
            <span className="-ml-20">{currentUser.fname}</span>
            <span>DOB :</span>
            <span className="-ml-20">{currentUser.date}</span>
            <span>State :</span>
            <span className="-ml-20">{currentUser.state}</span>
            <span>City :</span>
            <span className="-ml-20">{currentUser.city}</span>
            <span>Pincode :</span>
            <span className="-ml-20">{currentUser.pincode}</span>
            <span>UserId :</span>
            <span className="-ml-20">{currentUser.email}</span>
            <span>Password :</span>
            <span className="-ml-20">{currentUser.spass}</span>
          </div>
          <div className="flex justify-end items-center w-1/2">
            <Image
              width={250}
              height={250}
              src={currentUser.myfile}
            />
          </div>
        </div>
      </div>
      <div className="mt-16 ml-72">
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          type="primary"
          className=" bg-white text-black border-2 border-black w-1/4 mr-10"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            navigate("/show-course");
          }}
          type="primary"
          className=" bg-white text-black border-2 border-black w-1/4"
        >
          Done
        </Button>
      </div>
    </>
  );
};

export default PreviewDetail;
