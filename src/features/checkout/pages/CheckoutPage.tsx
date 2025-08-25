import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from '@/features/cart/model/selectors';
import { RootState } from '@/app/store';
import { useCreateOrderMutation } from '@/features/orders/api/orderApi';
import { useRemoveCartItemMutation } from '@/features/cart/api/cartApi';
import { setOrder, setOrderSuccess } from '@/features/orders/orderSlice';
import { useAuthVM } from '@/features/auth/hooks/useAuthVM';
import { LoginModal } from '@/features/auth/components/LoginModal';
import { RegisterModal } from '@/features/auth/components/RegisterModal';
import { useAuthModal } from '@/features/auth/hooks/useAuthModal';
import { useGetBooksQuery } from '@/features/books/api/bookApi';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Auth modal functionality
  const { 
    isLoginModalOpen, 
    isRegisterModalOpen, 
    openLoginModal, 
    openRegisterModal, 
    closeModals 
  } = useAuthModal();

  // Fetch all books for book details
  const { data: allBooks = [], isLoading: isBooksLoading } = useGetBooksQuery();
  
  // Lấy selectedCartItems từ sessionStorage nếu có, nếu không lấy toàn bộ cart
  let cartItems = useSelector((state: RootState) => selectCartItems(state));
  const [selectedCartItems, setSelectedCartItems] = useState<any[] | null>(null);
  const [buyNowProduct, setBuyNowProduct] = useState<any | null>(null);
  
  React.useEffect(() => {
    // Kiểm tra dữ liệu "Mua ngay" từ sessionStorage
    const buyNowData = sessionStorage.getItem('buyNowProduct');
    if (buyNowData) {
      try {
        const product = JSON.parse(buyNowData);
        setBuyNowProduct(product);
        sessionStorage.removeItem('buyNowProduct'); // Xóa sau khi đã lấy
      } catch (error) {
        console.error('Error parsing buy now data:', error);
      }
    }

    // Kiểm tra selectedCartItems từ giỏ hàng
    const selected = sessionStorage.getItem('selectedCartItems');
    if (selected) {
      try {
        setSelectedCartItems(JSON.parse(selected));
        sessionStorage.removeItem('selectedCartItems');
      } catch {}
    }
  }, []);
  
  if (selectedCartItems && selectedCartItems.length > 0) {
    cartItems = selectedCartItems;
  }

  // Xác định nguồn dữ liệu: "Mua ngay" hoặc từ giỏ hàng
  const displayItems = buyNowProduct ? [buyNowProduct] : cartItems;

  // Populate cart items with book details from API (chỉ khi không có buyNowProduct)
  const cartItemsWithDetails = useMemo(() => {
    // Nếu có buyNowProduct, sử dụng trực tiếp
    if (buyNowProduct) {
      return [buyNowProduct];
    }

    // Nếu không có books hoặc displayItems, return displayItems
    if (!allBooks.length || !displayItems.length) return displayItems;
    
    return displayItems.map((cartItem: any) => {
      const book = allBooks.find(b => b.id === cartItem.bookId);
      
      if (book) {
        
        const imageUrl = (book.images?.[0] as any)?.base_url || 
                        (book.images?.[0] as any)?.medium_url || 
                        (book.images?.[0] as any)?.small_url ||
                        book.thumbnail ||
                        book.images?.[0] ||
                        '';
        
        const price = book.current_seller?.price || 
                     book.list_price || 
                     0;
        
        const populatedItem = {
          ...cartItem,
          title: book.name || `Sách ID ${book.id}`,
          price: price,
          image: imageUrl,
          book: book
        };
        
        return populatedItem;
      } else {
      }
      return cartItem;
    });
  }, [displayItems, allBooks, buyNowProduct]);

  // Debug cartItems
  if (cartItemsWithDetails.length > 0) {
    console.log('First item with details:', cartItemsWithDetails[0]);
  }

  // Lấy thông tin user
  const { user } = useAuthVM();
  //const receiverName = user?.name || "";
  //const receiverPhone = user?.phone || "";
  //const receiverAddress = user?.address ? `${user.address.street}, ${user.address.district}, ${user.address.city}` : "";
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [note, setNote] = useState("");
  const [shippingMethod, setShippingMethod] = useState("fast");
  const [voucher, setVoucher] = useState("");
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  // Tính phí vận chuyển và giảm giá mẫu
  const shippingFee = shippingMethod === "fast" ? 25000 : 16000;
  const directDiscount = 59000;
  const shippingDiscount = shippingMethod === "fast" ? 25000 : 0;
  const subtotal = cartItemsWithDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee - directDiscount - shippingDiscount;
  const defaultAddress = user?.defaultAddress 
  || user?.addresses?.find(addr => addr.isDefault);

  const receiverName = defaultAddress?.receiverName || user?.name || "Ng Minh";
  const receiverPhone = defaultAddress?.receiverPhone || user?.phone || "0579842221";
  const receiverAddress = defaultAddress 
  ? `${defaultAddress.street}, ${defaultAddress.district}, ${defaultAddress.city}`
  : "Mo Lao Ha Dong HN";
  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!receiverName || !receiverAddress || !receiverPhone) {
      alert("Vui lòng nhập đầy đủ thông tin nhận hàng.");
      return;
    }
    const order = {
      products: cartItemsWithDetails.map(item => ({
        id: String(item.bookId),
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image, // Thêm image vào order data
      })),
      receiverName,
      receiverAddress,
      receiverPhone,
      paymentMethod,
      total,
      note,
      createdAt: new Date().toISOString(),
    };
    try {
      await createOrder(order).unwrap();
      // Xóa các sản phẩm đã đặt khỏi giỏ hàng (nếu user đã đăng nhập)
      if (user && cartItemsWithDetails.length > 0) {
        for (const item of cartItemsWithDetails) {
          try {
            await removeCartItem(item.id).unwrap();
          } catch (err) {
            // Có thể log lỗi xóa từng item nếu cần
          }
        }
      }
      dispatch(setOrder(order));
      dispatch(setOrderSuccess(true));
      navigate("/order-success");
    } catch (err) {
      alert("Đặt hàng thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-[#F5F5FA] min-h-screen">
      {/* Show loading state while fetching book details */}
      {isBooksLoading && cartItems.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF424E] mx-auto mb-4"></div>
            <div className="text-gray-600">Đang tải thông tin sản phẩm...</div>
          </div>
        </div>
      )}
      {/* Dải quảng cáo */}
      <div 
        className="w-full flex items-center justify-center"
        style={{ 
          height: '40px',
          background: '#EFFFF4'
        }}
      >
        <div className="flex items-center gap-2">
          <span 
            className="text-sm font-medium"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#00AB56'
            }}
          >
            Freeship đơn từ 45k, giảm nhiều hơn cùng
          </span>
          <img 
            src="/Checkout/freeship.png" 
            alt="FREESHIP XTRA"
            className="h-4 w-auto object-contain ml-1"
          />
        </div>
      </div>
      
      {/* Header logo + Thanh toán */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <img 
              src="/Checkout/tiki-logo.png" 
              alt="Tiki" 
              className="h-14 w-auto object-contain cursor-pointer"
              onClick={() => navigate('/')}
            />
            <div className="w-px h-8 bg-gray-300 mx-1"></div>
            <span 
              className="text-[#0B74E5] font-normal tracking-wide"
              style={{
                fontSize: '22px',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            >
              Thanh toán
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 px-6 py-6">
        {/* Cột trái - Content chính */}
        <div className="flex-1" style={{ maxWidth: 'calc(100% - 320px)' }}>
          {/* Chọn hình thức giao hàng */}
          <div className="bg-white rounded-lg p-6 mb-4 shadow-sm border border-[#E0E0E0]">
            <div className="font-medium mb-4 text-[16px] text-[#242424]">Chọn hình thức giao hàng</div>
            
            {/* Container với background xanh nhạt như trong thiết kế */}
            <div className="bg-[#EDF7FF] rounded-lg p-4 mb-6">
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="shipping" 
                    value="fast" 
                    checked={shippingMethod === 'fast'} 
                    onChange={() => setShippingMethod('fast')}
                    className="w-4 h-4 text-[#FF6D42] border-gray-300 focus:ring-[#FF6D42]"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF6D42] font-bold text-sm">NOW</span>
                    <span className="text-sm text-gray-700">Giao siêu tốc 2h</span>
                    <span className="text-green-600 font-medium text-sm">-25K</span>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="shipping" 
                    value="save" 
                    checked={shippingMethod === 'save'} 
                    onChange={() => setShippingMethod('save')}
                    className="w-4 h-4 text-gray-400 border-gray-300 focus:ring-gray-400"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Giao tiết kiệm</span>
                    <span className="text-green-600 font-medium text-sm">-16K</span>
                  </div>
                </label>
              </div>
            </div>
            {/* Header với icon gói giao hàng - nằm ngoài box */}
            <div className="flex items-center gap-2 mb-4">
              <img src="/Checkout/gói giao hàng.png" alt="delivery package" className="w-5 h-5" />
              <span className="text-sm font-medium" style={{ color: '#079449' }}>Gói: Giao siêu tốc 2h, trước 13h hôm nay</span>
            </div>
            
            {/* Box sản phẩm */}
            <div className="border border-[#E0E0E0] rounded-lg p-4">
              
              {cartItemsWithDetails.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  {isBooksLoading ? 'Đang tải thông tin sản phẩm...' : 'Không có sản phẩm nào'}
                </div>
              )}
              {cartItemsWithDetails.map((item, idx) => {
                return (
                <div key={item.id || item.bookId || idx}>
                  {/* Hình thức giao hàng NOW - trên cùng bên trái */}
                  <div className="flex items-center gap-2 mb-3">
                    <img src="/Checkout/now.png" alt="NOW" className="h-4 w-auto object-contain" />
                    <span className="text-xs font-medium" style={{ color: '#0B74E5' }}>GIAO SIÊU TỐC 2H</span>
                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-[#00AB56] text-sm font-medium">25.000 đ</span>
                      <span className="bg-[#E8F5E8] text-[#00AB56] text-xs px-2 py-1 rounded font-medium">MIỄN PHÍ</span>
                    </div>
                  </div>
                  
                  {/* Layout sản phẩm ngang hàng */}
                  <div className="flex items-start gap-4">
                    {/* Ảnh sản phẩm với error handling */}
                    <div className="w-16 h-20 border border-[#E0E0E0] rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title || item.name || 'Sản phẩm'} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            //e.currentTarget.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-full h-full flex items-center justify-center text-gray-400 text-xs"
                        style={{ display: item.image ? 'none' : 'flex' }}
                      >
                        📚
                      </div>
                    </div>
                    
                    {/* Thông tin sản phẩm */}
                    <div className="flex flex-col flex-1">
                      {/* Tên sản phẩm */}
                      <div className="font-medium text-sm mb-1 text-[#333] leading-tight">
                        {item.title || item.name || 'Tên sản phẩm không có'}
                      </div>
                      
                      {/* Số lượng */}
                      <div className="text-gray-500 text-xs mb-2">
                        Số Lượng: <span className="font-medium text-black">x{item.quantity || 1}</span>
                      </div>
                      
                      {/* Giá với debug info */}
                      <div className="flex items-center gap-3">
                        {item.price > 0 ? (
                          <>
                            <span className="line-through text-gray-400 text-sm">
                              {Math.round(item.price * 1.2).toLocaleString()} đ
                            </span>
                            <span className="text-[#FF424E] font-bold text-lg">
                              {item.price.toLocaleString()} đ
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-500 text-sm">
                            Đang cập nhật giá...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
            {/* Thêm mã khuyến mãi */}
            <div className="mt-4 mb-4">
              <button className="text-[#0B74E5] text-sm font-medium flex items-center gap-2 hover:underline">
                <img src="/Checkout/promotion-outline.svg" alt="promo" className="w-4 h-4" />
                Thêm mã khuyến mãi của Shop
              </button>
            </div>
          </div>
          {/* Chọn hình thức thanh toán */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E0E0E0]">
            <div className="font-medium mb-4 text-[16px] text-[#242424]">Chọn hình thức thanh toán</div>
            <div className="flex flex-col gap-4 mb-6">
              <label className="flex items-center gap-3 p-3 border border-[#E0E0E0] rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-[#0B74E5]" />
                <img src="/Checkout/icon-cash.svg" alt="cash" className="w-6 h-6" />
                <span className="text-[15px] text-[#333]">Thanh toán tiền mặt</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-[#E0E0E0] rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="w-4 h-4 text-[#0B74E5]" />
                <img src="/Checkout/viettel-money.svg" alt="viettel" className="w-6 h-6" />
                <span className="text-[15px] text-[#333]">Viettel Money</span>
              </label>
            </div>
            {/* Ưu đãi thanh toán thẻ */}
            {/* <div className="border-t border-[#E0E0E0] pt-4">
              <div className="text-sm text-[#666] mb-4 font-medium">Ưu đãi thanh toán thẻ</div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { title: 'Freeship', bank: 'Thẻ Shinhan Platinum', note: 'Không giới hạn' },
                  { title: 'Freeship', bank: 'Thẻ Shinhan Classic', note: 'Không giới hạn' },
                  { title: 'Giảm 30k', bank: 'Đơn từ 250k', note: 'Không giới hạn' },
                  { title: 'Giảm 50k', bank: 'Đơn từ 500k', note: 'Không giới hạn' },
                  { title: 'Giảm 50k', bank: 'Đơn từ 500k', note: 'Không giới hạn' },
                  { title: 'Giảm 70k', bank: 'Đơn từ 700k', note: 'Không giới hạn' }
                ].map((item, i) => (
                  <div key={i} className="border border-[#E0E0E0] rounded-lg p-3 text-center bg-white hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-center mb-2">
                      <img src="/Checkout/shinbank.svg" alt="bank" className="w-8 h-5" />
                    </div>
                    <div className="text-xs font-medium text-[#333] mb-1">{item.title}</div>
                    <div className="text-xs text-[#666] mb-1">{item.bank}</div>
                    <div className="text-xs text-[#FF6D42] font-medium">{item.note}</div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
        {/* Cột phải - Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="space-y-4 sticky top-4">
            {/* Thông tin giao tới */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-[#E0E0E0]">
              <div className="font-medium mb-3 flex items-center justify-between text-[16px] text-[#242424]">
                Giao tới
                <button type="button" className="text-[#0B74E5] text-sm font-medium hover:underline">Thay đổi</button>
              </div>
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[15px] text-[#333]">{receiverName}</span>
                  <span className="px-2 py-1 bg-[#FFF3E0] text-[#FF6D42] rounded text-xs font-medium border border-[#FFE0B3]">Nhà</span>
                </div>
                <div className="text-gray-600 text-sm">| <span className="font-medium">{receiverPhone}</span></div>
              </div>
              <div className="text-[#666] text-sm leading-relaxed">{receiverAddress}</div>
            </div>
            
            {/* Tiki Khuyến Mãi */}
            {/* <div className="bg-white rounded-lg p-4 shadow-sm border border-[#E0E0E0]">
              <div className="font-medium mb-3 text-[16px] text-[#242424]">Tiki Khuyến Mãi</div>
              <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-lg border border-[#E0E0E0]">
                <div className="flex items-center gap-2">
                  <img src="/Checkout/promotion-outline.svg" alt="coupon" className="w-5 h-5" />
                  <span className="text-sm text-[#666]">Có thể chọn 2</span>
                </div>
                <button className="text-[#0B74E5] text-sm font-medium hover:underline">Chọn hoặc nhập khuyến mãi khác</button>
              </div>
            </div> */}
            
            {/* Đơn hàng */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-[#E0E0E0]">
              <div className="font-medium mb-3 text-[16px] text-[#242424]">Đơn hàng</div>
              <div className="text-sm text-[#666] mb-4">{cartItemsWithDetails.length} sản phẩm. <span className="text-[#0B74E5] cursor-pointer hover:underline">Xem thông tin</span></div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666]">Tổng tiền hàng</span>
                  <span className="text-[#333]">{subtotal.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Phí vận chuyển</span>
                  <span className="text-[#333]">{shippingFee.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Giảm giá trực tiếp</span>
                  <span className="text-[#00AB56]">-{directDiscount.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Giảm giá vận chuyển</span>
                  <span className="text-[#00AB56]">-{shippingDiscount.toLocaleString()}đ</span>
                </div>
              </div>
              <div className="border-t border-[#E0E0E0] my-4"></div>
              <div className="flex justify-between text-lg font-bold mb-2">
                <span className="text-[#333]">Tổng tiền thanh toán</span>
                <span className="text-[#FF424E] text-xl">{total.toLocaleString()} đ</span>
              </div>
              <div className="text-[#00AB56] text-sm mb-4">Tiết kiệm {((subtotal + shippingFee) - total).toLocaleString()}đ</div>
              <button
                onClick={handleOrder}
                className="w-full bg-[#FF424E] hover:bg-[#E63946] text-white font-bold py-3 rounded text-base transition-colors shadow-sm"
                disabled={isLoading}
              >
                {isLoading ? "Đang đặt hàng..." : "Đặt hàng"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeModals} 
        onSwitchToRegister={openRegisterModal}
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={closeModals} 
        onSwitchToLogin={openLoginModal}
      />
    </div>
  );
};

export default CheckoutPage;
