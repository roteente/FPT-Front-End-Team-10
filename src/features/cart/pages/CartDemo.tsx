import { AddToCartButton } from '@/features/cart'

// Demo data for testing - sử dụng ID từ API thực
const sampleBooks = [
  {
    id: 1, // ID từ books API
    title: "Đời Ngắn Đừng Ngủ Dài (Tái Bản)",
    price: 57491,
    image: "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
    originalPrice: 75000
  },
  {
    id: 2, // ID từ books API
    title: "Tội Ác Và Hình Phạt (Ấn Bản Cao Cấp)",
    price: 280000,
    image: "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
    originalPrice: 350000
  },
  {
    id: 3, // ID từ books API
    title: "English Grammar In Use Book",
    price: 199000,
    image: "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
    originalPrice: 250000
  }
]

export default function CartDemo() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Demo Chức năng Giỏ hàng</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sản phẩm mẫu để test "Thêm vào giỏ"</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="aspect-[3/4] mb-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                {book.title}
              </h3>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg font-bold text-[#ff424e]">
                  {book.price.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {book.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              </div>
              
              <AddToCartButton
                bookId={book.id}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Hướng dẫn test</h2>
        <div className="space-y-2 text-gray-600">
          <p>1. <strong>Đăng nhập:</strong> Cần đăng nhập để thêm sản phẩm vào giỏ hàng</p>
          <p>2. <strong>Khởi động Backend:</strong> Đảm bảo JSON server đang chạy ở http://localhost:3000</p>
          <p>3. <strong>Thêm sản phẩm:</strong> Click vào nút "Thêm vào giỏ" của các sản phẩm trên</p>
          <p>4. <strong>Xem giỏ hàng:</strong> Click vào icon giỏ hàng ở header để xem chi tiết</p>
          <p>5. <strong>Chọn sản phẩm:</strong> Sử dụng checkbox để chọn sản phẩm muốn thanh toán</p>
          <p>6. <strong>Cập nhật số lượng:</strong> Sử dụng nút +/- để thay đổi số lượng</p>
          <p>7. <strong>Xóa sản phẩm:</strong> Click vào icon thùng rác để xóa sản phẩm</p>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2">Lưu ý quan trọng:</h3>
          <p className="text-sm text-yellow-700">
            Backend API cần chạy tại <code className="bg-yellow-100 px-1 rounded">http://localhost:3000</code> để chức năng hoạt động.
            Dữ liệu giỏ hàng sẽ được lưu trong file <code className="bg-yellow-100 px-1 rounded">api.json</code>.
          </p>
        </div>
      </div>
    </div>
  )
}
