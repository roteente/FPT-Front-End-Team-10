import { baseApi } from '@/core/api/baseApi';
import { store } from '@/app/store';
import { OrderInfo } from '../orderSlice';

// Types for actual API response (based on current JSON structure)
export interface ApiOrderProduct {
  id: string | number
  name: string
  price: number
  quantity: number
  image?: string // Optional - might not be available
}

export interface ApiOrder {
  id: string | number
  products: ApiOrderProduct[]
  receiverName?: string // Optional - might be missing
  receiverAddress?: string // Optional - might be missing  
  receiverPhone?: string // Optional - might be missing
  paymentMethod?: 'cod' | 'online' | string // Optional - might be missing
  total: number // Required for business logic
  note?: string // Optional
  createdAt: string // Required for business logic
}

// Extended types for UI display (with computed fields)
export interface OrderProduct {
  id: string
  bookId: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  quantity: number
  image?: string
  supplier?: string
  sku?: string
  status?: 'available' | 'out_of_stock' | 'discontinued'
}

export interface OrderShipping {
  method: 'standard' | 'fast' | 'now' | 'super_fast'
  methodName: string
  cost: number
  discount: number
  estimatedDate: string
  actualDate?: string
  trackingNumber?: string
  carrier?: string
}

export interface OrderPayment {
  method: 'cash' | 'card' | 'bank_transfer' | 'e_wallet' | 'installment'
  methodName: string
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partial_refund'
  transactionId?: string
  paidAt?: string
  amount: number
}

export interface Order {
  id: string
  orderCode: string
  userId: number // Liên kết với user
  status: 'pending' | 'confirmed' | 'preparing' | 'shipping' | 'delivered' | 'cancelled' | 'returned'
  statusText: string
  subTotal: number // Tổng tiền sản phẩm
  shippingCost: number
  shippingDiscount: number
  totalDiscount: number
  total: number // Tổng tiền cuối cùng
  createdAt: string
  updatedAt: string
  confirmedAt?: string
  shippedAt?: string
  deliveredAt?: string
  cancelledAt?: string
  
  // Thông tin người nhận
  receiverName: string
  receiverPhone: string
  receiverEmail?: string
  receiverAddress: string
  receiverWard?: string
  receiverDistrict?: string
  receiverCity?: string
  
  // Chi tiết đơn hàng
  products: OrderProduct[]
  shipping: OrderShipping
  payment: OrderPayment
  
  // Ghi chú và metadata
  note?: string
  internalNote?: string
  source?: 'web' | 'mobile' | 'call_center'
  
  // Tracking và lịch sử
  statusHistory?: {
    status: string
    timestamp: string
    note?: string
    updatedBy?: string
  }[]
}

// Helper function để tạo mock data theo user hiện tại
const createMockOrdersForUser = (user?: any) => {
  const userName = user?.name || 'Người dùng';
  const userEmail = user?.email || 'user@example.com';
  const userPhone = user?.phone || '0900000000';
  const userId = user?.id || 1;

  return [
    {
      id: '861977987',
      orderCode: 'TK861977987',
      userId: userId,
      status: 'confirmed' as const,
      statusText: 'Đang xử lý',
      subTotal: 110000,
      shippingCost: 25000,
      shippingDiscount: 25000,
      totalDiscount: 0,
      total: 110000,
      createdAt: '2025-03-28T10:00:00Z',
      updatedAt: '2025-03-28T10:30:00Z',
      confirmedAt: '2025-03-28T10:30:00Z',
      
      receiverName: userName,
      receiverPhone: userPhone,
      receiverEmail: userEmail,
      receiverAddress: '65 Tr Duy Tân',
      receiverWard: 'Phường Dịch Vọng',
      receiverDistrict: 'Quận Cầu Giấy',
      receiverCity: 'Hà Nội',
      
      products: [
        {
          id: 'p1',
          bookId: 'book_001',
          name: 'Chat GPT Thực Chiến - Hướng Dẫn Toàn Diện',
          price: 110000,
          originalPrice: 150000,
          discount: 40000,
          quantity: 1,
          image: '/placeholder-book.jpg',
          supplier: 'Tiki Trading',
          sku: '9831074249227',
          status: 'available' as const
        }
      ],
      
      shipping: {
        method: 'now' as const,
        methodName: 'TikiNOW Giao Siêu Tốc',
        cost: 25000,
        discount: 25000,
        estimatedDate: '2025-03-28T13:00:00Z',
        carrier: 'TikiNOW Smart Logistics'
      },
      
      payment: {
        method: 'cash' as const,
        methodName: 'Thanh toán tiền mặt khi nhận hàng',
        status: 'pending' as const,
        amount: 110000
      },
      
      note: 'Giao trong giờ hành chính',
      source: 'web' as const,
      
      statusHistory: [
        {
          status: 'pending',
          timestamp: '2025-03-28T10:00:00Z',
          note: 'Đơn hàng được tạo'
        },
        {
          status: 'confirmed',
          timestamp: '2025-03-28T10:30:00Z',
          note: 'Đơn hàng đã được xác nhận',
          updatedBy: 'system'
        }
      ]
    },
    {
      id: '861977988',
      orderCode: 'TK861977988',
      userId: userId,
      status: 'shipping' as const,
      statusText: 'Đang giao hàng',
      subTotal: 250000,
      shippingCost: 30000,
      shippingDiscount: 0,
      totalDiscount: 25000,
      total: 255000,
      createdAt: '2025-03-25T14:30:00Z',
      updatedAt: '2025-03-26T09:00:00Z',
      confirmedAt: '2025-03-25T15:00:00Z',
      shippedAt: '2025-03-26T09:00:00Z',
      
      receiverName: userName,
      receiverPhone: userPhone,
      receiverEmail: userEmail,
      receiverAddress: '65 Tr Duy Tân',
      receiverWard: 'Phường Dịch Vọng',
      receiverDistrict: 'Quận Cầu Giấy',
      receiverCity: 'Hà Nội',
      
      products: [
        {
          id: 'p2',
          bookId: 'book_002',
          name: 'JavaScript - The Definitive Guide 7th Edition',
          price: 125000,
          originalPrice: 140000,
          discount: 15000,
          quantity: 2,
          image: '/placeholder-book.jpg',
          supplier: 'Tiki Books',
          sku: '9781491952023',
          status: 'available' as const
        }
      ],
      
      shipping: {
        method: 'fast' as const,
        methodName: 'Giao Hàng Nhanh',
        cost: 30000,
        discount: 0,
        estimatedDate: '2025-03-27T17:00:00Z',
        trackingNumber: 'GHN123456789',
        carrier: 'Giao Hàng Nhanh'
      },
      
      payment: {
        method: 'card' as const,
        methodName: 'Thẻ tín dụng/ghi nợ',
        status: 'paid' as const,
        transactionId: 'TXN_20250325_001',
        paidAt: '2025-03-25T14:35:00Z',
        amount: 255000
      },
      
      source: 'web' as const,
      
      statusHistory: [
        {
          status: 'pending',
          timestamp: '2025-03-25T14:30:00Z',
          note: 'Đơn hàng được tạo'
        },
        {
          status: 'confirmed',
          timestamp: '2025-03-25T15:00:00Z',
          note: 'Đơn hàng đã được xác nhận và thanh toán thành công'
        },
        {
          status: 'preparing',
          timestamp: '2025-03-26T08:00:00Z',
          note: 'Đang chuẩn bị hàng'
        },
        {
          status: 'shipping',
          timestamp: '2025-03-26T09:00:00Z',
          note: 'Đang giao hàng - Mã vận đơn: GHN123456789'
        }
      ]
    }
  ];
};

// Validation helpers for order data
export const validateOrderData = (order: any): { isValid: boolean; message?: string } => {
  if (!order) {
    return { isValid: false, message: 'Không có dữ liệu đơn hàng' };
  }

  // Required fields for business logic
  const requiredFields = [
    { field: 'id', message: 'Mã đơn hàng' },
    { field: 'total', message: 'Tổng tiền' },
    { field: 'createdAt', message: 'Ngày tạo' }
  ];

  const missingFields = requiredFields.filter(({ field }) => 
    order[field] === undefined || order[field] === null || order[field] === ''
  );

  if (missingFields.length > 0) {
    return {
      isValid: false,
      message: `Thiếu dữ liệu bắt buộc: ${missingFields.map(f => f.message).join(', ')}`
    };
  }

  // Validate numeric fields
  if (typeof order.total !== 'number' || order.total < 0) {
    return { isValid: false, message: 'Tổng tiền không hợp lệ' };
  }

  return { isValid: true };
};

export const validateOrderProducts = (products: any[]): { isValid: boolean; message?: string } => {
  if (!products || !Array.isArray(products)) {
    return { isValid: false, message: 'Danh sách sản phẩm không hợp lệ' };
  }

  if (products.length === 0) {
    return { isValid: false, message: 'Đơn hàng phải có ít nhất 1 sản phẩm' };
  }

  const invalidProducts = products.filter((product, index) => {
    return !product.name || typeof product.price !== 'number' || typeof product.quantity !== 'number';
  });

  if (invalidProducts.length > 0) {
    return { isValid: false, message: 'Có sản phẩm thiếu thông tin cần thiết' };
  }

  return { isValid: true };
};

export const validateShippingInfo = (order: any): { isValid: boolean; message?: string; warnings?: string[] } => {
  const warnings: string[] = [];
  
  if (!order.receiverName) warnings.push('Thiếu tên người nhận');
  if (!order.receiverAddress) warnings.push('Thiếu địa chỉ giao hàng');
  if (!order.receiverPhone) warnings.push('Thiếu số điện thoại');

  if (warnings.length > 0) {
    return {
      isValid: false,
      message: 'Thiếu thông tin giao hàng',
      warnings
    };
  }

  return { isValid: true };
};

// Transform API response to UI format
export const transformApiOrderToUI = (apiOrder: ApiOrder): Order => {
  return {
    id: String(apiOrder.id),
    orderCode: `TK${apiOrder.id}`,
    userId: 1, // Will be replaced with actual user ID from auth
    status: 'pending', // Default status since API doesn't provide it
    statusText: 'Đang xử lý',
    subTotal: apiOrder.total,
    shippingCost: 0,
    shippingDiscount: 0,
    totalDiscount: 0,
    total: apiOrder.total,
    createdAt: apiOrder.createdAt,
    deliveredAt: undefined,
    receiverName: apiOrder.receiverName || '',
    receiverPhone: apiOrder.receiverPhone || '',
    receiverAddress: apiOrder.receiverAddress || '',
    receiverWard: undefined,
    receiverDistrict: undefined,
    receiverCity: undefined,
    note: apiOrder.note,
    products: (apiOrder.products || []).map(product => ({
      id: String(product.id),
      bookId: String(product.id),
      name: product.name || 'Sản phẩm chưa có tên',
      price: product.price || 0,
      quantity: product.quantity || 0,
      image: product.image,
      supplier: 'Tiki Trading'
    })),
    shipping: {
      method: 'now',
      methodName: 'TikiNOW Giao Siêu Tốc',
      cost: 0,
      discount: 0,
      estimatedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    payment: {
      method: apiOrder.paymentMethod === 'cod' ? 'cash' : 'card',
      methodName: apiOrder.paymentMethod === 'cod' ? 'Tiền mặt' : 'Thẻ ngân hàng',
      status: 'pending',
      amount: apiOrder.total
    },
    timeline: []
  };
};

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Tạo đơn hàng mới
    createOrder: builder.mutation<Order, OrderInfo>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order'],
    }),
    
    // Lấy tất cả đơn hàng của user hiện tại
    getUserOrders: builder.query<Order[], { userId?: number; status?: string; limit?: number; offset?: number }>({
      query: (params = {}) => ({
        url: '/orders',
        method: 'GET'
      }),
      transformResponse: (response: ApiOrder[]) => {
        // Validate and transform API response
        if (!Array.isArray(response)) {
          console.warn('Orders API returned invalid data format');
          return [];
        }

        return response
          .filter(apiOrder => {
            const validation = validateOrderData(apiOrder);
            if (!validation.isValid) {
              console.warn(`Invalid order data for ID ${apiOrder.id}:`, validation.message);
              return false; // Filter out invalid orders
            }
            return true;
          })
          .map(apiOrder => transformApiOrderToUI(apiOrder))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      transformErrorResponse: (response: any) => {
        console.error('Orders API error:', response);
        return {
          status: response.status,
          error: 'Không thể tải danh sách đơn hàng. Vui lòng thử lại.'
        };
      },
      providesTags: ['Order'],
    }),
    
    // Lấy chi tiết một đơn hàng cụ thể
    getOrderById: builder.query<Order, { orderId: string; userId?: number }>({
      query: ({ orderId }) => ({
        url: `/orders/${orderId}`,
        method: 'GET'
      }),
      transformResponse: (response: ApiOrder) => {
        // Validate API response
        const validation = validateOrderData(response);
        if (!validation.isValid) {
          throw new Error(`Dữ liệu đơn hàng không hợp lệ: ${validation.message}`);
        }

        // Validate products if business requires it
        const productValidation = validateOrderProducts(response.products);
        if (!productValidation.isValid) {
          console.warn(`Product validation warning for order ${response.id}:`, productValidation.message);
        }

        // Validate shipping info and show warnings
        const shippingValidation = validateShippingInfo(response);
        if (!shippingValidation.isValid) {
          console.warn(`Shipping validation warning for order ${response.id}:`, shippingValidation.message);
          if (shippingValidation.warnings) {
            shippingValidation.warnings.forEach(warning => console.warn(`- ${warning}`));
          }
        }

        return transformApiOrderToUI(response);
      },
      transformErrorResponse: (response: any) => {
        console.error('Order detail API error:', response);
        return {
          status: response.status,
          error: 'Không thể tải thông tin đơn hàng. Vui lòng thử lại.'
        };
      },
      providesTags: ['Order'],
    }),
    
    // Cập nhật trạng thái đơn hàng (chỉ admin hoặc system)
    updateOrderStatus: builder.mutation<Order, { 
      orderId: string; 
      status: Order['status']; 
      note?: string;
      updatedBy?: string;
    }>({
      queryFn: async ({ orderId, status, note, updatedBy = 'user' }) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Lấy thông tin user hiện tại từ store
        const currentUser = store.getState().auth.user;
        
        if (!currentUser) {
          throw new Error('User not authenticated');
        }
        
        // Tạo mock data theo user hiện tại đang đăng nhập
        const mockOrdersData = createMockOrdersForUser(currentUser);
        
        const orderIndex = mockOrdersData.findIndex(o => o.id === orderId);
        if (orderIndex === -1) {
          return { 
            error: { 
              status: 404, 
              data: { message: 'Order not found' } 
            } 
          };
        }
        
        // Cập nhật trạng thái và lịch sử
        const order = mockOrdersData[orderIndex];
        const statusTexts = {
          'pending': 'Chờ xác nhận',
          'confirmed': 'Đã xác nhận',
          'preparing': 'Đang chuẩn bị',
          'shipping': 'Đang giao hàng',
          'delivered': 'Đã giao hàng',
          'cancelled': 'Đã hủy',
          'returned': 'Đã trả hàng'
        };
        
        // Use type assertion to fix TypeScript issues
        const updatedOrder = order as any;
        updatedOrder.status = status;
        updatedOrder.statusText = statusTexts[status];
        updatedOrder.updatedAt = new Date().toISOString();
        
        // Cập nhật timestamp tương ứng
        if (status === 'confirmed') updatedOrder.confirmedAt = updatedOrder.updatedAt;
        if (status === 'shipping') updatedOrder.shippedAt = updatedOrder.updatedAt;
        if (status === 'delivered') updatedOrder.deliveredAt = updatedOrder.updatedAt;
        if (status === 'cancelled') updatedOrder.cancelledAt = updatedOrder.updatedAt;
        
        // Thêm vào lịch sử
        if (!updatedOrder.statusHistory) updatedOrder.statusHistory = [];
        updatedOrder.statusHistory.push({
          status,
          timestamp: updatedOrder.updatedAt,
          note: note || `Trạng thái được cập nhật thành ${statusTexts[status]}`,
          updatedBy
        });
        
        return { data: updatedOrder as Order };
      },
      invalidatesTags: ['Order'],
    }),
    
    // Hủy đơn hàng
    cancelOrder: builder.mutation<Order, { orderId: string; reason: string; userId?: number }>({
      queryFn: async ({ orderId, reason, userId }) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Lấy thông tin user hiện tại từ store
        const currentUser = store.getState().auth.user;
        
        if (!currentUser) {
          throw new Error('User not authenticated');
        }
        
        // Tạo mock data theo user hiện tại đang đăng nhập
        const mockOrdersData = createMockOrdersForUser(currentUser);
        
        const orderIndex = mockOrdersData.findIndex(o => 
          o.id === orderId && o.userId === currentUser.id
        );
        
        if (orderIndex === -1) {
          return { 
            error: { 
              status: 404, 
              data: { message: 'Order not found or access denied' } 
            } 
          };
        }
        
        const order = mockOrdersData[orderIndex];
        
        // Kiểm tra xem đơn hàng có thể hủy không
        if (!['pending', 'confirmed'].includes(order.status)) {
          return { 
            error: { 
              status: 400, 
              data: { message: 'Cannot cancel order in current status' } 
            } 
          };
        }
        
        // Cập nhật trạng thái thành cancelled
        const cancelledOrder = order as any;
        cancelledOrder.status = 'cancelled';
        cancelledOrder.statusText = 'Đã hủy';
        cancelledOrder.updatedAt = new Date().toISOString();
        cancelledOrder.cancelledAt = cancelledOrder.updatedAt;
        
        // Thêm vào lịch sử
        if (!cancelledOrder.statusHistory) cancelledOrder.statusHistory = [];
        cancelledOrder.statusHistory.push({
          status: 'cancelled',
          timestamp: cancelledOrder.updatedAt,
          note: `Đơn hàng bị hủy: ${reason}`,
          updatedBy: 'user'
        });
        
        return { data: cancelledOrder as Order };
      },
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { 
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation
} = orderApi;
