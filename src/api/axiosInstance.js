import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

axiosInstance.interceptors.request.use((config) => {
  const url = config.url || "";
  const publicPaths = ["/roles", "/login", "/signup"];
  const isPublic = publicPaths.some((p) => url.includes(p));
  const token = localStorage.getItem("token");

  if (!isPublic && token) {
    config.headers.Authorization = token; 
  } else if (config.headers?.Authorization) {
    delete config.headers.Authorization;
  }
  return config;
});

export default axiosInstance;
