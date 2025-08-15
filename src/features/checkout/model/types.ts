import { CartItem } from '@/features/cart/model/types'
import { Address } from '@/features/auth/model/types'

export interface PaymentMethod {
  id: string
  name: string
  type: 'cash' | 'credit_card' | 'e-wallet' | 'bank_transfer'
  logo: string
  isDefault?: boolean
}

export interface DeliveryMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDeliveryTime: string
  logo?: string
  isDefault?: boolean
}

export interface OrderSummary {
  subtotal: number
  shipping: number
  discount: number
  total: number
}

export interface Order {
  id: string
  userId: number
  items: CartItem[]
  shippingAddress: Address
  deliveryMethod: DeliveryMethod
  paymentMethod: PaymentMethod
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  summary: OrderSummary
  createdAt: string
  updatedAt: string
}

export interface CheckoutState {
  selectedAddress: Address | null
  selectedDeliveryMethod: DeliveryMethod | null
  selectedPaymentMethod: PaymentMethod | null
  note: string
  appliedPromoCode: string | null
  isProcessing: boolean
}
