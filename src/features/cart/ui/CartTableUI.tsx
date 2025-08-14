import { Button, ImageWithFallback } from '@/ui/primitives'
import { formatPrice } from '@/core/utils/format'
import { CartItem } from '../model/types'

interface CartTableUIProps {
  items: CartItem[]
  selectedItems: number[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onSelectItem: (itemId: number, checked: boolean) => void
}

export function CartTableUI({ 
  items, 
  selectedItems,
  onUpdateQuantity, 
  onRemoveItem,
  onSelectAll,
  onSelectItem
}: CartTableUIProps) {
  const allSelected = items.length > 0 && selectedItems.length === items.length

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Giỏ hàng của bạn đang trống</p>
        <Button variant="primary">Tiếp tục mua sắm</Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header với checkbox "Tất cả" */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              Tất cả ({items.length} sản phẩm)
            </span>
          </label>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Đơn giá</span>
            <span className="w-20 text-center">Số lượng</span>
            <span className="w-24 text-right">Thành tiền</span>
            <span className="w-16"></span>
          </div>
        </div>
      </div>

      {/* Khuyến mãi TIN HỌC THÀNH NHÂN */}
      <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 4a1 1 0 11-2 0 1 1 0 012 0zM8 8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-gray-700">TIN HỌC THÀNH NHÂN</span>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="px-6 py-4">
            <div className="flex items-center space-x-4">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => onSelectItem(item.id, e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />

              {/* Hình ảnh và thông tin sản phẩm */}
              <div className="flex-1 flex items-center space-x-4">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-16 rounded object-cover border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">
                    {item.title}
                  </p>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-green-600">Giao thứ 2, 18/08</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Tạm ngưng bán</p>
                </div>
              </div>

              {/* Đơn giá */}
              <div className="w-24 text-right">
                <p className="text-sm font-medium text-gray-900">
                  {formatPrice(item.price)}₫
                </p>
                <p className="text-xs text-gray-500 line-through">
                  Giá chưa áp dụng khuyến mãi
                </p>
              </div>

              {/* Số lượng */}
              <div className="w-20 flex items-center justify-center">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm border-x border-gray-300 min-w-[40px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Thành tiền */}
              <div className="w-24 text-right">
                <p className="text-sm font-medium text-[#ff424e]">
                  {formatPrice(item.price * item.quantity)}₫
                </p>
              </div>

              {/* Nút xóa */}
              <div className="w-16 text-right">
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  title="Xóa sản phẩm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Thêm mã khuyến mãi */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
            Thêm mã khuyến mãi của Shop
          </span>
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}
