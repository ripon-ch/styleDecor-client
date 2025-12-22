import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const authService = {
  async signIn(email, password) {
    const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
    return data;
  },

  async signUp(email, password, fullName, phone, address, role = 'customer') {
    const { data } = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      fullName,
      phone,
      address,
      role,
    });
    return data;
  },

  async signOut() {
    const { data } = await axios.post(`${API_URL}/auth/logout`);
    return data;
  },

  async resetPassword(email) {
    const { data } = await axios.post(`${API_URL}/auth/reset-password`, { email });
    return data;
  },

  async updatePassword(newPassword) {
    const { data } = await axios.patch(`${API_URL}/auth/update-password`, { newPassword });
    return data;
  },
};
