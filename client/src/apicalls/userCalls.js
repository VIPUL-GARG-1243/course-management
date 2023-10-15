import { axiosInstance } from "./apicall";


export const LoginStudent = async (payLoad) => {
    const response = await axiosInstance("post", "/api/student/login", payLoad);
    return response;
}

export const RegisterCourse = async (payLoad) => {
    const response = await axiosInstance("post", "/api/student/register-course", payLoad);
    return response;
}

export const RegisterStudent = async (payLoad) => {
    const response = await axiosInstance("post", "/api/student/register", payLoad);
    return response;
}

export const GetCurrentUser = async () => {
    const response = await axiosInstance("get", "/api/student/get-current-user");
    return response;
}

export const GetCourse = async () => {
    const response = await axiosInstance("get", "/api/student/get-course");
    return response;
}


