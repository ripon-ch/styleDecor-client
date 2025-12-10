import axiosInstance from './axiosConfig';
import { API_ENDPOINTS } from './config';

export const authAPI = {
  async signIn(email, password) {
    try {
      const response = await axiosInstance?.post(API_ENDPOINTS?.AUTH?.LOGIN, {
        email,
        password,
      });

      const { token, refreshToken, user } = response?.data;
      
      // Store tokens
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      return { user, session: { access_token: token } };
    } catch (error) {
      throw new Error(error?.message || 'Login failed');
    }
  },

  async signUp(email, password, fullName, phone, address, role = 'customer') {
    try {
      const response = await axiosInstance?.post(API_ENDPOINTS?.AUTH?.REGISTER, {
        email,
        password,
        fullName,
        phone,
        address,
        role,
      });

      const { token, refreshToken, user } = response?.data;
      
      // Store tokens
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      return { user, session: { access_token: token } };
    } catch (error) {
      throw new Error(error?.message || 'Registration failed');
    }
  },

  async signOut() {
    try {
      await axiosInstance?.post(API_ENDPOINTS?.AUTH?.LOGOUT);
      
      // Clear tokens
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      // Even if logout fails, clear local tokens
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      throw new Error(error?.message || 'Logout failed');
    }
  },

  async getProfile() {
    try {
      const response = await axiosInstance?.get(API_ENDPOINTS?.AUTH?.GET_PROFILE);
      return response?.data?.user;
    } catch (error) {
      throw new Error(error?.message || 'Failed to fetch profile');
    }
  },

  async forgotPassword(email) {
    try {
      const response = await axiosInstance?.post(API_ENDPOINTS?.AUTH?.FORGOT_PASSWORD, {
        email,
      });
      return response?.data;
    } catch (error) {
      throw new Error(error?.message || 'Failed to send reset email');
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await axiosInstance?.post(API_ENDPOINTS?.AUTH?.RESET_PASSWORD, {
        token,
        password: newPassword,
      });
      return response?.data;
    } catch (error) {
      throw new Error(error?.message || 'Failed to reset password');
    }
  },

  async verifyEmail(token) {
    try {
      const response = await axiosInstance?.post(API_ENDPOINTS?.AUTH?.VERIFY_EMAIL, {
        token,
      });
      return response?.data;
    } catch (error) {
      throw new Error(error?.message || 'Email verification failed');
    }
  },
};