import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";
import { logout, setCredentials } from "../slices/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.userInfo?.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("Sending refresh token request from frontend");

    const refreshResult = await baseQuery(
      { url: "/api/auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // Retry the original request with new token
      const userInfo = api.getState().auth.userInfo;

      api.dispatch(
        setCredentials({
          ...userInfo,
          token: refreshResult.data.token,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
