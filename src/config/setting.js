export const backendURL = "http://127.0.0.1:8000/";
// export const backendURL = "https://shareblood-backend-2.vercel.app/";

const APIConfig = {
  baseURL: backendURL + "api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
};

export default APIConfig;
