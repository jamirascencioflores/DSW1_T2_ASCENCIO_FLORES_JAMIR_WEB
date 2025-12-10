import axios from "axios";

// Usamos el puerto 5129 que me acabas de dar
const API_URL = "http://localhost:5129/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
