import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useGetUserOrdersQuery, useGetOrderByIdQuery, useCancelOrderMutation } from '@/features/orders/api/orderApi';
import ProfileLayout from '../components/ProfileLayout';

const OrdersPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  // Lấy đơn hàng của user hiện tại
  const { 
    data: userOrders = [], 
    isLoading: isOrdersLoading, 
    error: ordersError 
  } = useGetUserOrdersQuery({ 
    userId: user?.id || 1 // Truyền userId để lọc đơn hàng
  });
  
  // Fetch selected order details với userId để đảm bảo security
  const { 
    data: selectedOrder, 
    isLoading: isOrderLoading, 
    error: orderError 
  } = useGetOrderByIdQuery({
    orderId: selectedOrderId!,
    userId: user?.id || 1
  }, {
    skip: !selectedOrderId
  });

  // Cancel order mutation
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  // Set initial selected order when data loads
  useEffect(() => {
    if (userOrders.length > 0 && !selectedOrderId) {
      setSelectedOrderId(userOrders[0].id);
    }
  }, [userOrders, selectedOrderId]);

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

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getFullAddress = (order: any) => {
    const parts = [
      order.receiverAddress,
      order.receiverWard,
      order.receiverDistrict,
      order.receiverCity
    ].filter(Boolean);
    return parts.join(', ');
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return;
    
    const reason = prompt('Vui lòng nhập lý do hủy đơn:');
    if (!reason) return;
    
    try {
      await cancelOrder({ 
        orderId, 
        reason, 
        userId: user?.id || 1 
      }).unwrap();
      alert('Đơn hàng đã được hủy thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.');
    }
  };

  // Use selected order from API
  const displayOrder = selectedOrder;

  // Loading state
  if (isOrdersLoading || (isOrderLoading && selectedOrderId)) {
    return (
      <ProfileLayout>
        <div className="p-6 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-full"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    );
  }

  // Error state
  if (ordersError || orderError) {
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Orders Sidebar */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Đơn hàng của tôi</h2>
          <div className="space-y-2">
            {userOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedOrderId === order.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">#{order.orderCode}</div>
                <div className="text-xs text-gray-500">{formatDate(order.createdAt)}</div>
                <div className="text-sm font-medium text-red-600">{formatVND(order.total)}</div>
                <div className={`text-xs px-2 py-1 rounded inline-block mt-1 ${getStatusColor(order.status)}`}>
                  {order.statusText}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {order.products.length} sản phẩm
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-3">
          {!displayOrder ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">Chọn một đơn hàng để xem chi tiết.</p>
            </div>
          ) : (
            <div className="p-6 border rounded-lg">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Chi tiết đơn hàng #{displayOrder?.orderCode || displayOrder?.id} - {displayOrder?.statusText || 'Đang xử lý'}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Ngày đặt hàng: {displayOrder?.createdAt ? formatDate(displayOrder.createdAt) : 'N/A'}
                  </p>
                </div>
              </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Địa chỉ người nhận */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 border-b pb-2">ĐỊA CHỈ NGƯỜI NHẬN</h3>
            <div className="space-y-2 text-sm">
              <div className="font-medium">{displayOrder?.receiverName}</div>
              <div className="text-gray-600">{getFullAddress(displayOrder)}</div>
              <div className="text-gray-600">Điện thoại: {displayOrder?.receiverPhone}</div>
              {displayOrder?.receiverEmail && (
                <div className="text-gray-600">Email: {displayOrder.receiverEmail}</div>
              )}
            </div>
          </div>

          {/* Hình thức giao hàng */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 border-b pb-2">HÌNH THỨC GIAO HÀNG</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  displayOrder?.shipping?.method === 'now' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {displayOrder?.shipping?.method?.toUpperCase() || 'STANDARD'}
                </span>
                <span>{displayOrder?.shipping?.methodName || 'Giao hàng tiêu chuẩn'}</span>
              </div>
              <div className="text-gray-600">
                Dự kiến: {displayOrder?.shipping?.estimatedDate ? 
                  formatDate(displayOrder.shipping.estimatedDate) : 'Đang cập nhật'}
              </div>
              <div className="text-gray-600">
                Được giao bởi {displayOrder?.shipping?.carrier || 'Đối tác vận chuyển'}
              </div>
              {displayOrder?.shipping?.trackingNumber && (
                <div className="text-gray-600">
                  Mã vận đơn: {displayOrder.shipping.trackingNumber}
                </div>
              )}
              <div className="text-gray-600">
                {displayOrder?.shipping?.discount > 0 ? 'Miễn phí vận chuyển' : 
                  `Phí vận chuyển: ${formatVND(displayOrder?.shipping?.cost || 0)}`}
              </div>
            </div>
          </div>

          {/* Hình thức thanh toán */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 border-b pb-2">HÌNH THỨC THANH TOÁN</h3>
            <div className="space-y-2 text-sm">
              <div className="text-gray-600">{displayOrder?.payment?.methodName}</div>
              <div className={`inline-block px-2 py-1 rounded text-xs ${
                displayOrder?.payment?.status === 'paid' ? 'bg-green-100 text-green-800' :
                displayOrder?.payment?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {displayOrder?.payment?.status === 'paid' ? 'Đã thanh toán' :
                 displayOrder?.payment?.status === 'pending' ? 'Chờ thanh toán' : 'Chưa thanh toán'}
              </div>
              {displayOrder?.payment?.transactionId && (
                <div className="text-gray-600">
                  Mã giao dịch: {displayOrder.payment.transactionId}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="mt-8">
          <div className="bg-gray-50 px-4 py-3 grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 border-b">
            <div className="col-span-5">Sản phẩm</div>
            <div className="col-span-2 text-center">Giá</div>
            <div className="col-span-2 text-center">Số lượng</div>
            <div className="col-span-2 text-center">Giảm giá</div>
            <div className="col-span-1 text-right">Tạm tính</div>
          </div>

          {displayOrder?.products?.map((item: any) => (
            <div key={item.id} className="px-4 py-4 grid grid-cols-12 gap-4 items-center border-b">
              <div className="col-span-5 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-book.jpg';
                  }}
                />
                <div>
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">Cung cấp bởi {item.supplier || 'Tiki Trading'}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      🛡️ 30 NGÀY ĐỔI TRẢ
                    </span>
                  </div>
                  {item.sku && (
                    <div className="text-sm text-gray-500 mt-1">
                      Sku: {item.sku}
                    </div>
                  )}
                  <button className="text-blue-600 text-sm mt-1 hover:underline">
                    Chat với nhà bán
                  </button>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <div>{formatVND(item.price)}</div>
                {item.originalPrice && item.originalPrice > item.price && (
                  <div className="text-xs text-gray-400 line-through">
                    {formatVND(item.originalPrice)}
                  </div>
                )}
              </div>
              <div className="col-span-2 text-center">
                {item.quantity}
              </div>
              <div className="col-span-2 text-center">
                {item.discount ? formatVND(item.discount * item.quantity) : '0 đ'}
              </div>
              <div className="col-span-1 text-right font-medium">
                {formatVND(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-6 flex justify-end">
          <div className="w-80 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{formatVND(displayOrder?.subTotal || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>{formatVND(displayOrder?.shippingCost || 0)}</span>
            </div>
            {displayOrder?.shippingDiscount > 0 && (
              <div className="flex justify-between">
                <span>Giảm giá vận chuyển</span>
                <span className="text-green-600">-{formatVND(displayOrder.shippingDiscount)}</span>
              </div>
            )}
            {displayOrder?.totalDiscount > 0 && (
              <div className="flex justify-between">
                <span>Giảm giá sản phẩm</span>
                <span className="text-green-600">-{formatVND(displayOrder.totalDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Tổng cộng</span>
              <span className="text-red-600">{formatVND(displayOrder?.total || 0)}</span>
            </div>
            <div className="flex gap-2 mt-4">
              {['pending', 'confirmed'].includes(displayOrder?.status) && (
                <button 
                  onClick={() => handleCancelOrder(displayOrder.id)}
                  disabled={isCancelling}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {isCancelling ? 'Đang hủy...' : 'Hủy đơn hàng'}
                </button>
              )}
              {displayOrder?.status === 'shipping' && (
                <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-blue-600 transition-colors">
                  Theo dõi đơn hàng
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between items-center pt-4 border-t">
          <button className="text-blue-600 hover:underline">
            &lt;&lt; Quay lại đơn hàng của tôi
          </button>
          <button className="bg-yellow-400 text-black px-6 py-2 rounded font-medium hover:bg-yellow-500 transition-colors">
            Theo dõi đơn hàng
          </button>
        </div>
            </div>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default OrdersPage;
