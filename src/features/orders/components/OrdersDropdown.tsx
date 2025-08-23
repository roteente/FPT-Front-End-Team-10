import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useGetUserOrdersQuery } from '@/features/orders/api/orderApi';
import { OrderStatusBadge } from '@/features/profile/components/OrderStatusBadge';

export const OrdersDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const { 
    data: userOrders = [], 
    isLoading,
    error 
  } = useGetUserOrdersQuery({}, {
    skip: !user
  });

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors relative"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span className="text-sm">Đơn hàng</span>
        {userOrders.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {userOrders.length > 9 ? '9+' : userOrders.length}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={closeDropdown}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Đơn hàng của tôi</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Đang tải đơn hàng...</p>
                </div>
              ) : error ? (
                <div className="p-4 text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-500">Không thể tải đơn hàng</p>
                </div>
              ) : userOrders.length === 0 ? (
                <div className="p-6 text-center">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-sm text-gray-500 mb-3">Bạn chưa có đơn hàng nào</p>
                  <Link 
                    to="/" 
                    onClick={closeDropdown}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Mua sắm ngay
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {userOrders.slice(0, 5).map((order) => (
                    <Link
                      key={order.id}
                      to={`/orders/${order.id}`}
                      onClick={closeDropdown}
                      className="block p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              #{order.orderCode}
                            </p>
                            <OrderStatusBadge 
                              status={order.status} 
                              statusText={order.statusText}
                              className="text-xs"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mb-2">
                            {formatDate(order.createdAt)}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-red-600">
                              {formatVND(order.total)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {order.products.length} sản phẩm
                            </span>
                          </div>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {userOrders.length > 5 && (
              <div className="p-3 border-t border-gray-200">
                <Link
                  to="/profile/orders"
                  onClick={closeDropdown}
                  className="block w-full text-center py-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  Xem tất cả đơn hàng ({userOrders.length})
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
