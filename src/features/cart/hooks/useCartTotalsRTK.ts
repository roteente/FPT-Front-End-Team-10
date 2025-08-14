import { useMemo } from 'react'
import { useGetCartQuery } from '../api/cartApi'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'

export function useCartTotalsRTK(selectedItems: number[] = []) {
  const { user } = useAuthVM()
  const { data: items = [] } = useGetCartQuery(user?.id, {
    skip: !user?.id,
  })

  return useMemo(() => {
    const selectedItemsData = selectedItems.length > 0 
      ? items.filter(item => selectedItems.includes(item.id))
      : items

    const subtotal = selectedItemsData.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shippingCost = subtotal > 45000 ? 0 : 15000 // Freeship từ 45k
    const voucherDiscount = 0 // Chưa implement voucher
    const total = subtotal + shippingCost - voucherDiscount
    const itemsCount = selectedItemsData.reduce((count, item) => count + item.quantity, 0)

    return {
      subtotal,
      itemsCount,
      total,
      voucherDiscount,
      shippingCost,
      isEmpty: items.length === 0,
    }
  }, [items, selectedItems])
}
