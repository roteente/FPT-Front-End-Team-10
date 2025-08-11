import { useEffect } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { setCartItems } from '../model/cartSlice'
import { useGetCartQuery } from '../api/cartApi'
import { CartTableUI } from '../ui/CartTableUI'
import { useCartActions } from '../hooks/useCartActions'

export function CartTableContainer() {
  const dispatch = useAppDispatch()
  const { data: items = [], isLoading, isError } = useGetCartQuery()
  const { updateQuantity, remove } = useCartActions()

  useEffect(() => {
    if (items.length) {
      dispatch(setCartItems(items))
    }
  }, [items, dispatch])

  if (isLoading) return <p>Đang tải giỏ hàng...</p>
  if (isError) return <p>Không thể tải giỏ hàng.</p>

  return (
    <CartTableUI
      items={items}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={remove}
    />
  )
}
