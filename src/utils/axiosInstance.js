import axios from "axios";

// Log the API URL to verify environment variables are loaded
console.log('API URL:', import.meta.env.VITE_API_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL , // fallback if env not loaded
  withCredentials: true,                 // send httpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
