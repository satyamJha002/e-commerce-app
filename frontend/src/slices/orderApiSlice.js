import { BASE_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

const ORDERS_URL = `${BASE_URL}/api/orders`;

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: `${ORDERS_URL}/verify-payment`,
        method: "POST",
        body: paymentData,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
} = orderApiSlice;
