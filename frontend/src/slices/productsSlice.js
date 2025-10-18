import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: null,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  setLoading,
  setError,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
