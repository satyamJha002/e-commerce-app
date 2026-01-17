import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import authReducer from "./slices/authSlice.js";
import productReducer from "./slices/productsSlice.js";
import categoryReducer from "./slices/categorySlice.js";
import subCategoryReducer from "./slices/subCategorySlice.js";
import cartReducer from "./slices/cartSlice.js"

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
