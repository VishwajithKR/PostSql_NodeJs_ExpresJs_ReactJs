// import axios from "axios";
import { axiosInstance } from "../lib/axios";

export const queryHandler = async ({ queryKey }) => {
  const [endPoint, data] = queryKey;

  const config = {};

  if (data?.params) {
    config.params = data.params;
  }

  if (data?.token) {
    config.headers = {
      Authorization: `Bearer ${data.token}`,
    };
  }

  const response = await axiosInstance.get(`/${endPoint}`, config);
  return response.data;
};


export const mutationHandler = async ({
  endPoint,
  payload = null,
  method = "post",
  token = null,
}) => {
  const config = {
    method,
    url: `/${endPoint}`,
    ...(payload && method === "post" && { data: payload }),
    ...(payload && method !== "post" && { params: payload }),
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const response = await axiosInstance(config);
  return response.data;
};


export const fileUpload = async ({ formData, endPoint, token }) => {
  const response = await axiosInstance.post(`/${endPoint}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
