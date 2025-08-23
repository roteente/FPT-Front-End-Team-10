import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/core/api/baseApi'

import orderReducer from '@/features/orders/orderSlice'
import { authSlice } from '@/features/auth/model/authSlice'
import { cartSlice } from '@/features/cart/model/cartSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
  order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
