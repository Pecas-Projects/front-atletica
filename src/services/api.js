import axios from "axios";
const url = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("@Olympos:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
