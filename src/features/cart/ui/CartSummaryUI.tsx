import { Button } from '@/ui/primitives'
import { formatPrice } from '@/core/utils/format'

interface CartSummaryUIProps {
  subtotal: number
  shippingCost: number
  voucherDiscount: number
  total: number
  onCheckout: () => void
}

export function CartSummaryUI({
  subtotal,
  shippingCost,
  voucherDiscount,
  total,
  onCheckout,
}: CartSummaryUIProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Tạm tính:</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="font-medium">
            {shippingCost > 0 ? formatPrice(shippingCost) : 'Miễn phí'}
          </span>
        </div>
        
        {voucherDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Giảm giá:</span>
            <span className="font-medium">-{formatPrice(voucherDiscount)}</span>
          </div>
        )}
        
        <hr className="my-4" />
        
        <div className="flex justify-between text-lg font-semibold">
          <span>Tổng cộng:</span>
          <span className="text-blue-600">{formatPrice(total)}</span>
        </div>
      </div>
      
      <Button
        variant="primary"
        size="lg"
        className="w-full mt-6"
        onClick={onCheckout}
      >
        Thanh toán
      </Button>
      
      <div className="mt-4 text-center">
        <Button variant="outline" size="sm">
          Tiếp tục mua sắm
        </Button>
      </div>
    </div>
  )
}
