export interface CartItem {
  id: number
  bookId: number
  title: string
  image: string
  price: number
  quantity: number
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
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
