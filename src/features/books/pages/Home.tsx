import * as React from "react";
import BookCategoriesSidebar from "../../categories/containers/BookCategoriesSidebar";
import CategoryStripContainer from "../../categories/containers/CategoryStrip.container";
import { useGetBooksQuery, Book } from "../api/bookApi";

const SortBar = React.lazy(() => import("../ui/SortBar").then(m => ({ default: m.default })));
const ProductGrid = React.lazy(() => import("../sections/ProductGrid").then(m => ({ default: m.default })));
const TopSellingBooks = React.lazy(() => import("../sections/TopSellingBooks").then(m => ({ default: m.default })));
const BookCarousel = React.lazy(() => import("../sections/BookCarousel").then(m => ({ default: m.default })));

// Banner section
function BannerSection({ books = [] }: { books: Book[] }) {
  // Sắp xếp sách theo số lượng đã bán để lấy top bán chạy
  const topSellingBooks = React.useMemo(() => {
    return [...books]
      .filter(book => book.quantity_sold?.value)
      .sort((a, b) => (b.quantity_sold?.value || 0) - (a.quantity_sold?.value || 0))
      .slice(0, 3);
  }, [books]);

  // Sắp xếp sách theo giảm giá để lấy sách giảm giá nhiều nhất
  const discountedBooks = React.useMemo(() => {
    return [...books]
      .filter(book => book.original_price && book.list_price)
      .map(book => ({
        ...book,
        discountPercent: Math.round(((book.original_price || 0) - (book.list_price || 0)) / (book.original_price || 1) * 100)
      }))
      .sort((a, b) => b.discountPercent - a.discountPercent)
      .slice(0, 3);
  }, [books]);

  // Hàm lấy URL hình ảnh từ một sách
  const getBookImage = React.useCallback((book: Book) => {
    if (!book || !book.images || !book.images.length) {
      return `https://picsum.photos/276/368?random=${book.id || Math.random()}`;
    }
    
    const image = book.images[0];
    if (typeof image === 'string') {
      return image;
    }
    
    return image.thumbnail_url || 
           image.small_url || 
           image.medium_url ||
           image.base_url ||
           `https://picsum.photos/276/368?random=${book.id}`;
  }, []);

  // Hàm tính phần trăm giảm giá
  const calculateDiscount = React.useCallback((original: number | undefined, current: number | undefined) => {
    if (!original || !current || original <= current) return 0;
    return Math.round((original - current) / original * 100);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Banner 1: Top Sách Bán Chạy */}
      <div className="w-full md:w-[558px] h-[186px] rounded-[8px] border border-[#0000000D] bg-white overflow-hidden shadow-sm relative">
        {/* Logo ở giữa */}
        <div className="absolute" style={{top: '31.5px', left: '31.5px', zIndex: 5}}>
          <img 
            src="/1980_book.png" 
            alt="1980 Books Logo" 
            className="w-[123px] h-[123px] rounded-[4px] border border-[#EBEBF0] object-contain"
            onError={(e) => {
              // Fallback nếu ảnh không load được
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.classList.add('bg-[#064A30]', 'rounded-[4px]', 'w-[123px]', 'h-[123px]', 'flex', 'items-center', 'justify-center', 'border', 'border-[#EBEBF0]');
              e.currentTarget.parentElement!.innerHTML = `
                <div class="text-white text-center">
                  <div class="text-lg font-bold">1980</div>
                  <div class="text-sm font-bold">BOOKS</div>
                  <div class="text-[10px] mt-1">KHỞI NGUỒN TRI THỨC</div>
                </div>
              `;
            }}
          />
        </div>
        
        {/* Tiêu đề và thông tin */}
        <div className="absolute" style={{top: '17px', left: '203px'}}>
          <h3 className="w-[338px] h-[30px] text-lg font-medium">Top Sách Bán Chạy</h3>
          <div className="flex items-center mt-1" style={{marginTop: '4.5px'}}>
            <span className="text-[14px] text-[#808089] font-normal leading-[20px]" style={{width: '65.98px', height: '18.5px'}}>Tài trợ bởi</span>
            <span className="text-[14px] font-normal leading-[20px]" style={{width: '184.45px', height: '20px', marginLeft: '3.6px'}}>1980 Books Tại Tiki Trading <span className="text-yellow-500">5/5 ★</span></span>
          </div>
        </div>
        
        {/* Sách hiển thị */}
        <div className="absolute" style={{top: '105px', left: '203px', width: '208px', height: '64px'}}>
          <div className="flex space-x-3">
            {topSellingBooks.length > 0 ? (
              topSellingBooks.map((book, index) => {
                const discount = calculateDiscount(book.original_price, book.list_price);
                return (
                  <div key={book.id} className="relative w-[64px] h-[64px] border border-[#EBEBF0] rounded-[4px] overflow-hidden">
                    {discount > 0 && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded">
                        -{discount}%
                      </div>
                    )}
                    <img 
                      src={getBookImage(book)} 
                      alt={book.name} 
                      title={book.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://picsum.photos/64/64?random=${book.id}`;
                      }}
                    />
                  </div>
                );
              })
            ) : (
              // Placeholder khi không có dữ liệu
              Array(3).fill(0).map((_, index) => (
                <div key={`placeholder-${index}`} className="relative w-[64px] h-[64px] border border-[#EBEBF0] rounded-[4px] bg-gray-200 animate-pulse"></div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Banner 2: Bộ Sưu Tập Sách Mới Giảm Đến */}
      <div className="w-full md:w-[558px] h-[186px] rounded-[8px] border border-[#0000000D] bg-white overflow-hidden shadow-sm relative">
        {/* Logo ở giữa */}
        <div className="absolute" style={{top: '31.5px', left: '31.5px', zIndex: 5}}>
          <img 
            src="/1980_book.png" 
            alt="1980 Books Logo" 
            className="w-[123px] h-[123px] rounded-[4px] border border-[#EBEBF0] object-contain"
            onError={(e) => {
              // Fallback nếu ảnh không load được
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.classList.add('bg-[#064A30]', 'rounded-[4px]', 'w-[123px]', 'h-[123px]', 'flex', 'items-center', 'justify-center', 'border', 'border-[#EBEBF0]');
              e.currentTarget.parentElement!.innerHTML = `
                <div class="text-white text-center">
                  <div class="text-lg font-bold">1980</div>
                  <div class="text-sm font-bold">BOOKS</div>
                  <div class="text-[10px] mt-1">KHỞI NGUỒN TRI THỨC</div>
                </div>
              `;
            }}
          />
        </div>
        
        {/* Tiêu đề và thông tin */}
        <div className="absolute" style={{top: '17px', left: '203px'}}>
          <h3 className="w-[338px] h-[30px] text-lg font-medium">Bộ Sưu Tập Sách Mới Giảm Đến</h3>
          <div className="flex items-center mt-1" style={{marginTop: '4.5px'}}>
            <span className="text-[14px] text-[#808089] font-normal leading-[20px]" style={{width: '65.98px', height: '18.5px'}}>Tài trợ bởi</span>
            <span className="text-[14px] font-normal leading-[20px]" style={{width: '184.45px', height: '20px', marginLeft: '3.6px'}}>1980 Books Tại Tiki Trading <span className="text-yellow-500">5/5 ★</span></span>
          </div>
        </div>
        
        {/* Sách hiển thị */}
        <div className="absolute" style={{top: '105px', left: '203px', width: '208px', height: '64px'}}>
          <div className="flex space-x-3">
            {discountedBooks.length > 0 ? (
              discountedBooks.map((book) => (
                <div key={book.id} className="relative w-[64px] h-[64px] border border-[#EBEBF0] rounded-[4px] overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded">
                    -{book.discountPercent}%
                  </div>
                  <img 
                    src={getBookImage(book)} 
                    alt={book.name}
                    title={book.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/64/64?random=${book.id}`;
                    }}
                  />
                </div>
              ))
            ) : (
              // Placeholder khi không có dữ liệu
              Array(3).fill(0).map((_, index) => (
                <div key={`discount-placeholder-${index}`} className="relative w-[64px] h-[64px] border border-[#EBEBF0] rounded-[4px] bg-gray-200 animate-pulse"></div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('popularity');
  const [sortOrder, setSortOrder] = React.useState('desc');
  const [filters, setFilters] = React.useState({
    fastDelivery: false,
    deal: false,
    freeShip: false,
    rating: false
  });
  const { data: allBooks = [], isLoading, error } = useGetBooksQuery();
  
  // Lọc sách dựa trên các filter
  const books = React.useMemo(() => {
    if (!allBooks?.length) return [];
    
    return allBooks.filter(book => {
      // Nếu không có filter nào được chọn, trả về tất cả sách
      if (!filters.fastDelivery && !filters.deal && !filters.freeShip && !filters.rating) {
        return true;
      }
      
      let shouldInclude = true;
      
      // Filter theo giao siêu tốc
      // Mô phỏng: Sách có id chẵn sẽ có giao siêu tốc 2H
      if (filters.fastDelivery) {
        const bookId = typeof book.id === 'string' ? parseInt(book.id) : Number(book.id);
        const hasFastDelivery = bookId % 2 === 0;
        shouldInclude = shouldInclude && hasFastDelivery;
      }
      
      // Filter theo deal siêu rẻ
      // Mô phỏng: Sách có giảm giá >= 10%
      if (filters.deal && shouldInclude) {
        const originalPrice = book.original_price || 0;
        const currentPrice = book.current_seller?.price || book.list_price || 0;
        const discount = originalPrice > 0 ? ((originalPrice - currentPrice) / originalPrice) : 0;
        const hasDiscount = discount >= 0.1; // 10% discount
        shouldInclude = shouldInclude && hasDiscount;
      }
      
      // Filter theo FREESHIP XTRA
      // Mô phỏng: Sách có id chia hết cho 3 sẽ có freeship
      if (filters.freeShip && shouldInclude) {
        const bookId = typeof book.id === 'string' ? parseInt(book.id) : Number(book.id);
        const hasFreeShip = bookId % 3 === 0;
        shouldInclude = shouldInclude && hasFreeShip;
      }
      
      // Filter theo rating (từ 4 sao trở lên)
      if (filters.rating && shouldInclude) {
        shouldInclude = shouldInclude && ((book.rating_average || 0) >= 4);
      }
      
      return shouldInclude;
    });
  }, [allBooks, filters]);
  
  // Debug: log dữ liệu để kiểm tra
  React.useEffect(() => {
    console.log('Books data:', books);
    console.log('Is loading:', isLoading);
    console.log('Error:', error);
    console.log('API URL:', 'http://localhost:3000/books');
    
    // Log chi tiết từng book để kiểm tra cấu trúc images
    if (books.length > 0) {
      console.log('First book:', books[0]);
      console.log('First book images:', books[0]?.images);
    }
  }, [books, isLoading, error]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Danh mục</h2>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-2">
              <BookCategoriesSidebar
                selectedCategory={selectedCategory}
                onCategorySelect={(slug) => {
                  setSelectedCategory(slug);
                  setSidebarOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Row 1: Breadcrumb & Mobile Menu */}
        <div className="py-4 flex items-center justify-between">
          <nav className="text-sm text-slate-500 flex items-center gap-1">
            <span className="hover:underline cursor-pointer">Trang chủ</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-700">Nhà Sách Tiki</span>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Row 2: Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block" style={{ width: '240px' }}>
            <BookCategoriesSidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="space-y-6">
              {/* Title */}
              <div className="rounded-[8px] border border-[#EBEBF0] bg-white flex items-center px-4 py-4 lg:py-6">
                <h1 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-[#27272A]">Nhà Sách Tiki</h1>
              </div>

              {/* Banner */}
              <BannerSection books={books} />

              {/* Category strip */}
              <div className="rounded-[8px] border border-[#EBEBF0] bg-white p-6">
                <CategoryStripContainer
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
              </div>

              {/* Sort bar */}
              <React.Suspense fallback={<div className="rounded-[8px] border border-[#EBEBF0] bg-white p-4 h-32 animate-pulse" />}>
                <div className="rounded-[8px] border border-[#EBEBF0] bg-white p-4 lg:p-6">
                  <SortBar 
                    currentSort={sortBy}
                    currentOrder={sortOrder}
                    onSortChange={(sort, order) => {
                      setSortBy(sort);
                      setSortOrder(order);
                    }}
                    totalResults={books.length} 
                    filters={filters}
                    onFilterChange={setFilters}
                  />
                </div>
              </React.Suspense>

              {/* Product grid */}
              <React.Suspense fallback={<div className="rounded-[8px] border border-[#EBEBF0] bg-white p-4 h-96 animate-pulse" />}>
                <div className="rounded-[8px] border border-[#EBEBF0] bg-white p-4 lg:p-6">
                  {error ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="text-red-500 mb-2">⚠️ Lỗi kết nối API</div>
                      <div className="text-sm text-gray-600 mb-4">
                        Không thể kết nối tới server. Vui lòng kiểm tra:
                      </div>
                      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                        <li>Server có đang chạy trên http://localhost:3000?</li>
                        <li>Endpoint /books có tồn tại không?</li>
                        <li>CORS có được cấu hình đúng không?</li>
                      </ul>
                      <div className="mt-4 text-xs text-gray-500">
                        Error: {JSON.stringify(error)}
                      </div>
                    </div>
                  ) : (
                    <ProductGrid 
                      books={books} 
                      isLoading={isLoading} 
                      sortBy={sortBy} 
                      sortOrder={sortOrder} 
                    />
                  )}
                </div>
              </React.Suspense>
            </div>
          </main>
        </div>
      </div>

      {/* TopSellingBooks section - moved outside main content */}
      <React.Suspense fallback={<div className="bg-white border border-[#EBEBF0] h-[383px] animate-pulse mt-6" />}>
        <div className="mt-6 w-full px-4 sm:px-6 lg:px-8">
          <TopSellingBooks books={allBooks} />
        </div>
      </React.Suspense>
    </div>
  );
}
