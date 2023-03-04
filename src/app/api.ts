import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Account, AccountForm, LoginForm, Transaction, User } from '@types'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['User', 'Accounts', 'Transactions'],
  endpoints: (build) => ({
    createAccount: build.mutation<{}, AccountForm>({
      query: (body) => ({
        url: '/accounts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Accounts', id: 'LIST' }],
    }),
    account: build.query<Account | null, { accountId: string }>({
      query: ({ accountId }) => ({
        url: `/accounts/${accountId}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result ? [{ type: 'Accounts', id: result.uuid }] : [{ type: 'Accounts', id: 'ITEM' }],
    }),
    accounts: build.query<Account[] | null, { userId: string }>({
      query: ({ userId }) => ({
        url: `/user/${userId}/accounts`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ uuid }) => ({ type: 'Accounts' as const, id: uuid })),
              { type: 'Accounts', id: 'LIST' },
            ]
          : [{ type: 'Accounts', id: 'LIST' }],
    }),
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
    transactions: build.query<Transaction[] | null, { accountId: string }>({
      query: ({ accountId }) => ({
        url: `/accounts/${accountId}/transactions`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ accountId, uuid }) => ({
                type: 'Transactions' as const,
                id: uuid,
                accountId,
              })),
              { type: 'Transactions', id: 'LIST' },
            ]
          : [{ type: 'Transactions', id: 'LIST' }],
    }),
  }),
})

export const {
  useAccountQuery,
  useAccountsQuery,
  useCreateAccountMutation,
  useLazyMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useTransactionsQuery,
} = api
