import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { useGetCartQuery } from '../api/cartApi'
import { useCartActions } from '../hooks/useCartActions'
import { CartTableContainer } from '../containers/CartTable.container'
import { CartSummaryContainer } from '../containers/CartSummary.container'
import { ImageWithFallback } from '@/ui/primitives'

export default function CartImproved() {
  const { user } = useAuthVM()
  const { data: items = [], isLoading } = useGetCartQuery(user?.id, {
    skip: !user?.id,
  })
  const { updateQuantity, remove } = useCartActions()
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(items.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (itemId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId])
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId))
    }
  }

  const selectedItemsData = items.filter(item => selectedItems.includes(item.id))
  const subtotal = selectedItemsData.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingFee = subtotal > 45000 ? 0 : 15000 // Freeship từ 45k
  const total = subtotal + shippingFee

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-20 h-24 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Cần đăng nhập</h2>
          <p className="text-gray-500 mb-6">Vui lòng đăng nhập để xem giỏ hàng của bạn</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header với thông tin freeship */}
        <div className="bg-green-50 border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 py-3 text-center">
            <p className="text-green-700 text-sm">
              🚚 <span className="font-semibold">Freeship đơn từ 45k</span>, giảm nhiều hơn cùng <span className="font-semibold">FREESHIP XTRA</span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h3>
            <p className="text-gray-500 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Link 
              to="/" 
              className="inline-flex items-center bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header freeship banner */}
      <div className="bg-green-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <p className="text-green-700 text-sm">
            🚚 <span className="font-semibold">Freeship đơn từ 45k</span>, giảm nhiều hơn cùng <span className="font-semibold">FREESHIP XTRA</span>
          </p>
        </div>
      </div>

      {/* Service badges */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>100% hàng thật</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1.05l.5 2H3a1 1 0 000 2h2.05l.5 2H5a1 1 0 000 2h1.05l.5 2H3a1 1 0 00-1 1v1a1 1 0 001 1h14a1 1 0 001-1v-1a1 1 0 00-1-1h-3.05l-.5-2H15a1 1 0 000-2h-2.05l-.5-2H15a1 1 0 000-2h-2.05l-.5-2H15a1 1 0 001-1V5a1 1 0 00-1-1H3z"/>
              </svg>
              <span>Freeship toàn quốc</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>Hoàn tiền 200%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">GIỎ HÀNG ({items.length} sản phẩm)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main cart content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header với checkbox tất cả */}
              <div className="p-6 border-b border-gray-200">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === items.length && items.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="font-medium text-gray-900">
                    Chọn tất cả ({items.length} sản phẩm)
                  </span>
                </label>
              </div>

              {/* Danh sách sản phẩm */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-2"
                      />

                      {/* Hình ảnh sản phẩm */}
                      <div className="flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-24 object-cover rounded-lg border border-gray-200"
                        />
                      </div>

                      {/* Thông tin sản phẩm */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Giao thứ 2, 18/08
                          </span>
                          <span>•</span>
                          <span>Freeship</span>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Giá */}
                          <div className="flex items-center space-x-3">
                            <span className="text-xl font-bold text-red-500">
                              {item.price.toLocaleString('vi-VN')}₫
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {(item.price * 1.2).toLocaleString('vi-VN')}₫
                            </span>
                          </div>

                          {/* Số lượng và xóa */}
                          <div className="flex items-center space-x-4">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="px-4 py-2 text-sm font-medium min-w-[50px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-50"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            </div>

                            {/* Delete button */}
                            <button
                              onClick={() => remove(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Xóa sản phẩm"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar thanh toán */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Thông tin giao hàng */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">Giao tới</h3>
                    <p className="text-sm font-medium text-gray-900">Nguyễn Văn Quân | 0817246180</p>
                    <p className="text-sm text-gray-600">
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium mr-2">
                        Nhà
                      </span>
                      5/297 Vũ Hữu, Thanh Xuân, Hà Nội
                    </p>
                  </div>
                  <button className="text-blue-600 text-sm font-medium hover:underline">
                    Thay đổi
                  </button>
                </div>
              </div>

              {/* Khuyến mãi */}
              {subtotal > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Khuyến mãi</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-blue-700">
                          Freeship đơn từ 45k
                        </span>
                      </div>
                      {subtotal >= 45000 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Đã áp dụng
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tổng tiền */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính ({selectedItems.length} sản phẩm)</span>
                    <span className="font-medium">{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-medium">
                      {shippingFee === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        `${shippingFee.toLocaleString('vi-VN')}₫`
                      )}
                    </span>
                  </div>
                  
                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Tổng tiền</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-red-500">
                        {total.toLocaleString('vi-VN')}₫
                      </div>
                      <div className="text-xs text-gray-500">
                        (Đã bao gồm VAT nếu có)
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  disabled={selectedItems.length === 0}
                  className={`w-full mt-6 py-4 px-6 rounded-lg font-medium text-white transition-colors ${
                    selectedItems.length > 0
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {selectedItems.length > 0 
                    ? `Mua hàng (${selectedItems.length})`
                    : 'Vui lòng chọn sản phẩm'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
