import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const token = localStorage.getItem("token");

export const authRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  },
});

authRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      toast.error("Expired token, kindly login", {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export { BASE_URL };
