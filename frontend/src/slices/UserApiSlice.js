import { apiSlice } from './ApiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/auth`,
          method: 'POST',
          body: data,
        }),
      }),
      googleLogin: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/googleAuth`,
          method: 'POST',
          body: data ,
        }),
      }),
      verifyOTP: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/verifyOtp`,
          method: 'POST',
          body: data,
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: 'POST',
        }),
      }),
      register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/register`,
          method: 'POST',
          body: data,
        }),
       }),
       updateUser: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/editProfile`,
          method: 'PUT',
          body: data,
        }),
        
      }),
    }),
  });
  
  export const { useLoginMutation,useGoogleLoginMutation,useLogoutMutation,useVerifyOTPMutation,useRegisterMutation, useUpdateUserMutation } = userApiSlice;