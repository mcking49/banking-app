import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import pageReducer from './slices/pageSlice'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    page: pageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
