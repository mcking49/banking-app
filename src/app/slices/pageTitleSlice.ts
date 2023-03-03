import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

type PageTitleState = {
  value: string | null
}

const initialState: PageTitleState = {
  value: null,
}

export const pageTitleSlice = createSlice({
  name: 'pageTitle',
  initialState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<string | null>) => {
      state.value = action.payload
    },
  },
})

export const { setPageTitle } = pageTitleSlice.actions
export const selectPageTitle = (state: RootState) => state.pageTitle.value
export default pageTitleSlice.reducer
