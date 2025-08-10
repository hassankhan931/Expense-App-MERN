import axios from "axios";

// Railway backend URL
const API = axios.create({
  baseURL: "https://localrepo-production-d703.up.railway.app/api",
});

// Attach JWT token to each request if available
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
