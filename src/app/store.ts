import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/features/api/baseApi'
import cart from '@/features/cart/cartSlice'
import auth from '@/features/auth/authSlice'

export const store = configureStore({
  reducer: { [baseApi.reducerPath]: baseApi.reducer, cart, auth },
  middleware: (gDM) => gDM().concat(baseApi.middleware),
  devTools: import.meta.env.DEV,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
