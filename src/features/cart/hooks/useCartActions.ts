import { useUpdateCartItemMutation, useRemoveCartItemMutation } from '../api/cartApi'

export function useCartActions() {
  const [updateItem] = useUpdateCartItemMutation()
  const [removeItem] = useRemoveCartItemMutation()

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      updateItem({ id, quantity })
    } else {
      removeItem(id)
    }
  }

  const remove = (id: number) => removeItem(id)

  return { updateQuantity, remove }
}
