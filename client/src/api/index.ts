import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ForCreatingGroup,
  ForCreatingUser,
  GroupExtended,
  User,
} from "../types";

const URL = "http://localhost:3080/api/";

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    headers: { "Access-Control-Allow-Origin": "*" },
  }),
  tagTypes: ["Users", "Groups"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    deleteUser: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    createUser: builder.mutation<void, ForCreatingUser>({
      query: (user) => ({
        url: `user`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation<
      void,
      { id: number | string; data: Partial<ForCreatingUser> }
    >({
      query: (data) => {
        //@ts-ignore
        const { id, ...body } = data;
        return {
          url: `user/${id}`,
          method: "PATCH",
          body: body.data,
        };
      },
      invalidatesTags: ["Users"],
    }),

    getGroups: builder.query<GroupExtended[], void>({
      query: () => "groups",
      providesTags: ["Groups"],
    }),

    createGroup: builder.mutation<void, ForCreatingGroup>({
      query: (group) => ({
        url: `group`,
        method: "POST",
        body: group,
      }),
      invalidatesTags: ["Groups"],
    }),

    deleteGroup: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Groups"],
    }),

    updateGroup: builder.mutation<
      void,
      { id: number | string; data: Partial<ForCreatingGroup> }
    >({
      query: (data) => {
        //@ts-ignore
        const { id, ...body } = data;
        return {
          url: `group/${id}`,
          method: "PATCH",
          body: body.data,
        };
      },
      invalidatesTags: ["Groups", "Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetGroupsQuery,
  useDeleteUserMutation,
  useDeleteGroupMutation,
  useCreateUserMutation,
  useCreateGroupMutation,
  useUpdateUserMutation,
  useUpdateGroupMutation,
} = usersApi;
