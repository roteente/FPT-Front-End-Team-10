import { storage } from '@/core/utils/storage'
import { CartItem } from './types'

const CART_STORAGE_KEY = 'bookstore_cart'

export const cartPersist = {
  loadCart: (): CartItem[] => {
    return storage.get<CartItem[]>(CART_STORAGE_KEY) || []
  },

  saveCart: (items: CartItem[]): void => {
    storage.set(CART_STORAGE_KEY, items)
  },

  clearCart: (): void => {
    storage.remove(CART_STORAGE_KEY)
  },
}
