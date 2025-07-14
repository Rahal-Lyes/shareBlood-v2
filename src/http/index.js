import APIConfig from "@/config/setting";
import axios from 'axios';
import router from '@/router/index.js';

// Crée l'instance axios
const instance = axios.create(APIConfig);

// Intercepteur pour ajouter le token dans les headers
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Récupère le token depuis le localStorage
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Ajoute le header Authorization
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
