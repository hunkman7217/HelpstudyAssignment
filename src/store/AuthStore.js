import axios from "axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      set({
        user: res.data,
        token: res.data.token,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        loading: false,
        error: "Invalid username or password",
      });
      return false;
    }
  },

  logout: () => {
    set({ user: null, token: null });
  },
}));
