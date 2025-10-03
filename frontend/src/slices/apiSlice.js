import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";
import { logout } from "../slices/authSlice.js";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    try {
      const refreshResult = await baseQuery(
        { url: "/api/auth/refresh-token", method: "POST" },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Retry the original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, logout user
        api.dispatch(logout());
        window.location.href = "/login";
      }
    } catch (error) {
      api.dispatch(logout());
      window.location.href = "/login";
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
