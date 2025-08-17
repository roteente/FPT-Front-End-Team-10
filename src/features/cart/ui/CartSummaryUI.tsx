import { formatPrice } from '@/core/utils/format'

interface CartSummaryUIProps {
  subtotal: number
  shippingCost: number
  voucherDiscount: number
  total: number
  selectedItemsCount: number
  onCheckout: () => void
}

export function CartSummaryUI({
  subtotal,
  shippingCost,
  voucherDiscount,
  total,
  selectedItemsCount,
  onCheckout,
}: CartSummaryUIProps) {
  return (
    <div className="space-y-6 w-full max-w-full md:max-w-sm mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tạm tính</span>
            <span className="font-medium">{formatPrice(subtotal)}₫</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Giảm giá</span>
            <span className="font-medium">{formatPrice(voucherDiscount)}₫</span>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between">
            <span className="font-medium text-gray-900">Tổng tiền</span>
            <div className="text-right">
              <div className="text-lg font-bold text-[#ff424e]">
                {formatPrice(total)}₫
              </div>
              <div className="text-xs text-red-600">
                (Đã bao gồm VAT nếu có)
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (selectedItemsCount > 0) {
              onCheckout()
            }
          }}
          disabled={selectedItemsCount === 0}
          className={`w-full mt-4 py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            selectedItemsCount > 0
              ? 'bg-[#ff424e] hover:bg-[#e53935]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Mua Hàng ({selectedItemsCount})
        </button>

        {selectedItemsCount === 0 && (
          <p className="text-center text-sm text-red-600 mt-2">
            Vui lòng chọn sản phẩm
          </p>
        )}
      </div>
    </div>
  )
}
