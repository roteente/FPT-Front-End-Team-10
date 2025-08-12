import * as React from "react";
import SidebarCategoriesContainer from "../../categories/containers/SidebarCategories.container";
import CategoryStripContainer from "../../categories/containers/CategoryStrip.container";
import { useGetBooksQuery } from "../api/bookApi";

const SortBar = React.lazy(() => import("../ui/SortBar").then(m => ({ default: m.default })));
const ProductGrid = React.lazy(() => import("../sections/ProductGrid").then(m => ({ default: m.default })));

// Banner placeholder (đang phát triển)
function BannerPlaceholder() {
  return (
    <div className="min-h-[186px] rounded-[8px] border border-[#EBEBF0] bg-white flex items-center justify-center p-3">
      <span className="text-xs text-gray-500">Banner (đang phát triển)</span>
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { data: books = [], isLoading, error } = useGetBooksQuery();
  
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
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-4">
              <SidebarCategoriesContainer
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="space-y-6">
          {/* Title */}
          <div className="rounded-[8px] border border-[#EBEBF0] bg-white flex items-center px-4 py-4 lg:py-6">
            <h1 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-[#27272A]">Nhà Sách Tiki</h1>
          </div>

          {/* Banner */}
          <BannerPlaceholder />

          {/* Category strip */}
          <div className="rounded-[8px] border border-[#EBEBF0] bg-white p-4 lg:p-6">
            <CategoryStripContainer
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Sort bar */}
          <React.Suspense fallback={<div className="rounded-[8px] border border-[#EBEBF0] bg-white p-4 h-32 animate-pulse" />}>
            <div className="rounded-[8px] border border-[#EBEBF0] bg-white p-4 lg:p-6">
              <SortBar 
                currentSort="newest" 
                currentOrder="desc" 
                onSortChange={() => {}} 
                totalResults={books.length} 
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
                <ProductGrid books={books} isLoading={isLoading} />
              )}
            </div>
          </React.Suspense>

              {/* Top sách bán chạy */}
              <div className="rounded-[8px] border border-[#EBEBF0] bg-white p-6">
                <div className="flex items-center justify-center min-h-[200px]">
                  <span className="text-sm text-gray-500">Top sách bán chạy (đang phát triển)</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
