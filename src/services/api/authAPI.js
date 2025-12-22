import axios from "./axiosConfig.js";

export const authAPI = {
  async login(email, password) {
    const res = await axios.post("/auth/login", { email, password });
    return res.data; // { token, user }
  },

  async register(data) {
    const res = await axios.post("/auth/register", data);
    return res.data;
  },

  async getProfile() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    const res = await axios.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.user;
  },

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
