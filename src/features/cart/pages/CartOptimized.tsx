import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { useGetCartQuery } from '../api/cartApi'
import { CartTableContainer } from '../containers/CartTable.container'
import { CartSummaryContainer } from '../containers/CartSummary.container'

export default function CartOptimized() {
  const { user } = useAuthVM()
  const { data: items = [], isLoading } = useGetCartQuery(user?.id, {
    skip: !user?.id,
  })
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-lg p-6">
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
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-8 bg-gray-200 rounded mt-6"></div>
                  </div>
                </div>
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
            <div className="space-y-4">
              <Link 
                to="/" 
                className="inline-flex items-center bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Tiếp tục mua sắm
              </Link>
              <div className="text-sm text-gray-500">
                Hoặc thử <Link to="/cart-demo" className="text-blue-600 hover:underline">trang demo giỏ hàng</Link>
              </div>
            </div>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">GIỎ HÀNG ({items.length} sản phẩm)</h1>
          <Link 
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main cart table - Sử dụng container */}
          <div className="lg:col-span-2">
            <CartTableContainer
              items={items}
              selectedItems={selectedItems}
              onSelectAll={handleSelectAll}
              onSelectItem={handleSelectItem}
            />
          </div>
          
          {/* Sidebar summary - Sử dụng container */}
          <div className="lg:col-span-1">
            <CartSummaryContainer 
              selectedItemsCount={selectedItems.length} 
              selectedItems={selectedItems}
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Link to="/cart-demo" className="hover:text-blue-600">
                Trang demo giỏ hàng
              </Link>
              <span>•</span>
              <span>Hotline: 1800-6963</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800 text-sm">
                Xóa các sản phẩm đã chọn
              </button>
              <button className="text-gray-600 hover:text-gray-800 text-sm">
                Lưu vào mục yêu thích
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
