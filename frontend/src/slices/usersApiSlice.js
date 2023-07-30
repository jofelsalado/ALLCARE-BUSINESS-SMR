import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";
const COMPANY_URL = "/api/company";
const PRODUCT_URL = "/api/product";

const advisorAdapter = createEntityAdapter({});
const leadsAdapter = createEntityAdapter({});

const advisorInitialState = advisorAdapter.getInitialState();
const leadsInitialState = leadsAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    addCompany: builder.mutation({
      query: (data) => ({
        url: `${COMPANY_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getAdvisorUsers: builder.query({
      query: () => "/api/users/advisor-list",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedAdvisors = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return advisorAdapter.setAll(advisorInitialState, loadedAdvisors);
      },
    }),
    getLeads: builder.query({
      query: () => "/api/users/leads-list",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedLeads = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return leadsAdapter.setAll(leadsInitialState, loadedLeads);
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAdvisorUsersQuery,
  useGetLeadsQuery,
  useLoginMutation,
  useLogoutMutation,
  useAddUserMutation,
  useAddProductMutation,
  useUpdateProfileMutation,
  useAddCompanyMutation,
} = usersApiSlice;

// returns the query result object
export const selectAdvisorResult =
  usersApiSlice.endpoints.getAdvisorUsers.select();

export const selectLeadsResult = usersApiSlice.endpoints.getLeads.select();

// creates memoized selector
