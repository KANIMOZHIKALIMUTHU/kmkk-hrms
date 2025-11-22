import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "https://kmkk-hrms1.onrender.com/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or wherever you store it
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
