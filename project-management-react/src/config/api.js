import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Thêm Authorization header trước mỗi request
api.interceptors.request.use((config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) config.headers["Authorization"] = `Bearer ${jwt}`;
    return config;
});

export default api;