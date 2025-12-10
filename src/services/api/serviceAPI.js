import axiosInstance from './axiosConfig';
import { API_ENDPOINTS } from './config';

export const serviceAPI = {
  async getAll(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters?.category) {
        params?.append('category', filters?.category);
      }
      if (filters?.search) {
        params?.append('search', filters?.search);
      }
      if (filters?.minCost) {
        params?.append('minCost', filters?.minCost);
      }
      if (filters?.maxCost) {
        params?.append('maxCost', filters?.maxCost);
      }

      const response = await axiosInstance?.get(
        `${API_ENDPOINTS?.SERVICES?.GET_ALL}?${params?.toString()}`
      );

      return response?.data?.services;
    } catch (error) {
      throw new Error(error?.message || 'Failed to fetch services');
    }
  },

  async getById(id) {
    try {
      const response = await axiosInstance?.get(API_ENDPOINTS?.SERVICES?.GET_BY_ID(id));
      return response?.data?.service;
    } catch (error) {
      throw new Error(error?.message || 'Failed to fetch service details');
    }
  },

  async create(service) {
    try {
      const response = await axiosInstance?.post(API_ENDPOINTS?.SERVICES?.CREATE, {
        serviceName: service?.serviceName,
        description: service?.description,
        cost: service?.cost,
        unit: service?.unit,
        serviceCategory: service?.serviceCategory,
        isActive: service?.isActive ?? true,
        images: service?.images || [],
      });

      return response?.data?.service;
    } catch (error) {
      throw new Error(error?.message || 'Failed to create service');
    }
  },

  async update(id, updates) {
    try {
      const response = await axiosInstance?.put(API_ENDPOINTS?.SERVICES?.UPDATE(id), {
        serviceName: updates?.serviceName,
        description: updates?.description,
        cost: updates?.cost,
        unit: updates?.unit,
        serviceCategory: updates?.serviceCategory,
        isActive: updates?.isActive,
        images: updates?.images,
      });

      return response?.data?.service;
    } catch (error) {
      throw new Error(error?.message || 'Failed to update service');
    }
  },

  async delete(id) {
    try {
      await axiosInstance?.delete(API_ENDPOINTS?.SERVICES?.DELETE(id));
    } catch (error) {
      throw new Error(error?.message || 'Failed to delete service');
    }
  },
};