import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import authReducer from "./slices/authSlice.js";
import productReducer from "./slices/productsSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
