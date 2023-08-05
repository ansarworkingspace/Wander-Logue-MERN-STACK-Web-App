import { apiSlice } from "../slices/ApiSlice";
const ADMIN_URL = '/api/admin';

export const AdminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      adminLogin: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/auth`,
          method: 'POST',
          body: data,
        }),
      }),
      adminLogout: builder.mutation({
        query: () => ({
          url: `${ADMIN_URL}/logout`,
          method: 'POST',
        }),
      }),
      adminRegister: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/register`,
          method: 'POST',
          body: data,
        }),
       }),
       
    }),
  });
  
  export const { useAdminLoginMutation,useAdminLogoutMutation,useAdminRegisterMutation} = AdminApiSlice;