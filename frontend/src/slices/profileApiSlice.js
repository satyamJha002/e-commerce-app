import {apiSlice} from './apiSlice.js'
import {PROFILE_URL} from '../constants.js'

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: PROFILE_URL,
                credentials: 'include',
            }),
            providesTags: ['Profile']
        }),
        updateProfileDetails: builder.mutation({
            query: (data) => ({
                url: PROFILE_URL,
                method: 'PUT',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['Profile']
        }),
        updateAvatar: builder.mutation({
            query: (data) => ({
                url: `${PROFILE_URL}/upload-avatar`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['Profile']
        })
    })
})

export const {useGetProfileQuery, useUpdateProfileDetailsMutation, useUpdateAvatarMutation} = profileApiSlice
