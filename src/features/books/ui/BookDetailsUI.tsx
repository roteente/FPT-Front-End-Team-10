import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, ImageWithFallback, Rating } from '@/ui/primitives'
import { formatPrice } from '@/core/utils/format'
import { Book } from '../model/types'

interface BookDetailsUIProps {
  book: Book
  onAddToCart: (book: Book) => void
}

export function BookDetailsUI({ book, onAddToCart }: BookDetailsUIProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  const currentPrice = book.current_seller.price
  const originalPrice = book.original_price || book.list_price
  const discountPercent = originalPrice && currentPrice < originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0

  const publisher = book.specifications?.find(spec => spec.name === "Thông tin chung")
    ?.attributes.find(attr => attr.code === "publisher_vn" || attr.code === "manufacturer")?.value

  const imageUrl = book.images && book.images.length > 0 
    ? book.images[selectedImageIndex]?.large_url || book.images[selectedImageIndex]?.base_url
    : 'https://via.placeholder.com/400x600'

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Trang chủ</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/" className="text-blue-600 hover:underline">{book.categories.name}</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600 truncate">{book.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Column 1: Product Gallery (4/12) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={imageUrl}
                  alt={book.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {book.images && book.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {book.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded border-2 overflow-hidden ${
                        selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <ImageWithFallback
                        src={image.small_url || image.base_url}
                        alt={`${book.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Column 2: Product Information (5/12) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Title */}
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                {book.name}
              </h1>
              
              {/* Rating & Sold */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Rating rating={book.rating_average} size="sm" />
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {book.rating_average}
                  </span>
                </div>
                {book.quantity_sold && (
                  <span className="text-sm text-gray-500">
                    {book.quantity_sold.text}
                  </span>
                )}
              </div>

              {/* Product Details Table */}
              <div className="border rounded-lg">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h3 className="font-medium text-gray-900">Thông tin chi tiết</h3>
                </div>
                <div className="p-4 space-y-3">
                  {/* Author */}
                  {book.authors && book.authors.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tác giả</span>
                      <span className="text-sm font-medium text-gray-900">
                        {book.authors[0].name}
                      </span>
                    </div>
                  )}
                  
                  {/* Publisher */}
                  {publisher && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Nhà xuất bản</span>
                      <span className="text-sm font-medium text-gray-900">
                        {publisher}
                      </span>
                    </div>
                  )}
                  
                  {/* Specifications */}
                  {book.specifications?.map((spec) => 
                    spec.attributes.slice(0, 5).map((attr, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm text-gray-600">{attr.name}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {attr.value}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Short Description */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Mô tả sản phẩm</h3>
                <div className="text-sm text-gray-600 line-clamp-4">
                  {book.short_description}
                </div>
              </div>
            </div>

            {/* Column 3: Purchase Section (3/12) */}
            <div className="lg:col-span-3 space-y-4">
              {/* Store Info */}
              <div className="border rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    <span className="font-medium text-gray-900">Tiki Trading</span>
                  </div>
                  {book.current_seller.is_best_store && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      OFFICIAL
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <span className="text-sm font-medium text-gray-900 block mb-2">Số lượng</span>
                <div className="flex items-center border rounded">
                  <button className="px-3 py-2 text-gray-500 hover:bg-gray-100">-</button>
                  <input 
                    type="number" 
                    defaultValue={1} 
                    min={1}
                    className="w-12 text-center border-0 focus:ring-0 py-2"
                  />
                  <button className="px-3 py-2 text-gray-500 hover:bg-gray-100">+</button>
                </div>
              </div>

              {/* Price */}
              <div>
                <span className="text-sm text-gray-600 block mb-1">Tạm tính</span>
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-red-500">
                      {formatPrice(currentPrice).replace('₫', '')}₫
                    </span>
                    {discountPercent > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(originalPrice).replace('₫', '')}₫
                      </span>
                    )}
                  </div>
                  {discountPercent > 0 && (
                    <span className="text-xs text-red-500">
                      -{discountPercent}% {formatPrice(originalPrice - currentPrice).replace('₫', '')}₫
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => onAddToCart(book)}
                >
                  Mua ngay
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  Thêm vào giỏ
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Mua trước trả sau
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex items-center">
                  <span className="mr-1">🚚</span>
                  Được giao bởi Tiki Trading
                </div>
                <div className="flex items-center">
                  <span className="mr-1">📦</span>
                  Giao hàng tiêu chuẩn: Thứ 3, 01/04
                </div>
                <div className="flex items-center">
                  <span className="mr-1">💳</span>
                  Được hoàn tiền 200% nếu là hàng giả
                </div>
                <div className="flex items-center">
                  <span className="mr-1">↩️</span>
                  Đổi trả miễn phí trong 30 ngày. Được đổi ý
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          {/* Tab Headers */}
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'description', label: 'Mô tả sản phẩm' },
                { id: 'specifications', label: 'Thông tin chi tiết' },
                { id: 'reviews', label: 'Đánh giá' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
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
              <div className="prose max-w-none prose-sm">
                <div dangerouslySetInnerHTML={{ __html: book.description }} />
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-6">
                {book.specifications?.map((spec, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-gray-900 mb-3">{spec.name}</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {spec.attributes.map((attr, attrIndex) => (
                          <div key={attrIndex} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                            <span className="text-gray-600 text-sm">{attr.name}</span>
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
    </>
  )
}