import { Button } from '@/ui/primitives'
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
    <div className="space-y-6">
      {/* Thông tin giao hàng */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-start space-x-3 mb-4">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 mb-1">Giao tới</h3>
            <p className="text-sm font-semibold text-gray-900">Nguyễn Văn Quân | 0817246180</p>
            <p className="text-sm text-gray-600">
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium mr-2">
                Nhà
              </span>
              5/297 Vũ Hữu, Phương Thanh Xuân Bắc, Quận Thanh Xuân, Hà Nội
            </p>
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
              <p className="text-yellow-800 font-medium">Lưu ý: Sử dụng địa chỉ nhận hàng trước khi nhập</p>
            </div>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Thay đổi
          </button>
        </div>
      </div>

      {/* Tiki Khuyến Mãi */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900">Tiki Khuyến Mãi</h3>
          <span className="text-xs text-gray-500">Có thể chọn 2</span>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded cursor-pointer">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-blue-600">Giảm 50% cho đơn từ 0đ</span>
          <svg className="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Tóm tắt thanh toán */}
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
            <span className="font-medium text-gray-900">Tổng tiền thanh toán</span>
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
            console.log("CartSummaryUI - Checkout button clicked");
            if (selectedItemsCount > 0) {
              onCheckout();
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
