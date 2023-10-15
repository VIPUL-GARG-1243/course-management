import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterStudent } from "../apicalls/userCalls";
import { useDispatch } from "react-redux";
import { SetLoading } from "../redux/loaderSlice";
import { GetAntdInputValidation } from "../utils/helper";
import TextArea from "antd/es/input/TextArea";

const Register = () => {
  const [idata, setIdata] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const convertTobase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  const finish = async (values) => {
    try {
      values.myfile = idata;
      dispatch(SetLoading(true));
      const response = await RegisterStudent({
        ...values
      });
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertTobase64(file);
    console.log(base64)
    setIdata(base64)
    
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <h1 className="bg-red-500">
        <span className="text-white ml-10 font-normal text-xl">
          Add Student
        </span>
      </h1>
      <div className="flex justify-center items-center bg-secondary">
        <Form
          layout="vertical"
          className="bg-white rounded shadow mt-10 grid grid-cols-2 gap-5 w-1/3"
          onFinish={finish}
        >
          <h1 className="bg-black rounded-t col-span-2">
            <span className="text-white ml-10 font-normal text-xl">
              Student Details
            </span>
          </h1>
          <>
            <Form.Item
              className="col-span-2 m-32 mt-0 "
              name="sname"
              rules={GetAntdInputValidation()}
            >
              <Input placeholder="Student Name" />
            </Form.Item>
            <Form.Item className="col-span-2 m-32 mt-0" name="email" rules={GetAntdInputValidation()}>
              <Input type="email" placeholder="Email Address" />
            </Form.Item>
            <Form.Item
              className="col-span-2 m-32 mt-0"
              name="fname"
              rules={GetAntdInputValidation()}
            >
              <Input placeholder="Father Name" />
            </Form.Item>
            <Form.Item
              className="col-span-2 m-32 mt-0"
              name="date"
              rules={GetAntdInputValidation()}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              className="col-span-2 m-32 mt-0"
              name="phone"
              rules={GetAntdInputValidation()}
            >
              <Input type="number" placeholder="Contact Number" />
            </Form.Item>
            <Form.Item
              className="col-span-2 m-32 mt-0"
              name="city"
              rules={GetAntdInputValidation()}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              className="col-span-1 ml-32 mt-0"
              name="state"
              rules={GetAntdInputValidation()}
            >
              <Input placeholder="State" />
            </Form.Item>
            <Form.Item
              className="col-span-1 mr-32 mt-0"
              name="pincode"
              rules={GetAntdInputValidation()}
            >
              <Input type="number" placeholder="Pincode" />
            </Form.Item>
            <Form.Item
              name="address"
              className="col-span-2 m-32 mt-0"
              rules={GetAntdInputValidation()}
            >
              <TextArea placeholder="Full Address" />
            </Form.Item>
            <Form.Item
              name="cname"
              className="col-span-2 m-32 mt-0"
              rules={GetAntdInputValidation()}
            >
              <Input placeholder="Course Name" />
            </Form.Item>
            <Form.Item
              name="password"
              className="col-span-2 m-32 mt-0"
              rules={GetAntdInputValidation()}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="myfile"
              className="col-span-2 m-32 mt-0"
              rules={GetAntdInputValidation()}
            >
              <input type="file" accept=".jpeg, .png, .jpg" onChange={(e) => handleFileUpload(e)}></input>
            </Form.Item>
          </>
          <div className="flex justify-center w-full col-span-2">
            <Button
              type="primary"
              className=" bg-black w-1/4"
              htmlType="submit"
            >
              Add
            </Button>
          </div>
          <Link
            to="/login"
            className="col-span-2 text-center text-gray-700 underline"
          >
            Already have an account? Login
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
