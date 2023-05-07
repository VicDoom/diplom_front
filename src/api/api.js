import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Connection", "keep-alive");
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
    mode: "cors" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    authLogin: builder.mutation({
      query: (queryArg) => (
        {
          url: "/auth/login",
          method: "POST",
          body: queryArg,
        }
      ),
    }),
    authRegister: builder.mutation({
      query: (queryArg) => (
        {
          url: "/auth/registration",
          method: "POST",
          body: queryArg,
        }
      ),
    }),
    getTasks: builder.query({
      query: () => (
        {
          url: "/study-center/tasks",
          method: "GET",
        }
      ),
    }),
    getTask: builder.query({
      query: (queryArg) => ({
        url: `/study-center/task/${queryArg.id}`,
        method: "GET",
      }),
    }),
    getUserInfo: builder.query({
      query: (queryArg) => ({
        url: "/auth/user-info",
        method: "POST",
        body: queryArg,
      }),
    }),
    postTaskResult: builder.mutation({
      query: (queryArg) => ({
        url: "/study-center/task",
        method: "POST",
        body: queryArg,
      }),
    }),
    getTasksResult: builder.query({
      query: (queryArg) => ({
        url: "/study-center/tasks-result",
        method: "POST",
        body: queryArg,
      }),
    }),
    getTheories: builder.query({
      query: (queryArg) => ({
        url: "/study-center/theories",
        method: "GET",
      }),
    }),
    getTheory: builder.query({
      query: (queryArg) => ({
        url: `/study-center/theory/${queryArg.id}`,
        method: "GET",
      }),
    }),
    getStudents: builder.query({
      query: (queryArg) => ({
        url: "/auth/students",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useGetTasksQuery,
  useGetTaskQuery,
  useGetUserInfoQuery,
  usePostTaskResultMutation,
  useGetTasksResultQuery,
  useGetTheoriesQuery,
  useGetTheoryQuery,
  useGetStudentsQuery,
} = api;