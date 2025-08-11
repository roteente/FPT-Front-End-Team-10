import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

export const selectCartItems = (state: RootState) => state.cart.items
export const selectShipping = (state: RootState) => state.cart.shipping
export const selectVoucher = (state: RootState) => state.cart.voucher

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
)

export const selectVoucherDiscount = createSelector(
  [selectCartSubtotal, selectVoucher],
  (subtotal, voucher) => {
    if (!voucher) return 0
    
    if (voucher.minOrderValue && subtotal < voucher.minOrderValue) {
      return 0
    }
    
    let discount = 0
    if (voucher.type === 'percentage') {
      discount = subtotal * (voucher.value / 100)
    } else {
      discount = voucher.value
    }
    
    if (voucher.maxDiscount) {
      discount = Math.min(discount, voucher.maxDiscount)
    }
    
    return discount
  }
)

export const selectCartTotal = createSelector(
  [selectCartSubtotal, selectShipping, selectVoucherDiscount],
  (subtotal, shipping, voucherDiscount) => {
    return Math.max(0, subtotal + shipping.cost - voucherDiscount)
  }
)
