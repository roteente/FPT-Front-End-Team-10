import { useCartTotalsRTK } from '../hooks/useCartTotalsRTK'
import { CartSummaryUI } from '../ui/CartSummaryUI'

interface CartSummaryContainerProps {
  selectedItemsCount: number
  selectedItems?: number[]
}

export function CartSummaryContainer({ selectedItemsCount, selectedItems = [] }: CartSummaryContainerProps) {
  const { subtotal, total, voucherDiscount, shippingCost } = useCartTotalsRTK(selectedItems)

  const handleCheckout = () => {
    // Logic checkout sẽ được implement sau
    console.log('Proceed to checkout with', selectedItemsCount, 'items')
    console.log('Selected items:', selectedItems)
    console.log('Total:', total)
  }

  return (
    <CartSummaryUI
      subtotal={subtotal}
      shippingCost={shippingCost}
      voucherDiscount={voucherDiscount}
      total={total}
      selectedItemsCount={selectedItemsCount}
      onCheckout={handleCheckout}
    />
  )
}
