// API Configuration for MongoDB Backend
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
    GET_PROFILE: `${API_BASE_URL}/auth/profile`,
  },
  
  // Services
  SERVICES: {
    GET_ALL: `${API_BASE_URL}/services`,
    GET_BY_ID: (id) => `${API_BASE_URL}/services/${id}`,
    CREATE: `${API_BASE_URL}/services`,
    UPDATE: (id) => `${API_BASE_URL}/services/${id}`,
    DELETE: (id) => `${API_BASE_URL}/services/${id}`,
  },
  
  // Bookings
  BOOKINGS: {
    GET_ALL: `${API_BASE_URL}/bookings`,
    GET_BY_ID: (id) => `${API_BASE_URL}/bookings/${id}`,
    CREATE: `${API_BASE_URL}/bookings`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/bookings/${id}/status`,
    ASSIGN_DECORATOR: (id) => `${API_BASE_URL}/bookings/${id}/assign-decorator`,
  },
  
  // Payments
  PAYMENTS: {
    GET_ALL: `${API_BASE_URL}/payments`,
    GET_BY_ID: (id) => `${API_BASE_URL}/payments/${id}`,
    CREATE_PAYMENT_INTENT: `${API_BASE_URL}/payments/create-intent`,
    CONFIRM_PAYMENT: `${API_BASE_URL}/payments/confirm`,
  },
  
  // Reviews
  REVIEWS: {
    GET_BY_SERVICE: (serviceId) => `${API_BASE_URL}/reviews/service/${serviceId}`,
    GET_BY_DECORATOR: (decoratorId) => `${API_BASE_URL}/reviews/decorator/${decoratorId}`,
    CREATE: `${API_BASE_URL}/reviews`,
  },
};

export default API_BASE_URL;