import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useGetOrderByIdQuery, useCancelOrderMutation } from '@/features/orders/api/orderApi';
import { StatusBadge } from '../components/StatusBadge';
import { LoadingSpinner } from '@/ui/primitives/LoadingSpinner';
import { ValidationWarning, useOrderValidation } from '../components/ValidationWarning';

// Type định nghĩa cho order data
interface OrderData {
  id: string | number;
  total: number;
  subtotal?: number;
  shippingFee?: number;
  shippingDiscount?: number;
  createdAt: string;
  status?: string;
  receiverName?: string;
  receiverAddress?: string;
  receiverPhone?: string;
  paymentMethod?: string;
  note?: string;
  products?: Array<{
    id: string | number;
    name?: string;
    title?: string;
    price: number;
    quantity: number;
    image?: string;
    supplier?: string;
    sku?: string;
    discount?: number;
  }>;
}

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const { 
    data: order, 
    isLoading, 
    error 
  } = useGetOrderByIdQuery({
    orderId: id!
  }, {
    skip: !id || !user
  });

  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  // Use validation hook for order data - only when order exists
  const { warnings, hasWarnings, hasCriticalErrors } = useOrderValidation(order || null);

  const formatVND = (amount: number | undefined) => {
    if (typeof amount !== 'number') return '0 đ';
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Không xác định';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Ngày không hợp lệ';
    }
  };

  const handleCancelOrder = async () => {
    if (!order?.id) {
      alert('Không thể hủy đơn hàng: Thiếu thông tin đơn hàng');
      return;
    }

    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return;
    
    const reason = prompt('Vui lòng nhập lý do hủy đơn:');
    if (!reason) return;
    
    try {
      await cancelOrder({ 
        orderId: orderId!, 
        reason, 
        userId: user?.id || 1 
      }).unwrap();
      alert('Đơn hàng đã được hủy thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.');
    }
  };

  // Validation function cho dữ liệu bắt buộc
  const validateRequiredData = (orderData: any) => {
    const requiredFields = [
      { field: 'id', message: 'Mã đơn hàng' },
      { field: 'total', message: 'Tổng tiền đơn hàng' },
      { field: 'createdAt', message: 'Ngày tạo đơn hàng' }
    ];

    const missingFields = requiredFields.filter(({ field }) => !orderData?.[field]);
    
    if (missingFields.length > 0) {
      return {
        isValid: false,
        message: `Thiếu dữ liệu bắt buộc: ${missingFields.map(f => f.message).join(', ')}`
      };
    }

    return { isValid: true };
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-700 mb-2">Lỗi tải đơn hàng</h2>
          <p className="text-gray-500 mb-6">
            {error ? 'Có lỗi xảy ra khi tải thông tin đơn hàng' : 'Đơn hàng không tồn tại hoặc bạn không có quyền truy cập'}
          </p>
          <Link 
            to="/profile/orders"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại danh sách đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  // Validate required data
  const validation = validateRequiredData(order);
  if (!validation.isValid) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">Dữ liệu đơn hàng không đầy đủ</h2>
          <p className="text-gray-600 mb-2">{validation.message}</p>
          <p className="text-sm text-gray-500 mb-6">
            Vui lòng liên hệ quản trị viên để cập nhật đầy đủ thông tin đơn hàng.
          </p>
          <div className="flex gap-3 justify-center">
            <Link 
              to="/profile/orders"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Quay lại danh sách
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-700">Trang chủ</Link>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <Link to="/orders" className="hover:text-gray-700">Đơn hàng của tôi</Link>
        </nav>

        {/* Main Layout with Sidebar */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user?.name || 'User'} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <svg 
                    className={`w-6 h-6 text-gray-500 ${user?.avatar ? 'hidden' : 'block'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    style={{ display: user?.avatar ? 'none' : 'block' }}
                  >
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Tài khoản của</div>
                  <div className="font-medium text-gray-900">
                    {user?.name || user?.fullName || user?.firstName || 'Người dùng'}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Thông tin tài khoản</span>
                </Link>
                
                <Link 
                  to="/notifications" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="text-sm">Thông báo của tôi</span>
                </Link>
                
                <Link 
                  to="/orders" 
                  className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2v1a2 2 0 00-2 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Quản lý đơn hàng</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900 mb-2">
                      Chi tiết đơn hàng #{order.id}
                    </h1>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={order.status || 'pending'} />
                      <span className="text-sm text-gray-500">
                        Ngày đặt hàng: {formatDate(order.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation Warnings */}
              {hasWarnings && (
                <div className="px-6 py-4 border-b border-gray-200 space-y-3">
                  {warnings.map((warning, index) => (
                    <ValidationWarning
                      key={index}
                      type={warning.type}
                      message={warning.message}
                      warnings={warning.warnings}
                      onAction={() => {
                        if (warning.type === 'incomplete-shipping') {
                          navigate(`/orders/${orderId}/edit-shipping`);
                        } else if (warning.type === 'missing-data') {
                          navigate(`/orders/${orderId}/edit`);
                        }
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Three Columns: Address, Shipping, Payment */}
              <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-gray-200">
                {/* ĐỊA CHỈ NGƯỜI NHẬN */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4 text-sm tracking-wide">ĐỊA CHỈ NGƯỜI NHẬN</h3>
                  <div className="space-y-2">
                    <div className="font-medium text-gray-900">
                      {order.receiverName || 'Chưa cập nhật tên người nhận'}
                    </div>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {order.receiverAddress || 'Chưa cập nhật địa chỉ giao hàng'}
                    </div>
                    <div className="text-gray-600 text-sm">
                      Điện thoại: {order.receiverPhone || 'Chưa cập nhật số điện thoại'}
                    </div>
                  </div>
                </div>

                {/* HÌNH THỨC GIAO HÀNG */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4 text-sm tracking-wide">HÌNH THỨC GIAO HÀNG</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        NOW
                      </span>
                      <span className="text-sm text-gray-900">Giao Siêu Tốc</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Giao thứ 6, trước 13h, 28/03
                    </div>
                    <div className="text-sm text-gray-600">
                      Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)
                    </div>
                    <div className="text-sm text-gray-600">
                      Miễn phí vận chuyển
                    </div>
                  </div>
                </div>

                {/* HÌNH THỨC THANH TOÁN */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4 text-sm tracking-wide">HÌNH THỨC THANH TOÁN</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-900">
                      {order.paymentMethod === 'cod' ? 'Thanh toán tiền mặt khi nhận hàng' : 
                       order.paymentMethod === 'online' ? 'Thanh toán online' :
                       'Thanh toán tiền mặt khi nhận hàng'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="px-6 py-6">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-700">
                  <div className="col-span-5">Sản phẩm</div>
                  <div className="col-span-2 text-center">Giá</div>
                  <div className="col-span-2 text-center">Số lượng</div>
                  <div className="col-span-2 text-center">Giảm giá</div>
                  <div className="col-span-1 text-right">Tạm tính</div>
                </div>

                {/* Products */}
                {!order.products || order.products.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-4xl mb-2">📦</div>
                    <p className="text-gray-500">Chưa có sản phẩm nào trong đơn hàng</p>
                  </div>
                ) : (
                  order.products.map((product: any, index: number) => (
                    <div key={index} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center">
                      {/* Product Info */}
                      <div className="col-span-5 flex items-start gap-3">
                        {/* Product Image */}
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title || product.name || 'Sản phẩm'}
                            className="w-16 h-20 object-cover rounded border flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = '/api/placeholder/64/80';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-20 bg-gray-200 rounded border flex items-center justify-center text-gray-500 text-xs flex-shrink-0">
                            Không có ảnh
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">
                            {product.title || product.name || 'Tên sản phẩm chưa cập nhật'}
                          </h4>
                          <p className="text-sm text-gray-500 mb-2">
                            Cung cấp bởi {product.supplier || 'Tiki Trading'}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded inline-flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              30 NGÀY ĐỔI TRẢ
                            </span>
                          </div>
                          {product.sku && (
                            <div className="text-sm text-gray-500 mb-2">
                              Sku: <span className="font-mono">{product.sku}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <div className="font-medium text-gray-900">
                          {formatVND(product.price)}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded font-medium text-gray-700">
                          {product.quantity}
                        </span>
                      </div>

                      {/* Discount */}
                      <div className="col-span-2 text-center">
                        <span className="font-medium text-gray-400">
                          {product.discount ? formatVND(product.discount) : '0 đ'}
                        </span>
                      </div>

                      {/* Subtotal */}
                      <div className="col-span-1 text-right">
                        <div className="font-medium text-gray-900">
                          {formatVND((product.price || 0) * (product.quantity || 1))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Order Summary */}
              <div className="px-6 py-6 border-t border-gray-200">
                <div className="flex justify-end">
                  <div className="w-80 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Tạm tính</span>
                      <span className="font-medium">{formatVND(order.subtotal || order.total)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span className="font-medium">{formatVND(order.shippingFee || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Giảm giá vận chuyển</span>
                      <span className="font-medium text-green-600">
                        {order.shippingDiscount ? `-${formatVND(order.shippingDiscount)}` : '0 đ'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold border-t border-gray-200 pt-3">
                      <span className="text-gray-900">Tổng cộng</span>
                      <span className="text-red-600">{formatVND(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                <Link
                  to="/orders"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Quay lại đơn hàng của tôi
                </Link>
                
                <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
                  Theo dõi đơn hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
