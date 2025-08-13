import { CartTableUI } from '../ui/CartTableUI'
import { CartSummaryUI } from '../ui/CartSummaryUI'
import { useGetCartQuery } from '../api/cartApi'
import { useCartActions } from '../hooks/useCartActions'

export default function Cart() {
  const { data: items = [], isLoading } = useGetCartQuery()
  const { updateQuantity, remove } = useCartActions()

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  if (isLoading) return <p>Đang tải...</p>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CartTableUI
          items={items}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={remove}
        />
      </div>
      <CartSummaryUI
        subtotal={subtotal}
        shippingCost={0}
        voucherDiscount={0}
        total={subtotal}
        onCheckout={() => console.log('checkout')}
      />
    </div>
  )
}
