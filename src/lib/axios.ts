import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axiosInstance.defaults.headers.common.Authorization = `Bearer ${
  import.meta.env.VITE_TOKEN
}`;

export { axiosInstance };
