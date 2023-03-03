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
    logout: build.mutation<{}, null>({
      query: () => ({
        url: '/__admin/scenarios/reset',
        method: 'POST',
        headers: {
          Authorization: `Token ${import.meta.env.VITE_API_ADMIN_KEY}`,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(api.util.resetApiState())
      },
    }),
    me: build.query<User | null, null>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery, useLazyMeQuery } = api
