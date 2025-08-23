import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/app/store';
import { useGetUserOrdersQuery } from '@/features/orders/api/orderApi';
import ProfileLayout from '../components/ProfileLayout';
import { OrderListSkeleton } from '../components/OrderSkeletons';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { ValidationWarning, useOrderValidation } from '@/features/orders/components/ValidationWarning';

const OrdersPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Lấy đơn hàng của user hiện tại
  const { 
    data: userOrders = [], 
    isLoading: isOrdersLoading, 
    error: ordersError 
  } = useGetUserOrdersQuery({});

  // Filter orders based on search and status với null checks
  const filteredOrders = (userOrders || []).filter((order) => {
    // Đảm bảo order có dữ liệu cơ bản
    if (!order || !order.id) return false;
    
    const orderCode = order.orderCode || `TK${order.id}`;
    const matchesSearch = orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (order.products || []).some((p: any) => 
                           p?.name?.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle order click
  const handleOrderClick = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  // Validation function cho order data
  const validateOrderData = (order: any) => {
    if (!order) return { isValid: false, message: 'Không có dữ liệu đơn hàng' };
    
    const requiredFields = ['id', 'total', 'createdAt'];
    const missingFields = requiredFields.filter(field => !order[field]);
    
    if (missingFields.length > 0) {
      return {
        isValid: false,
        message: `Thiếu dữ liệu: ${missingFields.join(', ')}`
      };
    }
    
    return { isValid: true };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-orange-600 bg-orange-50';
      case 'shipping':
        return 'text-blue-600 bg-blue-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatVND = (amount: number | undefined | null) => {
    if (typeof amount !== 'number' || isNaN(amount)) return '0 đ';
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Không xác định';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    } catch {
      return 'Ngày không hợp lệ';
    }
  };

  // Loading state
  if (isOrdersLoading) {
    return (
      <ProfileLayout>
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-6">Danh sách đơn hàng</h2>
          <OrderListSkeleton />
        </div>
      </ProfileLayout>
    );
  }

  // Error state
  if (ordersError) {
    return (
      <ProfileLayout>
        <div className="p-6 text-center">
          <p className="text-red-500">Có lỗi xảy ra khi tải dữ liệu đơn hàng.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Danh sách đơn hàng
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="shipping">Đang giao hàng</option>
              <option value="delivered">Đã giao hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          {/* Orders Grid */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Không tìm thấy đơn hàng nào phù hợp với bộ lọc'
                  : 'Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!'
                }
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOrders.map((order) => {
                const { warnings, hasWarnings } = useOrderValidation(order);
                const validation = validateOrderData(order);
                const orderCode = order.orderCode || `TK${order.id}`;
                const productCount = (order.products || []).length;
                
                return (
                  <div
                    key={order.id}
                    onClick={() => handleOrderClick(order.id)}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 cursor-pointer transition-all duration-200 group"
                  >
                    {/* Validation Warnings */}
                    {hasWarnings && (
                      <div className="mb-3">
                        {warnings.slice(0, 1).map((warning, index) => (
                          <div key={index} className="bg-yellow-50 border border-yellow-200 rounded p-2 text-xs">
                            <div className="flex items-center text-yellow-700">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {warning.message}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        #{orderCode}
                      </h3>
                      <OrderStatusBadge status={order.status || 'pending'} statusText={order.statusText} />
                    </div>

                    {/* Order Info */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
                        </svg>
                        {formatDate(order.createdAt)}
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        {productCount} sản phẩm
                        {productCount === 0 && (
                          <span className="text-yellow-600 ml-1">⚠️</span>
                        )}
                      </div>

                      {order.receiverName && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {order.receiverName}
                        </div>
                      )}
                    </div>

                    {/* Order Total */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Tổng tiền:</span>
                        <span className="text-lg font-bold text-red-600">{formatVND(order.total)}</span>
                      </div>
                    </div>

                    {/* Action Hint */}
                    <div className="mt-3 text-center">
                      <span className="text-sm text-blue-600 group-hover:text-blue-800 transition-colors">
                        Bấm để xem chi tiết →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default OrdersPage;
