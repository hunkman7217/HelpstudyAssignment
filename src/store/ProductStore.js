import { create } from "zustand";
import axios from "axios";

const useProductsStore = create((set, get) => ({
  // STATES
  Products: [],
  total: 0,
  limit: 12,
  skip: 0,
  page: 0, // ADDED for Products.js compatibility
  loading: false, // ADDED for Products.js and ProductsByid.js
  selectedProduct: null, // ADDED for ProductsByid.js
  error: null, // ADDED for error handling

  search: "",
  category: "",
  categories: [],

  // ACTIONS
  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),

  // For Products.js pagination compatibility
  setPage: (value) => {
    set({ skip: value * get().limit, page: value });
    get().fetchProducts();
  },

  // Search function for Products.js
  searchProducts: (value) => {
    set({ search: value, skip: 0, page: 0 });
    get().fetchProducts();
  },

  // Filter function for Products.js
  filterByCategory: (value) => {
    set({ category: value, skip: 0, page: 0 });
    get().fetchProducts();
  },

  // Fetch All Categories
  fetchCategories: async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");
      set({ categories: res.data });
    } catch (error) {
      console.log("Error fetching categories:", error);
      set({ error: "Failed to fetch categories" });
    }
  },

  // Fetch Products (list + search + filter + pagination)
  fetchProducts: async () => {
    set({ loading: true });
    const { limit, skip, search, category } = get();

    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    // Search applied
    if (search.trim() !== "") {
      url = `https://dummyjson.com/products/search?q=${search}`;
    }

    // Category filter applied
    if (category.trim() !== "") {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Calculate page number for compatibility
      const page = skip / limit;

      set({
        Products: data.products,
        total: data.total,
        page: page, // Keep page in sync
        loading: false,
      });
    } catch (error) {
      console.log("Error fetching products:", error);
      set({
        error: "Failed to fetch products",
        loading: false,
      });
    }
  },

  // Fetch Single Product - URL and added state update
  fetchProductById: async (id) => {
    set({ loading: true, selectedProduct: null });
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);  
      set({
        selectedProduct: res.data,
        loading: false,
      });
    } catch (error) {
      console.log("Error fetching product:", error);
      set({
        error: "Failed to fetch product",
        loading: false,
      });
    }
  },

  nextPage: () => {
    const { skip, limit } = get();
    const newSkip = skip + limit;
    set({ skip: newSkip, page: newSkip / limit });
    get().fetchProducts();
  },

  prevPage: () => {
    const { skip, limit } = get();
    const newSkip = Math.max(0, skip - limit);
    set({ skip: newSkip, page: newSkip / limit });
    get().fetchProducts();
  },
}));

export default useProductsStore;
