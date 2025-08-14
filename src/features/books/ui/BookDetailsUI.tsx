import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, ImageWithFallback, Rating } from '@/ui/primitives'
import { formatPrice } from '@/core/utils/format'
import { Book } from '../api/bookApi'
import BookDetailRightImageSlider from '../containers/BookDetailRightImageSlider'
interface BookDetailsUIProps {
  book: Book
  onAddToCart: (book: Book) => void
}

export function BookDetailsUI({ book, onAddToCart }: BookDetailsUIProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [quantity, setQuantity] = useState(1)

  const currentPrice = book.current_seller?.price || 0
  const originalPrice = book.original_price || book.list_price || 0
  const discountPercent = originalPrice && currentPrice < originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0

  const imageUrl = book.images && book.images.length > 0
    ? book.images[selectedImageIndex]?.large_url || book.images[selectedImageIndex]?.medium_url || book.images[selectedImageIndex]?.base_url
    : 'https://via.placeholder.com/400x600'

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }
// Fake data
const fakeBookData = {
  BookName: "The Great Adventure",
  BookImages: [
    {
      large_url: "https://picsum.photos/id/1015/1200/1600",
      medium_url: "https://picsum.photos/id/1015/600/800",
      base_url: "https://picsum.photos/id/1015/300/400",
    },
    {
      large_url: "https://picsum.photos/id/1025/1200/1600",
      medium_url: "https://picsum.photos/id/1025/600/800",
      base_url: "https://picsum.photos/id/1025/300/400",
    },
    {
      large_url: "https://picsum.photos/id/1035/1200/1600",
      medium_url: "https://picsum.photos/id/1035/600/800",
      base_url: "https://picsum.photos/id/1035/300/400",
    },
    {
      large_url: "https://picsum.photos/id/1045/1200/1600",
      medium_url: "https://picsum.photos/id/1045/600/800",
      base_url: "https://picsum.photos/id/1045/300/400",
    },
    {
      large_url: "https://picsum.photos/id/1055/1200/1600",
      medium_url: "https://picsum.photos/id/1055/600/800",
      base_url: "https://picsum.photos/id/1055/300/400",
    },
  ],
};
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-[1392px] mx-auto px-6 py-3">
          <nav className="text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Trang chủ</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/" className="text-blue-600 hover:underline">
              {book.categories?.name || 'Sách'}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600 truncate">{book.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1392px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Product Images */}
          {/* <div className="lg:col-span-5">
            <div className="bg-white rounded-lg p-6"> */}
              {/* Main Image */}
              {/* <div className="aspect-[3/4] bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden border">
                <ImageWithFallback
                  src={imageUrl}
                  alt={book.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div> */}

              {/* Thumbnail Images */}
              {/* {book.images && book.images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {book.images.slice(0, 5).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-20 rounded border-2 overflow-hidden ${selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                        }`}
                    >
                      <ImageWithFallback
                        src={image.small_url || image.thumbnail_url || image.base_url}
                        alt={`${book.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div> */}
          {/* </div> */}

          <BookDetailRightImageSlider
            BookName={fakeBookData.BookName}
            BookImages={fakeBookData.BookImages}
          />

          {/* Right Column: Product Info & Purchase */}
          <div className="lg:col-span-7 space-y-6">

            {/* Product Title & Rating */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">T</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">Tiki Trading</span>
                    {book.current_seller?.is_best_store && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        OFFICIAL
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    Giao bởi Tiki • Freeship 0₫
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {book.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Rating rating={book.rating_average || 0} size="sm" />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {book.rating_average || 0}
                  </span>
                </div>
                <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                  (Xem 1,234 đánh giá)
                </span>
                {book.quantity_sold && (
                  <span className="text-sm text-gray-500">
                    | {book.quantity_sold.text}
                  </span>
                )}
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-red-500">
                    {currentPrice.toLocaleString()}₫
                  </span>
                  {discountPercent > 0 && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        {originalPrice.toLocaleString()}₫
                      </span>
                      <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded">
                        -{discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                {discountPercent > 0 && (
                  <div className="text-sm text-red-500">
                    Tiết kiệm: {(originalPrice - currentPrice).toLocaleString()}₫
                  </div>
                )}
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Số lượng:</span>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-0 focus:ring-0 h-8"
                      min={1}
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Tạm tính: <strong className="text-red-500">{(currentPrice * quantity).toLocaleString()}₫</strong>
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white h-12"
                    onClick={() => onAddToCart(book)}
                  >
                    Chọn mua
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 border-blue-500 text-blue-600 hover:bg-blue-50 h-12"
                  >
                    ♡
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 h-12"
                >
                  Mua trước trả sau 0%
                </Button>
              </div>

              {/* Shipping & Policy Info */}
              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🚚</span>
                  <span>Giao siêu tốc 2h, hoặc giao tiêu chuẩn từ 3 - 5 ngày</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📦</span>
                  <span>Đóng gói cẩn thận, giao hàng toàn quốc</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">↩️</span>
                  <span>Đổi trả trong 30 ngày nếu sản phẩm lỗi</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">💳</span>
                  <span>Hoàn 200% nếu hàng giả, nhận hàng trong 1h nếu đặt trước 11h</span>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Thông tin sản phẩm</h3>
              <div className="space-y-3">
                {/* Author */}
                {book.authors && book.authors.length > 0 && (
                  <div className="flex py-2 border-b border-gray-100">
                    <span className="w-32 text-sm text-gray-600">Tác giả</span>
                    <span className="flex-1 text-sm font-medium">
                      {book.authors[0].name}
                    </span>
                  </div>
                )}

                {/* Specifications */}
                {book.specifications?.map((spec) =>
                  spec.attributes?.slice(0, 8).map((attr, index) => (
                    <div key={index} className="flex py-2 border-b border-gray-100">
                      <span className="w-32 text-sm text-gray-600">
                        {attr.name || attr.code}
                      </span>
                      <span className="flex-1 text-sm font-medium">
                        {attr.value}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-6 bg-white rounded-lg">
          {/* Tab Headers */}
          <div className="border-b">
            <nav className="flex px-6">
              {[
                { id: 'description', label: 'Mô tả sản phẩm' },
                { id: 'specifications', label: 'Thông tin chi tiết' },
                { id: 'reviews', label: 'Đánh giá' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                {book.description ? (
                  <div dangerouslySetInnerHTML={{ __html: book.description }} />
                ) : (
                  <p className="text-gray-600">{book.short_description}</p>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-6">
                {book.specifications?.map((spec, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900 mb-3">{spec.name}</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {spec.attributes?.map((attr, attrIndex) => (
                          <div key={attrIndex} className="flex justify-between py-2">
                            <span className="text-gray-600 text-sm">
                              {attr.name || attr.code}
                            </span>
                            <span className="font-medium text-sm">{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đánh giá</h3>
                <p className="text-gray-500 mb-6">Hãy là người đầu tiên đánh giá sản phẩm này</p>
                <Button variant="outline" size="md">
                  Viết đánh giá
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}