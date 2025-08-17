import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "multipart/form-data",
    "Content-Type" : "application/json"
  },
});

