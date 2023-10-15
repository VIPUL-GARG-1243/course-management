import { message } from "antd";
import React, { useEffect} from "react";
import { GetCurrentUser } from "../apicalls/userCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/userSlice";
import { SetLoading } from "../redux/loaderSlice";

function ProtectedPage({ children }) {
  const navigate = useNavigate();
  let effectMessage = true;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      if (response.success) {
        if(effectMessage) {
            message.success(response.message);
            effectMessage = false;
        }
        dispatch(SetCurrentUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      localStorage.removeItem("token")
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    currentUser && (
      <div>
        <div className="">{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
