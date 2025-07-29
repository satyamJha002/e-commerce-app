import {PRODUCTS_URL} from "../constants.js";
import apiSlice from './apiSlice.js'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const {useGetAllProductsQuery} = productApiSlice
