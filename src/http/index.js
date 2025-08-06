// import APIConfig from "@/config/setting";
// import axios from 'axios';
// import router from '@/router/index.js';

// const instance = axios.create(APIConfig);

// // 🔐 Intercepteur de requêtes : ajoute l'access token dans les headers
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🔁 Intercepteur de réponse : gère le token expiré et tente un refresh
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refresh = localStorage.getItem("refresh");
//         const res = await axios.post(
//           `${APIConfig.baseURL}/refresh/`,
//           { refresh }
//         );

//         const newAccess = res.data.access;
//         localStorage.setItem("access", newAccess);

//         originalRequest.headers.Authorization = `Bearer ${newAccess}`;
//         return instance(originalRequest);
//       } catch (refreshError) {
//         console.error("❌ Refresh token invalide ou expiré");
//         localStorage.removeItem("access");
//         localStorage.removeItem("refresh");
//         router.push("/login");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default instance;
import APIConfig from "@/config/setting";
import axios from "axios";
import router from "@/router/index.js";

const instance = axios.create(APIConfig);

// 🔐 Intercepteur de requêtes : ajoute le token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Intercepteur de réponses : refresh automatique
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh/")
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        router.push("/login");
        return Promise.reject(error);
      }

      try {
        const refreshURL = `${APIConfig.baseURL.replace(
          /\/$/,
          ""
        )}/api/v1/refresh/`;
        const res = await axios.post(refreshURL, { refresh });

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token invalide ou expiré");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        router.push("/login");
        return Promise.reject(refreshError); // ⛔ IMPORTANT
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
