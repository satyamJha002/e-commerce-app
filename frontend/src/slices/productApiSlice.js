import { PRODUCTS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/allproducts`,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsByCategory: builder.query({
      query: (limit = 4) => ({
        url: `${PRODUCTS_URL}/products-by-category`,
        params: { limit },
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/getproductdetails/${id}`,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/deleteproduct/${id}`,
        method: "DELETE",
      }),
    }),
    updateProductById: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCTS_URL}/updateproduct/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
} = productApiSlice;
