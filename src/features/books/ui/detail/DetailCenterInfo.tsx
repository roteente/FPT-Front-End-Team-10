import React, { useState } from 'react';
import type { Book } from '../../api/bookApi';
import { useGetBooksQuery } from '../../api/bookApi';
import RelatedProducts from './RelatedProducts';
import HotDeals from './HotDeals';

interface DetailCenterInfoProps {
  book: Book;
}

const DetailCenterInfo: React.FC<DetailCenterInfoProps> = ({ book }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data: booksData } = useGetBooksQuery();

  const getAuthorNames = () => {
    return book.authors?.map(author => author.name).join(', ') || 'Chưa có thông tin';
  };


  function formatDate(dateTimeStr: string): string {
    if (!dateTimeStr) return "";
    return dateTimeStr.split(" ")[0]; // Lấy phần trước dấu cách
  }

  // Get related products (exclude current book)
  const relatedProducts = booksData?.filter((b: Book) => b.id !== book.id) || [];

  // Get hot deals (books with high discount)
  const hotDeals = booksData?.filter((b: Book) =>
    b.id !== book.id &&
    b.original_price &&
    b.current_seller?.price &&
    ((b.original_price - b.current_seller.price) / b.original_price) > 0.2
  ) || [];



  return (
    <div className="space-y-4">
      {/* Hàng 1 - Book Title and Rating */}
      <div
        className="bg-white rounded-lg border border-gray-200 p-5 overflow-hidden"
        style={{
          width: '100%',
          borderRadius: '8px',
          opacity: 1
        }}
      >
        <div className="h-full flex flex-col justify-between">
          {/* Tác giả */}
          <div className="flex items-start gap-2 mb-3">
            <span className="text-sm text-gray-500">Tác giả:</span>
            <span className="text-sm text-blue-600 hover:underline cursor-pointer font-medium">
              {getAuthorNames()}
            </span>
          </div>

          {/* Tên sách */}
          <h1 className="text-lg font-semibold text-gray-900 mb-3 leading-6 line-clamp-2">
            {book.name}
          </h1>

          {/* Rating và lượt bán */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-orange-500">
                {book.rating_average || 4.8}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < Math.floor(book.rating_average || 4.8)
                      ? 'text-orange-400'
                      : 'text-gray-300'
                      }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            {book.quantity_sold?.text ?
              <span className="text-sm text-gray-500">
                {book.quantity_sold?.text}
              </span>
              : null}
          </div>

          {/* Price Display */}
          <div className="flex items-center gap-3">
            {book.list_price !== undefined && (
              <span className="text-3xl font-bold text-red-500">
                {book.list_price.toLocaleString()}đ
              </span>
            )}

            {book.list_price !== undefined &&
              book.original_price !== undefined &&
              book.list_price !== book.original_price && (
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-400 line-through">
                    {book.original_price.toLocaleString()}đ
                  </span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-medium">
                    -
                    {Math.round(
                      ((book.original_price - book.list_price) / book.original_price) * 100
                    )}
                    %
                  </span>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Hàng 2 - Product Information Table */}
      <div
        className="bg-white rounded-lg border border-gray-200 p-6"
        style={{
          width: '100%',
          borderRadius: '8px',
          opacity: 1
        }}
      >
        <div className="h-full flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex-shrink-0">
            Thông tin chi tiết
          </h3>
          <div className="flex-1 divide-y divide-gray-100">
            {book?.specifications?.map((spec, specIndex) =>
              spec?.attributes?.map((item, attrIndex) => (
                <div
                  key={`${specIndex}-${attrIndex}`}
                  className="flex gap-6 py-4"
                >
                  <span className="flex-1 text-sm text-gray-600 font-medium">
                    {item.name}
                  </span>
                  <span className="flex-1 text-sm text-gray-900">
                    {item.code === "publication_date"
                      ? formatDate(item.value ?? "")
                      : item.value}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Hàng 3 - Product Description */}
      <div
        className="bg-white rounded-lg border border-gray-200 p-6 overflow-hidden"
        style={{
          width: '100%',
          borderRadius: '8px',
          opacity: 1
        }}
      >
        <div className="h-full flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-5 flex-shrink-0">Mô tả sản phẩm</h3>
          <div className="flex-1 relative">
            <div
              className={`prose max-w-none text-sm text-gray-700 leading-relaxed transition-all duration-300 ${showFullDescription ? 'overflow-y-auto h-full' : 'overflow-hidden'
                }`}
              style={{
                height: showFullDescription ? 'calc(100% - 40px)' : '280px'
              }}
              dangerouslySetInnerHTML={{
                __html: book.description || book.short_description || `
                  <p>Cuốn sách sẽ giúp bạn trở nên giàu có, làm giàu cho cuộc sống của bạn trên tất cả các 
                  phương diện của cuộc sống chứ không chỉ về tài chính và vật chất.</p>
                  
                  <p>Think and grow rich – 13 nguyên tắc nghĩ giàu, làm giàu là cuốn sách "chỉ dẫn" duy 
                  nhất chỉ ra những nguồn lực bạn phải có để thành công. Mỗi chương trong cuốn sách 
                  đều dễ cập đến bí quyết kiếm tiền, từ việc có niềm tin, có mong muốn đến những kiến 
                  thức chuyên sâu, những ý tưởng, những kế hoạch, những cách đưa ra quyết định.</p>
                  
                  <p>"THINK AND GROW RICH"</p>
                  <p>Mua nó...</p>
                  <p>Bạn có một cuốn sách.</p>
                  <p>Đọc nó...</p>
                  <p>Bạn có một kế hoạch làm giàu</p>
                  <p>Làm theo kế hoạch đó...</p>
                  <p>Bạn có cả thế giới!"</p>
                  
                  <p>Theo quy luật tự nhiên, bí quyết này sẽ buộc bạn phải trả giá, nhưng cái giá phải trả 
                  thấp hơn rất nhiều so với giá trị thực sự của nó. Nó không thể được định giá bởi 
                  những người không muốn tìm kiếm nó. Bí quyết này không thể cho đi, nó không thể được 
                  mua với tiền bạc vì nó đến với những người đã sẵn sàng cho nó theo một cách rất xác định.</p>
                `
              }}
            />

            {/* Gradient overlay khi chưa mở rộng */}
            {!showFullDescription && (
              <div className="absolute bottom-12 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"></div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-white pt-3 flex-shrink-0">
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
              >
                {showFullDescription ? '▲ Thu gọn' : '▼ Xem thêm'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hàng 4 - Related Products */}
      <div
        className="bg-white rounded-lg border border-gray-200 p-6"
        style={{
          width: '100%',
          borderRadius: '8px',
          opacity: 1
        }}
      >
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Sản phẩm tương tự</h3>
          <div>
            {relatedProducts.length > 0 ? (
              <RelatedProducts products={relatedProducts} />
            ) : (
              <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                  <div className="text-5xl mb-4 opacity-50">📚</div>
                  <p className="text-lg text-gray-500 mb-2 font-medium">Đang tải sản phẩm...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hàng 5 - Hot Deals */}
      <div
        className="bg-white rounded-lg border border-gray-200 p-6"
        style={{
          width: '100%',
          borderRadius: '8px',
          opacity: 1
        }}
      >
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <span>🔥</span>
            <span>Deal Hot</span>
          </h3>
          <div>
            {hotDeals.length > 0 ? (
              <HotDeals deals={hotDeals} />
            ) : (
              <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                  <div className="text-5xl mb-4 opacity-50">🔥</div>
                  <p className="text-lg text-gray-500 mb-2 font-medium">Đang tải deal hot...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCenterInfo;
