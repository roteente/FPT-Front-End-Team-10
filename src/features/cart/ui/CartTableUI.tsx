import { CartItem } from '../model/types'
import { ImageWithFallback } from '@/ui/primitives'

interface CartTableUIProps {
  items: CartItem[]
  selectedItems: number[]
  onSelectItem: (id: number, checked: boolean) => void
  onSelectAll: (checked: boolean) => void
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}

export function CartTableUI({
  items,
  selectedItems,
  onSelectItem,
  onSelectAll,
  onUpdateQuantity,
  onRemoveItem,
}: CartTableUIProps) {
  return (
    <div className="bg-white rounded-lg border">
      {/* Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-gray-600">
        <div className="col-span-5 flex items-center">
          <input
            type="checkbox"
            checked={selectedItems.length === items.length}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="mr-2"
          />
          Sản phẩm
        </div>
        <div className="col-span-2 text-center">Đơn giá</div>
        <div className="col-span-2 text-center">Số lượng</div>
        <div className="col-span-2 text-center">Thành tiền</div>
        <div className="col-span-1 text-center">Xoá</div>
      </div>

      {/* Body */}
      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 p-4 items-center"
          >
            {/* Checkbox + Image + Title */}
            <div className="col-span-12 md:col-span-5 flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => onSelectItem(item.id, e.target.checked)}
                className="mt-2"
              />
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-20 h-24 object-cover rounded border"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                <p className="text-xs text-gray-500">Giao hàng nhanh Bookcare</p>
                {/* Giá gốc + giảm giá */}
                {item.book?.original_price && (
                  <p className="text-xs text-gray-400 line-through">
                    {item.book.original_price.toLocaleString('vi-VN')}₫
                  </p>
                )}
                
              </div>
            </div>

            {/* Đơn giá */}
            <div className="col-span-6 md:col-span-2 text-red-500 font-semibold text-sm text-center mt-2 md:mt-0">
              {item.price.toLocaleString('vi-VN')}₫
            </div>

            {/* Số lượng */}
            <div className="col-span-6 md:col-span-2 flex justify-center mt-2 md:mt-0">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-2 py-1 disabled:opacity-50"
                >
                  −
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="w-12 text-center border-x text-sm"
                />
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1"
                >
                  +
                </button>
              </div>
            </div>

            {/* Thành tiền */}
            <div className="col-span-6 md:col-span-2 text-red-600 font-bold text-center mt-2 md:mt-0">
              {(item.price * item.quantity).toLocaleString('vi-VN')}₫
            </div>

            {/* Xoá */}
            <div className="col-span-6 md:col-span-1 flex justify-center mt-2 md:mt-0">
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-gray-400 hover:text-red-500"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
