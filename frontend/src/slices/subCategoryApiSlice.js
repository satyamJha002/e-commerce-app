import { SUBCATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const subCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: `${SUBCATEGORY_URL}/create-sub-categories`,
        method: "POST",
        body: data,
      }),
    }),

    getAllSubCategory: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        categoryId = "",
        status = "",
      } = {}) => ({
        url: `${SUBCATEGORY_URL}/get-all-sub-categories`,
        method: "GET",
        params: { page, limit, search, categoryId, status },
      }),
    }),

    // Public endpoint - no auth required
    getSubCategoriesByCategoryName: builder.query({
      query: (categoryName) => ({
        url: `${SUBCATEGORY_URL}/by-category-name/${categoryName}`,
        method: "GET",
      }),
    }),

    // Public endpoint - Get products by category and subcategory name
    getProductsBySubCategory: builder.query({
      query: ({ categoryName, subCategoryName, page = 1, limit = 20 }) => ({
        url: `${SUBCATEGORY_URL}/products/${categoryName}/${subCategoryName}`,
        method: "GET",
        params: { page, limit },
      }),
    }),

    updateSubCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${SUBCATEGORY_URL}/update-sub-categories/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `${SUBCATEGORY_URL}/delete-sub-categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateSubCategoryMutation,
  useGetAllSubCategoryQuery,
  useGetSubCategoriesByCategoryNameQuery,
  useGetProductsBySubCategoryQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApiSlice;
