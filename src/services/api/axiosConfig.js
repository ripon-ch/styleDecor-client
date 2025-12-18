import axios from 'axios';

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Global response error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errMsg = error?.response?.data?.message || error?.message || 'An error occurred';
    return Promise.reject(new Error(errMsg));
  }
);

export default axiosInstance;
