import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartWithBookDetails } from '@/features/cart/hooks/useCartWithBookDetails'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { Address } from '@/features/auth/model/types'
import { ImageWithFallback } from '@/ui/primitives'
import { PaymentMethod, DeliveryMethod } from '../model/types'

export default function Checkout() {
  const navigate = useNavigate()
  const { user } = useAuthVM()
  const { cartItems: allCartItems = [], isLoading } = useCartWithBookDetails()
  
  // State for checkout items (either all cart items or selected ones)
  const [items, setItems] = useState<typeof allCartItems>([])
  
  // Checkout state
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(user?.address || null)
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<DeliveryMethod | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [note, setNote] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Use either selected items from sessionStorage or all cart items
  useEffect(() => {
    const storedItems = sessionStorage.getItem('selectedCartItems');
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          console.log('Using selected items from sessionStorage:', parsedItems);
          setItems(parsedItems);
          // Clear the stored items to prevent using them again on page refresh
          sessionStorage.removeItem('selectedCartItems');
        } else {
          setItems(allCartItems);
        }
      } catch (error) {
        console.error('Error parsing stored cart items:', error);
        sessionStorage.removeItem('selectedCartItems');
        setItems(allCartItems);
      }
    } else {
      setItems(allCartItems);
    }
  }, [allCartItems]);
  
  // Summary calculations
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingFee = selectedDeliveryMethod?.price || 0
  const discount = 0 // Can be implemented with promotion codes later
  const total = subtotal + shippingFee - discount
  
  // Available delivery methods
  const deliveryMethods: DeliveryMethod[] = [
    {
      id: 'now',
      name: 'Giao Siêu Tốc TỐC 2H',
      description: 'Nhận hàng trước 13h hôm nay',
      price: 25000,
      estimatedDeliveryTime: 'Giao siêu tốc 2h',
      logo: '/Checkout/delivery-method-icon.svg',
      isDefault: true
    },
    {
      id: 'standard',
      name: 'Giao Tiết Kiệm',
      description: 'Giao tiết kiệm trong 3-5 ngày',
      price: 16000,
      estimatedDeliveryTime: 'Giao vào ngày mai',
      logo: '/Checkout/delivery-method-icon.svg'
    }
  ]
  
  // Available payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cash',
      name: 'Thanh toán tiền mặt khi nhận hàng',
      type: 'cash',
      logo: '/Checkout/icon-cash.svg',
      isDefault: true
    },
    {
      id: 'viettel-money',
      name: 'Viettel Money',
      type: 'e-wallet',
      logo: '/Checkout/viettel-money.svg'
    },
    {
      id: 'shinhan-bank',
      name: 'Thẻ ngân hàng Shinhan',
      type: 'credit_card',
      logo: '/Checkout/shinbank.svg'
    }
  ]
  
  // Set default selections
  useEffect(() => {
    if (deliveryMethods.length > 0 && !selectedDeliveryMethod) {
      const defaultMethod = deliveryMethods.find(method => method.isDefault) || deliveryMethods[0]
      setSelectedDeliveryMethod(defaultMethod)
    }
    
    if (paymentMethods.length > 0 && !selectedPaymentMethod) {
      const defaultMethod = paymentMethods.find(method => method.isDefault) || paymentMethods[0]
      setSelectedPaymentMethod(defaultMethod)
    }
  }, [])
  
  // Redirect if there are no items to checkout
  useEffect(() => {
    if (!isLoading && items.length === 0) {
      console.log('No items found for checkout, redirecting to cart page');
      navigate('/cart')
    }
  }, [items, isLoading, navigate])
  
  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      console.log('User not logged in, redirecting to login page');
      navigate('/login', { 
        state: { 
          from: '/checkout',
          message: 'Vui lòng đăng nhập để tiếp tục thanh toán'
        } 
      })
    }
  }, [user, navigate])
  
  const handlePlaceOrder = async () => {
    console.log("Place order button clicked");
    
    // Validation
    if (!selectedAddress) {
      alert('Vui lòng chọn địa chỉ giao hàng')
      return
    }
    
    if (!selectedDeliveryMethod) {
      alert('Vui lòng chọn phương thức vận chuyển')
      return
    }
    
    if (!selectedPaymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán')
      return
    }
    
    if (items.length === 0) {
      alert('Giỏ hàng của bạn đang trống')
      navigate('/cart')
      return
    }
    
    setIsProcessing(true)
    
    try {
      console.log("Processing order...");
      // Here you would call your API to create an order
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
      
      // Generate a realistic order ID
      const orderId = `TIKI${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`
      console.log("Order created successfully:", orderId);
      
      // Redirect to confirmation page
      navigate('/order-success', { 
        state: { 
          orderId,
          total,
          items,
          shippingFee,
          discount
        } 
      })
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.')
    } finally {
      setIsProcessing(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm h-64">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
            Thanh toán
          </h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Forms */}
          <div className="md:col-span-2 space-y-8">
            {/* Shipping address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Chọn hình thức giao hàng
                </h2>
                <button 
                  className="text-blue-600 text-sm font-medium hover:underline"
                  onClick={() => {/* Open address form */}}
                >
                  Giảm tối
                </button>
              </div>
              
              {user?.address ? (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-medium text-gray-900">
                        {user.name} | {user.phone}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium mr-2">
                          {user.address.addressType}
                        </span>
                        {user.address.street}, {user.address.district}, {user.address.city}
                      </p>
                      {user.address.isDefault && (
                        <span className="inline-block mt-2 border border-red-500 text-red-500 text-xs px-2 py-0.5 rounded">
                          Mặc định
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-center">
                  <p className="text-orange-600">
                    Bạn chưa có địa chỉ giao hàng
                  </p>
                  <button 
                    className="mt-2 text-blue-600 font-medium hover:underline"
                    onClick={() => {/* Open address form */}}
                  >
                    Thêm địa chỉ mới
                  </button>
                </div>
              )}
            </div>
            
            {/* Shipping method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-3">
                {/* Radio options for delivery methods */}
                <div className="flex space-x-2">
                  <label 
                    className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all relative ${
                      selectedDeliveryMethod?.id === 'now' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="now"
                        checked={selectedDeliveryMethod?.id === 'now'}
                        onChange={() => setSelectedDeliveryMethod(deliveryMethods[0])}
                        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <div className="ml-3">
                        <div className="inline-flex bg-red-100 text-red-600 text-xs px-2 py-1 rounded mr-2">
                          NEW
                        </div>
                        <span className="font-medium text-gray-900">
                          Giao siêu TỐC 2h
                        </span>
                        <span className="text-green-500 text-sm ml-2">25K</span>
                      </div>
                    </div>
                    {selectedDeliveryMethod?.id === 'now' && (
                      <div className="absolute top-0 right-0 mt-1 mr-1">
                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </label>

                  <label 
                    className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all relative ${
                      selectedDeliveryMethod?.id === 'standard' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="standard"
                        checked={selectedDeliveryMethod?.id === 'standard'}
                        onChange={() => setSelectedDeliveryMethod(deliveryMethods[1])}
                        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <div className="ml-3">
                        <span className="font-medium text-gray-900">
                          Giao tiêu kiệm
                        </span>
                        <span className="text-green-500 text-sm ml-2">16K</span>
                      </div>
                    </div>
                    {selectedDeliveryMethod?.id === 'standard' && (
                      <div className="absolute top-0 right-0 mt-1 mr-1">
                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </label>
                </div>

                {/* Delivery method details */}
                {selectedDeliveryMethod?.id === 'now' && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-3">
                    <div className="flex">
                      <div className="w-6 h-6 mr-2">
                        <img src="/Checkout/delivery-method-icon.svg" alt="Giao hàng siêu tốc" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">Gói: Giao Siêu TỐC 2H</p>
                        <p className="text-green-600 text-sm mt-1">Nhận hàng trước 13h hôm nay</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Payment method */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Chọn hình thức thanh toán
              </h2>
              
              <div className="space-y-3">
                {/* Cash on delivery */}
                <label 
                  className={`block border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod?.id === 'cash' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="h-6 w-6 flex-shrink-0">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={selectedPaymentMethod?.id === 'cash'}
                        onChange={() => setSelectedPaymentMethod(paymentMethods[0])}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="ml-3 flex-1 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                        <img 
                          src={paymentMethods[0].logo} 
                          alt={paymentMethods[0].name} 
                          className="w-5 h-5"
                        />
                      </div>
                      <span className="font-medium text-gray-900">
                        Thanh toán tiền mặt khi nhận hàng
                      </span>
                    </div>
                  </div>
                </label>
                
                {/* Viettel Money */}
                <label 
                  className={`block border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod?.id === 'viettel-money' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="h-6 w-6 flex-shrink-0">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="viettel-money"
                        checked={selectedPaymentMethod?.id === 'viettel-money'}
                        onChange={() => setSelectedPaymentMethod(paymentMethods[1])}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="ml-3 flex-1 flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <img 
                          src={paymentMethods[1].logo} 
                          alt={paymentMethods[1].name} 
                          className="w-8 h-8"
                        />
                      </div>
                      <span className="font-medium text-gray-900">
                        Viettel Money
                      </span>
                    </div>
                  </div>
                </label>
                
                {/* Shinhan Bank */}
                <label 
                  className={`block border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod?.id === 'shinhan-bank' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="h-6 w-6 flex-shrink-0">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="shinhan-bank"
                        checked={selectedPaymentMethod?.id === 'shinhan-bank'}
                        onChange={() => setSelectedPaymentMethod(paymentMethods[2])}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="ml-3 flex-1 flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <img 
                          src={paymentMethods[2].logo} 
                          alt={paymentMethods[2].name} 
                          className="w-8 h-8"
                        />
                      </div>
                      <span className="font-medium text-gray-900">
                        Thẻ ngân hàng Shinhan
                      </span>
                    </div>
                  </div>
                </label>
                
                {/* Credit card options could be added here */}
              </div>
            </div>
            
            {/* Order notes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                <span className="text-blue-600 mr-2">4</span> 
                Ghi chú đơn hàng
              </h2>
              
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nhập ghi chú cho đơn hàng (không bắt buộc)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              ></textarea>
            </div>
          </div>
          
          {/* Right column - Order summary */}
          <div className="space-y-8">
            {/* Order summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-4 border-b border-gray-200">
                Đơn hàng ({items.length} sản phẩm)
              </h2>
              
              {/* Product list */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start py-3 border-b border-gray-100 last:border-0">
                    <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        SL: x{item.quantity}
                      </p>
                    </div>
                    
                    <div className="ml-3 text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {item.price.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Tiki Khuyến Mãi */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Tiki Khuyến Mãi</span>
                  <span className="text-xs text-gray-500">Có thể chọn 2</span>
                </div>
                
                <div className="mt-3 p-3 rounded-lg border border-blue-200 bg-blue-50 flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-blue-600">Giảm 50% cho đơn từ 0đ</span>
                  </div>
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
                
              {/* Discount code */}
              <div className="flex items-center border border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 mb-6">
                <div className="px-3 py-2 border-r border-gray-200">
                  <img 
                    src="/Checkout/promotion-outline.svg" 
                    alt="Mã giảm giá" 
                    className="h-5 w-5"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="flex-1 px-3 py-2 text-sm border-0 focus:outline-none"
                />
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                  Áp dụng
                </button>
              </div>
              
              {/* Price summary */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng tiền hàng</span>
                  <span className="font-medium">{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="font-medium">
                    {shippingFee.toLocaleString('vi-VN')}₫
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Giảm giá vận chuyển</span>
                  <span className="text-green-600 font-medium">
                    -25.000₫
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giảm giá</span>
                    <span className="text-green-600 font-medium">
                      -{discount.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                )}
                
                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="font-medium text-gray-900">Tổng tiền</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-red-500">
                      {total.toLocaleString('vi-VN')}₫
                    </div>
                    <div className="flex items-center text-gray-500 text-xs mt-1">
                      <span>Tiết kiệm</span>
                      <span className="text-red-500 font-medium ml-1">25.000₫</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Place order button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || !selectedAddress || !selectedDeliveryMethod || !selectedPaymentMethod}
                className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                  isProcessing || !selectedAddress || !selectedDeliveryMethod || !selectedPaymentMethod
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </span>
                ) : 'Đặt hàng'}
              </button>
              
              <div className="text-xs text-gray-600 mt-4 text-center">
                Bằng việc tiến hành đặt mua hàng, bạn đồng ý với 
                <a href="#" className="text-blue-600 hover:underline mx-1">Điều khoản dịch vụ</a>
                của Tiki
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
