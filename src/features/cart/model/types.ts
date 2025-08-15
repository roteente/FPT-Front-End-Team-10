import { Book } from '@/features/books/model/types'
export interface CartItem {
  id: number
  userId: number   
  bookId: number
  title: string
  price: number
  image: string
  quantity: number
  book?: Book
}
export interface ShippingInfo {
  method: 'standard' | 'express'
  cost: number
  estimatedDays: number
}

export interface Voucher {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrderValue?: number
  maxDiscount?: number
}

export interface CartState {
  items: CartItem[]
  shipping: ShippingInfo
  voucher: Voucher | null
  isLoading: boolean
}
