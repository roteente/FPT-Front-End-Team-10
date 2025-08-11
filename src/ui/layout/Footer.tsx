export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">BookStore</h3>
            <p className="text-gray-300 text-sm">
              Cửa hàng sách trực tuyến hàng đầu Việt Nam với hàng ngàn đầu sách chất lượng.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white">Trang chủ</a></li>
              <li><a href="/categories" className="text-gray-300 hover:text-white">Danh mục</a></li>
              <li><a href="/bestsellers" className="text-gray-300 hover:text-white">Sách bán chạy</a></li>
              <li><a href="/new-arrivals" className="text-gray-300 hover:text-white">Sách mới</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dịch vụ khách hàng</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/contact" className="text-gray-300 hover:text-white">Liên hệ</a></li>
              <li><a href="/shipping" className="text-gray-300 hover:text-white">Chính sách giao hàng</a></li>
              <li><a href="/returns" className="text-gray-300 hover:text-white">Đổi trả</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📧 info@bookstore.vn</p>
              <p>📞 (028) 1234 5678</p>
              <p>📍 123 Nguyễn Văn Cừ, Q.1, TP.HCM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 BookStore. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
