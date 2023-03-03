import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import pageTitleReducer from './slices/pageTitleSlice'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    pageTitle: pageTitleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
