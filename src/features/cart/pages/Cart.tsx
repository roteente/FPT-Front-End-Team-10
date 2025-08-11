// src/features/cart/pages/Cart.tsx
import { CartTableContainer } from '../containers/CartTable.container'
import { CartSummaryContainer } from '../containers/CartSummary.container'
import { useCartTotals } from '../hooks/useCartTotals'

export default function Cart() {
  const { isEmpty } = useCartTotals()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng</h1>

      {isEmpty ? (
        <p className="text-gray-600">Giỏ hàng của bạn đang trống</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartTableContainer />
          </div>

          <div>
            <CartSummaryContainer />
          </div>
        </div>
      )}
    </div>
  )
}
