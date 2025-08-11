import { useMemo } from 'react'
import { useAppSelector } from '@/app/hooks'
import { 
  selectCartSubtotal,
  selectCartItemsCount,
  selectCartTotal,
  selectVoucherDiscount 
} from '../model/selectors'

export function useCartTotals() {
  const subtotal = useAppSelector(selectCartSubtotal)
  const itemsCount = useAppSelector(selectCartItemsCount)
  const total = useAppSelector(selectCartTotal)
  const voucherDiscount = useAppSelector(selectVoucherDiscount)
  const shipping = useAppSelector(state => state.cart.shipping)

  return useMemo(() => ({
    subtotal,
    itemsCount,
    total,
    voucherDiscount,
    shippingCost: shipping.cost,
    isEmpty: itemsCount === 0,
  }), [subtotal, itemsCount, total, voucherDiscount, shipping.cost])
}
