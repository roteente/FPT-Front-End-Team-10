import { useAppDispatch } from '@/app/hooks'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../model/cartSlice'
import { CartItem } from '../model/types'

export function useCartActions() {
  const dispatch = useAppDispatch()

  const add = (item: CartItem) => {
    dispatch(addToCart(item))
  }

  const remove = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const updateQty = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const clear = () => {
    dispatch(clearCart())
  }

  return {
    add,
    remove,
    updateQuantity: updateQty,
    clear,
  }
}
