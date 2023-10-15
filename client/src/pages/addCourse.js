import React, { useEffect } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterCourse } from "../apicalls/userCalls";
import { useDispatch } from "react-redux";
import { SetLoading } from "../redux/loaderSlice";
import { GetAntdInputValidation } from "../utils/helper";
const AddCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const finish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await RegisterCourse({
        ...values,
      });
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        navigate("/show-course");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center bg-secondary">
      
        <Form
          layout="vertical"
          className="bg-white h-screen w-screen rounded shadow grid grid-cols-2 gap-5"
          onFinish={finish}
        >
          <h1 className="bg-red-500 rounded-t h-16 pt-3 col-span-2">
            <span className="text-white ml-10 font-bold text-2xl">Add Courses</span>
            <div className="flex justify-end w-full -mt-9">
            <Button
            onClick={() => {
              navigate("/preview-detail")
            }}
              type="primary"
              className=" bg-black w-1/6 mr-5"
            >
              Back
            </Button>
            <Button
            onClick={() => {
              navigate("/show-course")
            }}
              type="primary"
              className=" bg-black w-1/6 mr-5"
            >
              Show all Courses
            </Button>
            </div>
          </h1>
          <>
            <Form.Item
              className=" m-16 -mt-20"
              name="cname"
              label="Course Name"
              rules={GetAntdInputValidation()}
            >
              <Input style={{ height: '50px' }} className="mt-2" />
            </Form.Item>
            <Form.Item className=" m-16 -mt-20" label="No of Semesters" name="semester" rules={GetAntdInputValidation()}>
              <Input style={{ height: '50px' }} type="number" className="mt-2" />
            </Form.Item>
            <Form.Item
              className=" m-16 -mt-32"
              name="duration"
              label="Duration"
              rules={GetAntdInputValidation()}
            >
              <Input style={{ height: '50px' }} type="number" placeholder="In Months" className="mt-2" />
            </Form.Item>
            <Form.Item
              className=" m-16 -mt-32"
              name="fees"
              label="Fees"
              rules={GetAntdInputValidation()}
            >
              <Input style={{ height: '50px' }} type="number" className="mt-2" />
            </Form.Item>
            
          </>
          <div className="flex justify-start w-full col-span-2">
            <Button
              type="primary"
              className=" bg-black w-1/4 ml-16"
              htmlType="submit"
            >
              Save Course Detail & Continue
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddCourse;