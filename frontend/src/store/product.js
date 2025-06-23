import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        set({ products: data.data });
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  },

  createProduct: async (product) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      return await res.json();
    } catch (err) {
      console.error("Error creating product:", err);
    }
  },

  updateProduct: async (pid, update) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      return await res.json();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          products: state.products.filter((p) => p._id !== pid),
        }));
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  },
}));
