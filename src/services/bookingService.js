import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const bookingService = {
  async getAll(userId, role) {
    const { data } = await axios.get(`${API_URL}/bookings`, { params: { userId, role } });
    return data;
  },

  async getById(id) {
    const { data } = await axios.get(`${API_URL}/bookings/${id}`);
    return data;
  },

  async create(booking) {
    const { data } = await axios.post(`${API_URL}/bookings`, booking);
    return data;
  },

  async updateStatus(id, status) {
    const { data } = await axios.patch(`${API_URL}/bookings/${id}/status`, { status });
    return data;
  },

  async assignDecorator(id, decoratorId) {
    const { data } = await axios.patch(`${API_URL}/bookings/${id}/assign`, { decoratorId });
    return data;
  },
};
