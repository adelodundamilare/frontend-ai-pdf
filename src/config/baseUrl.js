// src/config/baseUrl.js
// Import Axios
import axios from "axios";
// const BASE_URL = "https://lawtabby.pythonanywhere.com";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const token = localStorage.getItem("token");

// const BASE_URL = 'http://165.22.120.224';

// Create an instance of Axios with a base URL
export const authRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json", // Example content type, adjust as needed
  },
});

export { BASE_URL };
