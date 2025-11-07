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
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApiSlice;
