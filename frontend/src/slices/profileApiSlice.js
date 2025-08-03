import {apiSlice} from './apiSlice.js'
import {BASE_URL} from '../constants.js'

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: `${BASE_URL}/api/profile`,
                credentials: 'include',
            }),
            providesTags: ['Profile']
        }),
        updateProfileDetails: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/profile`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['Profile']
        })
    })
})

export const {useGetProfileQuery, useUpdateProfileDetailsMutation} = profileApiSlice
