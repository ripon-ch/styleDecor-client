import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const serviceService = {
  async getAll(filters = {}) {
    const { category, search, minCost, maxCost } = filters;
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    if (minCost) params.minCost = minCost;
    if (maxCost) params.maxCost = maxCost;

    const { data } = await axios.get(`${API_URL}/services`, { params });
    return data.services || data.data || data || [];
  },

  async getById(id) {
    const { data } = await axios.get(`${API_URL}/services/${id}`);
    return data.services || data.data || data || [];
  },

  async create(service) {
    const { data } = await axios.post(`${API_URL}/services`, service);
    return data.services || data.data || data || [];
  },

  async update(id, updates) {
    const { data } = await axios.put(`${API_URL}/services/${id}`, updates);
    return data.services || data.data || data || [];
  },

  async delete(id) {
    const { data } = await axios.delete(`${API_URL}/services/${id}`);
    return data.services || data.data || data || [];
  },
};
