import { useCartTotals } from '../hooks/useCartTotals'
import { CartSummaryUI } from '../ui/CartSummaryUI'

export function CartSummaryContainer() {
  const { subtotal, total, voucherDiscount, shippingCost } = useCartTotals()

  const handleCheckout = () => {
    // Logic checkout sẽ được implement sau
    console.log('Proceed to checkout')
  }

  return (
    <CartSummaryUI
      subtotal={subtotal}
      shippingCost={shippingCost}
      voucherDiscount={voucherDiscount}
      total={total}
      onCheckout={handleCheckout}
    />
  )
}
