import axiosInstance from './axiosConfig';
import { API_ENDPOINTS } from './config';

export const reviewAPI = {
  async getByService(serviceId) {
    try {
      const response = await axiosInstance?.get(
        API_ENDPOINTS?.REVIEWS?.GET_BY_SERVICE(serviceId)
      );

      return response?.data?.reviews;
    } catch (error) {
      throw new Error(error?.message || 'Failed to fetch service reviews');
    }
  },

  async getByDecorator(decoratorId) {
    try {
      const response = await axiosInstance?.get(
        API_ENDPOINTS?.REVIEWS?.GET_BY_DECORATOR(decoratorId)
      );

      return response?.data?.reviews;
    } catch (error) {
      throw new Error(error?.message || 'Failed to fetch decorator reviews');
    }
  },

  async create(review) {
    try {
      const response = await axiosInstance?.post(API_ENDPOINTS?.REVIEWS?.CREATE, {
        bookingId: review?.bookingId,
        decoratorId: review?.decoratorId,
        rating: review?.rating,
        comment: review?.comment,
      });

      return response?.data?.review;
    } catch (error) {
      throw new Error(error?.message || 'Failed to submit review');
    }
  },
};