import axios from "axios";

const BASE_URL = "https://hadoop-tfm.prgm.info/api";

const handleToken = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  axios.defaults.headers.common["x-access-token"] = token;
  axios.defaults.headers.common["Content-Type"] = "application/json";
};

export const getUsers = async () => {
  
      handleToken();
      return await axios.get(`${BASE_URL}/users`);
       
   
};

export const registerUserApi = async (user) => {
  return await axios.post(`${BASE_URL}/register`, user);
 
};

export const login = async (user) => {
  return await axios.post(`${BASE_URL}/login`, user);
    
 
};


