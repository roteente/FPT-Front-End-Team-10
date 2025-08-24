import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../api/orderApi';
import { StatusBadge } from '../components/StatusBadge';
import { ValidationWarning, useOrderValidation } from '../components/ValidationWarning';
import { formatPrice, formatDate } from '../../../core/utils/format';
import type { Order } from '../types';

export const OrdersListPage: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: orders = [], isLoading, error } = useGetUserOrdersQuery({
    status: statusFilter === 'all' ? undefined : statusFilter,
    search: searchQuery || undefined,
  });

  const handleOrderClick = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  const statusOptions = [
    { value: 'all', label: 'Tất cả đơn hàng' },
    { value: 'pending', label: 'Đang xử lý' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'shipping', label: 'Đang giao' },
    { value: 'delivered', label: 'Đã giao' },
    { value: 'cancelled', label: 'Đã hủy' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Có lỗi xảy ra</h2>
          <p className="text-gray-600 mb-4">Không thể tải danh sách đơn hàng</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lý đơn hàng</h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="sm:w-64">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? 'Không tìm thấy đơn hàng nào phù hợp với bộ lọc'
                : 'Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!'
              }
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: Order) => {
              const { warnings, hasWarnings } = useOrderValidation(order);
              
              return (
                <div key={order.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {/* Validation Warnings */}
                  {hasWarnings && (
                    <div className="p-4 border-b border-gray-100">
                      {warnings.map((warning, index) => (
                        <ValidationWarning
                          key={index}
                          type={warning.type}
                          message={warning.message}
                          warnings={warning.warnings}
                          onAction={() => handleOrderClick(order.id)}
                          actionText="Xem chi tiết"
                        />
                      ))}
                    </div>
                  )}

                  {/* Order Card */}
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleOrderClick(order.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Đơn hàng #{order.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Ngày đặt: {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Người nhận</p>
                        <p className="font-medium text-gray-900">
                          {order.receiverName || 'Chưa cập nhật'}
                        </p>
                        {order.receiverPhone && (
                          <p className="text-sm text-gray-600">{order.receiverPhone}</p>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Địa chỉ giao hàng</p>
                        <p className="text-gray-900 line-clamp-2">
                          {order.receiverAddress || 'Chưa cập nhật'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                        <p className="text-xl font-bold text-red-600">
                          {formatPrice(order.total)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.products?.length || 0} sản phẩm
                        </p>
                      </div>
                    </div>

                    {/* Products Preview */}
                    {order.products && order.products.length > 0 && (
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-3">
                          {order.products.slice(0, 3).map((product: any, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              {product.image && (
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="w-10 h-10 object-cover rounded"
                                />
                              )}
                              <span className="text-sm text-gray-700 line-clamp-1">
                                {product.title}
                              </span>
                            </div>
                          ))}
                          {order.products.length > 3 && (
                            <span className="text-sm text-gray-500">
                              +{order.products.length - 3} sản phẩm khác
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Hint */}
                    <div className="flex justify-end mt-4">
                      <span className="text-sm text-blue-600 hover:text-blue-800">
                        Xem chi tiết →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersListPage;
