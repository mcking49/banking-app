import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

import { ObjectValues } from '@types'

export const Pages = {
  accounts: 'Accounts',
  login: 'Login',
  transactions: 'Transactions',
  unknown: null,
} as const

type PageName = ObjectValues<typeof Pages>

type PageState = {
  value: PageName
}

const initialState: PageState = {
  value: Pages.unknown,
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<PageName>) => {
      state.value = action.payload
    },
  },
})

export const { setPage } = pageSlice.actions
export const selectPage = (state: RootState) => state.page.value
export default pageSlice.reducer
