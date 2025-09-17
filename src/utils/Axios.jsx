// utils/Axios.js
import axios from "axios";

console.log("Backend API:", process.env.NEXT_PUBLIC_BACKEND_API); // Debug

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API}/api`, // http://localhost:3000/api
  headers: {
    "Content-Type": "application/json", // Use only one Content-Type
  },
});
