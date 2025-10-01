import { BASE_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/auth/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/api/auth/refresh-token`,
        method: "POST",
        credentials: "include",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/auth/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    getMe: builder.query({
      query: () => ({
        url: `${BASE_URL}/api/auth/me`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/api/auth/logout`,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Reset the entire API state
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log("Logout error:", err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApiSlice;
