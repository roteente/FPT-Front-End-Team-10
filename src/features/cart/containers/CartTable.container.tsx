import { useAppSelector } from '@/app/hooks'
import { useCartActions } from '../hooks/useCartActions'
import { CartTableUI } from '../ui/CartTableUI'

export function CartTableContainer() {
  const items = useAppSelector(state => state.cart.items)
  const { updateQuantity, remove } = useCartActions()

  return (
    <CartTableUI
      items={items}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={remove}
    />
  )
}
