import axios from "axios";
import { APP_BASE_URL } from "../../constants/api";
import headers from "./headers";

const axiosInstance = axios.create({
  baseURL: APP_BASE_URL,
});

const query = async ({ url, method, body }) => {
  return axiosInstance({
    url,
    method,
    headers,
    data: body,
  });
};

export default query;
