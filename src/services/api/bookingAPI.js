import axiosInstance from "./axiosConfig.js";
import { API_ENDPOINTS } from "./config.js";

export const bookingAPI = {
    async getAll(userId, role) {
        try {
            const params = new URLSearchParams();

            if (role === "customer") {
                params?.append("customerId", userId);
            } else if (role === "decorator") {
                params?.append("decoratorId", userId);
            }

            const response = await axiosInstance?.get(
                `${API_ENDPOINTS?.BOOKINGS?.GET_ALL}?${params?.toString()}`
            );

            return response?.data?.bookings;
        } catch (error) {
            throw new Error(error?.message || "Failed to fetch bookings");
        }
    },

    async getById(id) {
        try {
            const response = await axiosInstance?.get(
                API_ENDPOINTS?.BOOKINGS?.GET_BY_ID(id)
            );
            return response?.data?.booking;
        } catch (error) {
            throw new Error(
                error?.message || "Failed to fetch booking details"
            );
        }
    },

    async create(booking) {
        try {
            const response = await axiosInstance?.post(
                API_ENDPOINTS?.BOOKINGS?.CREATE,
                {
                    serviceId: booking?.serviceId,
                    decoratorId: booking?.decoratorId,
                    eventDate: booking?.eventDate,
                    location: booking?.location,
                    specialRequirements: booking?.specialRequirements,
                    totalAmount: booking?.totalAmount
                }
            );

            return response?.data?.booking;
        } catch (error) {
            throw new Error(error?.message || "Failed to create booking");
        }
    },

    async updateStatus(id, status) {
        try {
            const response = await axiosInstance?.patch(
                API_ENDPOINTS?.BOOKINGS?.UPDATE_STATUS(id),
                { status }
            );

            return response?.data?.booking;
        } catch (error) {
            throw new Error(
                error?.message || "Failed to update booking status"
            );
        }
    },

    async assignDecorator(id, decoratorId) {
        try {
            const response = await axiosInstance?.patch(
                API_ENDPOINTS?.BOOKINGS?.ASSIGN_DECORATOR(id),
                { decoratorId }
            );

            return response?.data?.booking;
        } catch (error) {
            throw new Error(error?.message || "Failed to assign decorator");
        }
    }
};
