import { useGetBooksQuery } from '../api/bookApi'
import { ProductGrid } from '../sections/ProductGrid'

export default function Home() {
  const { data: books = [], isLoading, error } = useGetBooksQuery({})

  // Debug logging
  console.log('Home component rendered:', { books, isLoading, error })

  // Nếu có lỗi, hiển thị chi tiết
  if (error) {
    console.error('API Error:', error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Lỗi kết nối API</h1>
          <p className="text-gray-600 mb-4">Không thể tải dữ liệu từ server</p>
          <div className="text-sm text-gray-500 bg-gray-100 p-4 rounded">
            <strong>Chi tiết lỗi:</strong><br/>
            {JSON.stringify(error, null, 2)}
          </div>
          <p className="mt-4 text-sm text-blue-600">
            Hãy đảm bảo API server đang chạy tại: <strong>http://localhost:3000</strong>
          </p>
        </div>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex gap-6">
          {/* Sidebar - Khám phá theo danh mục */}
          <div className="hidden lg:block w-64 bg-white shadow-sm rounded-lg p-4 h-fit sticky top-4">
            <h3 className="font-medium text-gray-900 mb-4">Khám phá theo danh mục</h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded text-center">
                🚧 Đang phát triển
              </div>
              <div className="text-xs text-gray-400">
                • Nhà Sách Tiki<br/>
                • English Books<br/>
                • Sách tiếng Việt<br/>
                • Văn phòng phẩm<br/>
                • Dụng cụ học tập
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Banner slider */}
            <div className="bg-white rounded-lg shadow-sm mb-6 h-48 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-2">🎨</div>
                <div className="text-sm">Banner Slider</div>
                <div className="text-xs">Đang phát triển</div>
              </div>
            </div>

            {/* Khám phá section */}
            <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Khám phá theo danh mục</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'English Books', icon: '📚' },
                  { name: 'Sách tiếng Việt', icon: '📖' },
                  { name: 'Văn phòng phẩm', icon: '✏️' },
                  { name: 'Quà tặng xinh', icon: '🎁' }
                ].map((category) => (
                  <div key={category.name} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm text-gray-700">{category.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort bar placeholder */}
            <div className="bg-white rounded-lg shadow-sm mb-4 p-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Tất cả sản phẩm
              </div>
              <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded">
                Sắp xếp: Đang phát triển
              </div>
            </div>

            {/* Products grid */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              {error && (
                <div className="text-center py-8">
                  <p className="text-red-500">Có lỗi xảy ra khi tải dữ liệu</p>
                </div>
              )}
              
              <ProductGrid 
                books={books} 
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
