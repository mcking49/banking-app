import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { LoginForm, User } from '@types'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    login: build.mutation<User, LoginForm>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    me: build.query<User, null>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = api
