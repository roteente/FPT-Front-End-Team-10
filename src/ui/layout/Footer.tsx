export function Footer() {
  return (
    <footer className="bg-white border-t border-[#F2F2F2] py-8 mt-8">
      <div className="max-w-[1232px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-[15px] font-medium text-[#38383D] mb-3">Hỗ trợ khách hàng</h3>
            <div className="space-y-2">
              <p className="text-[13px] text-[#808089]">Hotline: 1800-6963</p>
              <p className="text-[13px] text-[#808089]">(1000 đ/phút, 8-21h kể cả T7, CN)</p>
              <p className="text-[13px] text-[#808089]">Các câu hỏi thường gặp</p>
              <p className="text-[13px] text-[#808089]">Gửi yêu cầu hỗ trợ</p>
              <p className="text-[13px] text-[#808089]">Phương thức vận chuyển</p>
              <p className="text-[13px] text-[#808089]">Chính sách đổi trả</p>
              <p className="text-[13px] text-[#808089]">Hướng dẫn mua hàng</p>
              <p className="text-[13px] text-[#808089]">Chính sách hàng nhập khẩu</p>
              <p className="text-[13px] text-[#808089]">Hỗ trợ khách hàng: hotro@tiki.vn</p>
              <p className="text-[13px] text-[#808089]">Báo lỗi bảo mật: security@tiki.vn</p>
            </div>
          </div>

          {/* Về Tiki */}
          <div>
            <h3 className="text-[15px] font-medium text-[#38383D] mb-3">Về Tiki</h3>
            <div className="space-y-2">
              <p className="text-[13px] text-[#808089]">Giới thiệu Tiki</p>
              <p className="text-[13px] text-[#808089]">Tiki Blog</p>
              <p className="text-[13px] text-[#808089]">Tuyển dụng</p>
              <p className="text-[13px] text-[#808089]">Chính sách bảo mật thanh toán</p>
              <p className="text-[13px] text-[#808089]">Chính sách bảo mật thông tin cá nhân</p>
              <p className="text-[13px] text-[#808089]">Chính sách giải quyết khiếu nại</p>
              <p className="text-[13px] text-[#808089]">Điều khoản sử dụng</p>
              <p className="text-[13px] text-[#808089]">Giới thiệu Tiki Xu</p>
              <p className="text-[13px] text-[#808089]">Tiếp thị liên kết cùng Tiki</p>
              <p className="text-[13px] text-[#808089]">Bán hàng doanh nghiệp</p>
              <p className="text-[13px] text-[#808089]">Điều kiện vận chuyển</p>
            </div>
          </div>

          {/* Hợp tác và liên kết */}
          <div>
            <h3 className="text-[15px] font-medium text-[#38383D] mb-3">Hợp tác và liên kết</h3>
            <div className="space-y-2">
              <p className="text-[13px] text-[#808089]">Quy chế hoạt động Sàn GDTMĐT</p>
              <p className="text-[13px] text-[#808089]">Bán hàng cùng Tiki</p>
            </div>
            
            <h3 className="text-[15px] font-medium text-[#38383D] mt-8 mb-3">Chứng nhận bởi</h3>
            <div className="flex space-x-4">
              <img src="/footer/chứng nhận.png" alt="Chứng nhận" className="h-12" />
              <img src="/footer/đã đăng kí.png" alt="Đã đăng ký" className="h-12" />
            </div>
          </div>

          {/* Phương thức thanh toán & Kết nối */}
          <div>
            <h3 className="text-[15px] font-medium text-[#38383D] mb-3">Phương thức thanh toán</h3>
            <div className="grid grid-cols-5 gap-2">
              <img src="/footer/visa.svg" alt="Visa" className="h-6" />
              <img src="/footer/jcb.svg" alt="JCB" className="h-6" />
              <img src="/footer/cash.svg" alt="Cash" className="h-6" />
              <img src="/footer/atm.svg" alt="ATM" className="h-6" />
              <img src="/footer/môm.svg" alt="MoMo" className="h-6" />
              <img src="/footer/vnpay.svg" alt="VNPay" className="h-6" />
              <img src="/footer/tragop.svg" alt="Trả góp" className="h-6" />
              <img src="/footer/thanh toán tiki.svg" alt="Tiki Pay" className="h-6" />
              <img src="/footer/vietel.svg" alt="Viettel Money" className="h-6" />
            </div>
            
            <h3 className="text-[15px] font-medium text-[#38383D] mt-8 mb-3">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4">
              <img src="/footer/facebook.svg" alt="Facebook" className="h-6" />
              <img src="/footer/youtube.svg" alt="YouTube" className="h-6" />
              <img src="/footer/zalo.svg" alt="Zalo" className="h-6" />
            </div>
            
            <h3 className="text-[15px] font-medium text-[#38383D] mt-8 mb-3">Tải ứng dụng trên điện thoại</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-2">
                <img src="/footer/tiki-qr.png" alt="QR Code" className="h-24" />
                <div className="flex flex-col space-y-2">
                  <img src="/footer/appstore.png" alt="App Store" className="h-10" />
                  <img src="/footer/ggplay.png" alt="Google Play" className="h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#F2F2F2] mt-8 pt-6">
          <div className="text-center text-[12px] text-[#808089]">
            <p className="mb-2">Trụ sở chính: Tòa nhà Viettel, Số 285, đường Cách Mạng Tháng 8, phường 12, quận 10, Thành phố Hồ Chí Minh</p>
            <p className="mb-2">Tiki nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng</p>
            <p className="mb-2">© 2022 - Bản quyền của Công ty TNHH Ti Ki - Tiki.vn</p>
          </div>
        </div>
        
        {/* Dịch vụ giao hàng */}
        <div className="mt-6 text-center">
          <div className="inline-block">
            <h3 className="text-[15px] font-medium text-[#38383D] mb-2">Dịch vụ giao hàng</h3>
            <img src="/footer/tikinow.svg" alt="TikiNOW" className="h-8 mx-auto" />
          </div>
        </div>
      </div>
    </footer>
  )
}
