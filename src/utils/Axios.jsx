import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API}/api`,
  headers: {
    "Content-Type": "multipart/form-data",
    "Content-Type": "application/json",
  },
});

