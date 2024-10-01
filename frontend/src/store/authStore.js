import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.NODE_ENV === "development" ? "http://localhost:8080/api/auth" : '/api/auth';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoding: false,
  isChekingAuth: true,
  error: null,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/signup`,
        {
          email,
          password,
          name,
        },
        { withCredentials: true }
      );

      if (response && response.data) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        console.log("Error in signup: response is not as expected!");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/verify-email`,
        { code },
        { withCredentials: true }
      );
      if (response && response.data) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
        return response.data;
      } else {
        console.log("Invalid verification code and response is not expected !");
      }
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`, {
        withCredentials: true,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response && response.data) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error.response.data.message
          ? error.response.data.message
          : "Credentials are invalid or somthing went wrong with the login!",
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  logout: async () => {
    set({ error: null, isAuthenticated: false, isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/logout`, {
        withCredentials: true,
      });
      if (response && response.data)
        set({ isAuthenticated: false, isLoading: false });
      return;
    } catch (error) {
      set({
        error: error.response.data.message,
        isAuthenticated: false,
        isLoading: false,
      });
      throw new error();
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/forgot-password`,
        { email },
        { withCredentials: true }
      );
      if (response && response.data) {
        set({ isLoading: false, user: response.data.user });
      }
      return;
    } catch (error) {
      set({
        error: error.response.data.message
          ? error.response.data.message
          : "Credentials are invalid or somthing went wrong with the forgot-password!",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      }, { withCredentials: true });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
