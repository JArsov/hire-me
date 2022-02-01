import axiosImport from "axios";

const axios = axiosImport.create({
  baseURL: process.env.REACT_APP_API_URL
})

export default axios