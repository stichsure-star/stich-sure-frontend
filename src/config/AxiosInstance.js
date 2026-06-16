import axios from "axios";
import { store } from "../global/store";

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

ApiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; 
    }

    return config;
  },
  (error) => Promise.reject(error),
);

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired or invalid");
    }

    return Promise.reject(error);
  },
);
