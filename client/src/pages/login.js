import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginStudent } from "../apicalls/userCalls";
import { useDispatch } from "react-redux";
import { SetLoading } from "../redux/loaderSlice";
import { GetAntdInputValidation } from "../utils/helper";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const finish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await LoginStudent({
        ...values,
      });
      dispatch(SetLoading(false));
      if(response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/preview-detail");
      }
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    if(localStorage.getItem("token")) {
      navigate("/");
    }
  }, [])
  return (
    <>
    <h1 className="bg-red-500 p-3">
        <span className="text-white ml-10 mb-3 font-normal text-xl">Student Login</span>
      </h1>
    <div className="flex justify-center items-center bg-secondary">
      <Form
      autoComplete="off"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 18,
      }}
        layout="horizontal"
        className="bg-white rounded shadow mt-20 grid grid-cols-2 gap-5 w-1/2"
        onFinish={finish}
      >
        <h1 className="bg-black rounded-t col-span-2">
            <span className="text-white ml-10 font-normal text-xl">Student Details</span>
          </h1>
        <Form.Item className="col-span-2 m-16 mt-10 " name="email" label="User ID" rules={GetAntdInputValidation()}>
          <Input type="email" />
        </Form.Item>
        <Form.Item className="col-span-2 m-16 mt-0 " name="password" label="Password" rules={GetAntdInputValidation()}>
          <Input type="password" />
        </Form.Item>
        <Button className=" ml-44 mb-32 mt-10 bg-black" type="primary" htmlType="submit">
          Login
        </Button>
        <Link
          to="/register"
          className=" text-center mt-12 mr-16 text-gray-700 underline"
        >
          Don't have an account? Register
        </Link>
      </Form>
    </div>
    </>
  );
};

export default Login;
