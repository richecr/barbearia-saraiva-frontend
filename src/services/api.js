import axios from 'axios';
import AuthService from './AuthService';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

api.interceptors.request.use(async (config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
