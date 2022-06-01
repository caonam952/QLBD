import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: window.sessionStorage.getItem("token"),
  },
});

export { API };
