import axios from "axios";

const api = axios.create({
  baseURL: "https://inkwell-backend-0xgp.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
