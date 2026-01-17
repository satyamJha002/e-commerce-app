import { DASHBOARD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: `${DASHBOARD_URL}/stats`,
      }),
      keepUnusedDataFor: 60, // Cache for 1 minute
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApiSlice;
