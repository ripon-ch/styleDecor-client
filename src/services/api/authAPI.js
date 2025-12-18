import axios from "./axiosConfig";

export const authAPI = {
  // LOGIN
  login: async (email, password) => {
    const res = await axios.post("/auth/login", {
      email,
      password,
    });

    const token = res.data?.token || res.data?.data?.token;
    const user = res.data?.user || res.data?.data?.user;

    if (!token || !user) {
      throw new Error("Invalid login response");
    }

    localStorage.setItem("authToken", token);
    return { user };
  },

  // REGISTER
  register: async (userData) => {
    const res = await axios.post("/auth/register", userData);

    const token = res.data?.token || res.data?.data?.token;
    const user = res.data?.user || res.data?.data?.user;

    localStorage.setItem("authToken", token);
    return { user };
  },

  // PROFILE
  getProfile: async () => {
    const res = await axios.get("/auth/profile");
    return res.data?.data || res.data;
  },

  logout: async () => {
    await axios.post("/auth/logout");
    localStorage.removeItem("authToken");
  },
};
