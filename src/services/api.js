import axios from "axios";
import { getToken } from '../utils/storage'

const url = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
