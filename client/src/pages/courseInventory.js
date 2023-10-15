import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../redux/loaderSlice";
import { GetCourse } from "../apicalls/userCalls";

function CourseInventory(filters) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  let columns = null;
  columns = [
    {
      title: "Course Name",
      dataIndex: "cname",
    },
    {
      title: "No of Semesters",
      dataIndex: "semester",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => text + " Months",
    },
    {
      title: "Fees",
      dataIndex: "fees",
      render: (text) => "Rs " + text,
    },
  ];
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCourse();
      dispatch(SetLoading(false));
      if (response.success) {
        setData(response.data);
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <>
        <Table className="mt-10" columns={columns} dataSource={data} />
      </>
    </div>
  );
}

export default CourseInventory;
