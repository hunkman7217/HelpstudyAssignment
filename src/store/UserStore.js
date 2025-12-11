import { create } from "zustand";
import axios from "axios";

const useUsersStore = create((set, get) => ({
  // STATES
  User: [],
  total: 0,
  limit: 12,
  skip: 0,
  search: "",
  page: 0, // ADDED for User.js compatibility
  loading: false, // ADDED for User.js and UserByid.js
  selectedUser: null, // ADDED for UserByid.js
  error: null, // ADDED for User.js error handling

  // ACTIONS
  setSearch: (value) => set({ search: value }),

  // For User.js pagination compatibility
  setPage: (value) => {
    set({ skip: value * get().limit }); // Convert page to skip
    get().fetchUsers();
  },

  // Search function for User.js
  searchUsers: (value) => {
    set({ search: value, skip: 0, page: 0 });
    get().fetchUsers();
  },

  // Fetch single user for UserByid.js
  fetchUserById: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      set({
        selectedUser: response.data,
        loading: false,
      });
    } catch (error) {
      console.log("Error fetching user:", error);
      set({
        error: "Failed to fetch user",
        loading: false,
      });
    }
  },

  // Added loading state
  fetchUsers: async () => {
    set({ loading: true });
    const { limit, skip, search } = get();

    let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

    if (search.trim() !== "") {
      url = `https://dummyjson.com/users/search?q=${search}`;
    }

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Calculate page number for compatibility
      const page = skip / limit;

      set({
        User: data.users,
        total: data.total,
        page: page, // Keep page in sync
        loading: false,
      });
    } catch (error) {
      console.log("Error fetching users:", error);
      set({
        error: "Failed to fetch users",
        loading: false,
      });
    }
  },

  nextPage: () => {
    const { skip, limit } = get();
    const newSkip = skip + limit;
    set({ skip: newSkip, page: newSkip / limit });
    get().fetchUsers();
  },

  prevPage: () => {
    const { skip, limit } = get();
    const newSkip = Math.max(0, skip - limit);
    set({ skip: newSkip, page: newSkip / limit });
    get().fetchUsers();
  },
}));

export default useUsersStore;
