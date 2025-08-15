import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ImageWithFallback } from '@/ui/primitives'
import { CartItem } from '@/features/cart/model/types'

interface OrderSuccessState {
  orderId: string
  total: number
  items: CartItem[]
}

export default function OrderSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as OrderSuccessState | undefined
  
  // Redirect if no order information
  useEffect(() => {
    if (!state?.orderId) {
      navigate('/')
    }
  }, [state, navigate])
  
  if (!state?.orderId) {
    return null
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-4 flex items-center">
          <Link to="/" className="flex-shrink-0">
            <img src="/Checkout/tiki-logo.png" alt="Tiki" className="h-8" />
          </Link>
          <h1 className="text-xl font-medium text-blue-600 ml-4 pl-4 border-l border-gray-300">
            Đặt hàng thành công
          </h1>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Success message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Đặt hàng thành công!
            </h2>
            <p className="text-gray-600 text-lg">
              Cảm ơn bạn đã mua sắm tại Tiki. Đơn hàng của bạn sẽ được xử lý và giao đến bạn trong thời gian sớm nhất.
            </p>
          </div>
          
          {/* Order information */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Mã đơn hàng</p>
                <p className="font-medium text-blue-600">{state.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng giá trị</p>
                <p className="font-medium">{state.total.toLocaleString('vi-VN')}₫</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Thời gian đặt</p>
                <p className="font-medium">{new Date().toLocaleDateString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trạng thái</p>
                <p className="font-medium text-green-600">Chờ xác nhận</p>
              </div>
            </div>
          </div>
          
          {/* Order items */}
          <div className="border border-gray-200 rounded-lg mb-8">
            <h3 className="font-medium px-4 py-3 bg-gray-50 border-b border-gray-200">
              Danh sách sản phẩm đã đặt
            </h3>
            
            <div className="divide-y divide-gray-200">
              {state.items.map((item) => (
                <div key={item.id} className="p-4 flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col md:flex-row md:justify-center space-y-3 md:space-y-0 md:space-x-4">
            <Link 
              to="/"
              className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Tiếp tục mua sắm
            </Link>
            <Link 
              to="/profile/orders" // You'll need to create this page later
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Xem đơn hàng của tôi
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
