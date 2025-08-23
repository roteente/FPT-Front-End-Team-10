import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { resetOrder } from "@/features/orders/orderSlice";

const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
};

const formatDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const day = today.getDate();
  const month = today.getMonth() + 1;
  return `Giao ${dayNames[dayOfWeek]}, trước 13h, ${day}/${month.toString().padStart(2, '0')}`;
};

const generateOrderCode = () => {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
};

// API call để lưu order code
const saveOrderToAPI = async (orderData: any) => {
  try {
    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving order:', error);
    return null;
  }
};

const OrderSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state: RootState) => state.order);
  const [orderCode, setOrderCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Nếu không có đơn hàng thì chuyển về trang chủ
    if (!currentOrder) {
      navigate("/");
      return;
    }

    // Tạo mã đơn hàng và lưu vào API
    const initializeOrder = async () => {
      const newOrderCode = generateOrderCode();
      setOrderCode(newOrderCode);
      
      // Lưu thông tin đơn hàng vào database
      const orderDataToSave = {
        ...currentOrder,
        orderCode: newOrderCode,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      const savedOrder = await saveOrderToAPI(orderDataToSave);
      if (savedOrder) {
        console.log('Order saved successfully:', savedOrder);
      }
      
      setIsLoading(false);
    };

    initializeOrder();
  }, [currentOrder, navigate]);

  const handleBackHome = () => {
    dispatch(resetOrder()); // Reset order state
    navigate("/");
  };

  const handleViewOrder = () => {
    // TODO: Implement view order detail page
    console.log("View order details");
  };

  if (!currentOrder || isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang xử lý đơn hàng...</p>
        </div>
      </div>
    );
  }

  const estimatedDelivery = formatDate();
  const mainProduct = currentOrder.products[0]; // Sản phẩm đầu tiên để hiển thị
  const hasMultipleProducts = currentOrder.products.length > 1;

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Freeship Banner */}
      <div className="w-full bg-emerald-50 text-emerald-800 text-[12px] py-1.5 text-center border-b border-emerald-100">
        Freeship đơn từ 45k, giảm nhiều hơn cùng FREESHIP XTRA
      </div>

      {/* Header với logo từ assets */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-[1040px] px-4 py-4 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img 
              src="/Order success/logo.png" 
              alt="Tiki Logo" 
              className="h-8 w-auto"
            />
            <div className="text-[12px] text-gray-500">Tốt & Nhanh</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1040px] px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-start">
          {/* Card chính */}
          <section className="rounded-xl bg-white shadow-sm overflow-hidden">
            {/* Header với gradient và mascot */}
            <div className="relative h-20 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 overflow-hidden">
              {/* Confetti effect */}
              <svg className="absolute inset-0 w-full h-full opacity-90" aria-hidden="true">
                {Array.from({ length: 30 }, (_, i) => (
                  <circle
                    key={i}
                    cx={Math.random() * 600}
                    cy={Math.random() * 80}
                    r={Math.random() * 3 + 1}
                    fill="white"
                    opacity={Math.random() * 0.8 + 0.2}
                  />
                ))}
              </svg>
              
              {/* Mascot */}
              <div className="absolute left-4 bottom-[-8px] w-16 h-16 rounded-full bg-white/90 border border-white/40 shadow-md flex items-center justify-center">
                <img 
                  src="/Order success/tiki-mascot-congrat.svg fill.png" 
                  alt="Tiki Mascot Congratulations" 
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>

            {/* Nội dung chính */}
            <div className="p-6">
              <h1 className="text-[20px] font-bold text-gray-900 mb-1">
                Yay, đặt hàng thành công!
              </h1>
              <p className="text-[13px] text-sky-700 mb-6">
                Chuẩn bị tiền mặt {formatVND(currentOrder.total)}
              </p>

            {/* Bảng thông tin thanh toán - style giống thiết kế */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="grid grid-cols-2 text-[13px]">
                <div className="px-4 py-3 bg-gray-50 text-gray-600">
                  Phương thức thanh toán
                </div>
                <div className="px-4 py-3 bg-white text-right text-gray-900">
                  {currentOrder.paymentMethod}
                </div>
              </div>
              <div className="grid grid-cols-2 text-[13px] border-t border-gray-200">
                <div className="px-4 py-3 bg-gray-50 text-gray-600">
                  Tổng cộng
                </div>
                <div className="px-4 py-3 bg-white text-right font-semibold text-gray-900">
                  {formatVND(currentOrder.total)}
                </div>
              </div>
              <div className="px-4 py-2 text-[12px] text-gray-400 bg-gray-50 border-t border-gray-200">
                (Đã bao gồm VAT nếu có)
              </div>
            </div>

              {/* Nút quay về trang chủ */}
              <button
                onClick={handleBackHome}
                className="w-full md:w-auto px-6 py-2 border border-sky-300 text-sky-700 text-[13px] rounded-md hover:bg-sky-50 transition-colors"
              >
                Quay về trang chủ
              </button>
            </div>
          </section>

          {/* Card thông tin đơn hàng bên phải */}
          <aside className="rounded-xl bg-white border border-gray-200 p-4 text-[13px] text-gray-700">
            <div className="flex items-center justify-between text-[12px] text-gray-500 mb-3">
              <div>
                Mã đơn hàng: <span className="font-semibold text-gray-800">#{orderCode}</span>
              </div>
              <button 
                onClick={handleViewOrder}
                className="text-sky-600 hover:underline"
              >
                Xem đơn hàng
              </button>
            </div>

            <div className="text-[13px] text-gray-600 mb-3">
              {estimatedDelivery}
            </div>

            {/* Hiển thị sản phẩm với ảnh thật */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                {/* Hiển thị ảnh sản phẩm thật nếu có */}
                {mainProduct.image ? (
                  <img
                    src={mainProduct.image}
                    alt={mainProduct.name}
                    className="w-9 h-12 object-cover rounded-md border border-gray-300 flex-shrink-0"
                  />
                ) : (
                  <div className="w-9 h-12 rounded-md bg-gray-200 border border-gray-300 flex items-center justify-center text-[10px] text-gray-500 flex-shrink-0">
                    IMG
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-[13px] text-gray-700 line-clamp-2">
                    {mainProduct.name}
                  </div>
                  {hasMultipleProducts && (
                    <div className="text-[12px] text-gray-500 mt-1">
                      +{currentOrder.products.length - 1} sản phẩm khác
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-10">
        <div className="mx-auto max-w-[1040px] px-4 py-8 text-[12px] text-gray-600">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a href="#" className="hover:underline">Quy chế hoạt động</a>
            <a href="#" className="hover:underline">Chính sách giải quyết khiếu nại</a>
            <a href="#" className="hover:underline">Chính sách bảo mật thanh toán</a>
            <a href="#" className="hover:underline">Chính sách bảo mật thông tin cá nhân</a>
          </div>
          <div className="text-gray-400 mt-4">
            © 2019 – Bản quyền của Công Ty Cổ Phần Tiki – Tiki.vn
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderSuccess;
