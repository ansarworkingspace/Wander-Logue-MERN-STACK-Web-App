import { ApiSlice } from './ApiSlice';
const ADMIN_URL = '/api/admin';

export const AdminApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/auth`,
          method: 'POST',
          body: data,
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: `${ADMIN_URL}/logout`,
          method: 'POST',
        }),
      }),
      register: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/register`,
          method: 'POST',
          body: data,
        }),
       }),
       
    }),
  });
  
  export const { useAdminLoginMutation,useAdminLogoutMutation,useAdminRegisterMutation} = AdminApiSlice;