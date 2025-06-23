import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required." };
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data?.message || "Server error" };
      }

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "Network error" };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${pid}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data?.message || "Server error" };
      }
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: "Product deleted" };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Network error" };
    }
  },
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${pid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data?.message || "Server error" };
      }
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
      return { success: true, message: "Product updated" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Network error" };
    }
  },
}));
