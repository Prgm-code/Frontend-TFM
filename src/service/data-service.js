import axios from "axios";
import { useAuthStore } from "../store/usersStore";
const BASE_URL = "http://localhost:3500";

const handleToken = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  axios.defaults.headers.common["x-access-token"] = token;
  axios.defaults.headers.common["Content-Type"] = "application/json";
};

export const getUsers = async () => {
  {
    try {
      handleToken();
      const { data } = await axios.get(`${BASE_URL}/users`);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export const registerUser = async (user) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/register`, user);
    return data;
  } catch (error) {
    console.log(error);
    return error;

  }
};

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/login`, user);
    
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Path: src/components/Post.js
