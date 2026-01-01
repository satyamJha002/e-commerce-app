import { BASE_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/auth/login`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/auth/register`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/auth/google`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),

    getMe: builder.query({
      query: () => ({
        url: `${BASE_URL}/api/auth/me`,
      }),
      keepUnusedDataFor: 5,
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/api/auth/refresh-token`,
        method: "POST",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/api/auth/logout`,
        method: "POST",
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
  useGoogleLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApiSlice;
