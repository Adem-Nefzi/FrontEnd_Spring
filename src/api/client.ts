// src/api/client.ts
import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082/api", // Spring Boot default port
  withCredentials: true, // Essential for session cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to handle auth tokens
api.interceptors.request.use((config) => {
  // If you need to add any headers for Spring Boot
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
