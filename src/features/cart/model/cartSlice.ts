import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState, ShippingInfo, Voucher } from './types'

const initialState: CartState = {
  items: [],
  shipping: {
    method: 'standard',
    cost: 0,
    estimatedDays: 3,
  },
  voucher: null,
  isLoading: false,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.bookId === action.payload.bookId)

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.bookId !== action.payload)
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.bookId === action.payload.id)
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity)
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.bookId !== action.payload.id)
        }
      }
    },

    clearCart: (state) => {
      state.items = []
      state.voucher = null
    },

    setShipping: (state, action: PayloadAction<ShippingInfo>) => {
      state.shipping = action.payload
    },

    applyVoucher: (state, action: PayloadAction<Voucher>) => {
      state.voucher = action.payload
    },

    removeVoucher: (state) => {
      state.voucher = null
    },
  },
})

export const {
  setCartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setShipping,
  applyVoucher,
  removeVoucher,
} = cartSlice.actions
