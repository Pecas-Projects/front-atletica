import axios from "axios";
const url = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: url,
  config: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
});

export default api;
