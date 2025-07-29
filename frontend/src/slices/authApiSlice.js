import {BASE_URL} from '../constants.js';
import {apiSlice} from './apiSlice.js'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/auth/login`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            keepUnusedDataFor: 5
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/auth/register`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            keepUnusedDataFor: 5
        }),
        getMe: builder.query({
            query: () => ({
                url: `${BASE_URL}/api/auth/me`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useGetMeQuery} = authApiSlice
