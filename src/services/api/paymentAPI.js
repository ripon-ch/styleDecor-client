import axiosInstance from './axiosConfig.js';
import { API_ENDPOINTS } from './config.js';

export const paymentAPI = {
  async getAll(userId) {
    try {
      const response = await axiosInstance?.get(
        `${API_ENDPOINTS?.PAYMENTS?.GET_ALL}?customerId=${userId}`
      );

      return response?.data?.payments;
    } catch (error) {
      throw new Error(error?.message || 'Failed to fetch payments');
    }
  },

  async getById(id) {
    try {
      const response = await axiosInstance?.get(API_ENDPOINTS?.PAYMENTS?.GET_BY_ID(id));
      return response?.data?.payment;
    } catch (error) {
      throw new Error(error?.message || 'Failed to fetch payment details');
    }
  },

  async createPaymentIntent(bookingId, amount) {
    try {
      const response = await axiosInstance?.post(
        API_ENDPOINTS?.PAYMENTS?.CREATE_PAYMENT_INTENT,
        {
          bookingId,
          amount,
        }
      );

      return response?.data;
    } catch (error) {
      throw new Error(error?.message || 'Failed to create payment intent');
    }
  },

  async confirmPayment(paymentIntentId, paymentMethodId) {
    try {
      const response = await axiosInstance?.post(
        API_ENDPOINTS?.PAYMENTS?.CONFIRM_PAYMENT,
        {
          paymentIntentId,
          paymentMethodId,
        }
      );

      return response?.data?.payment;
    } catch (error) {
      throw new Error(error?.message || 'Payment confirmation failed');
    }
  },
};