import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { useSearchBooksQuery, SearchParams } from '../api/bookApi';
import BookCategoriesSidebar from '../../categories/containers/BookCategoriesSidebar';
import SearchBreadcrumb from '../ui/search/SearchBreadcrumb';

// Lazy load components
const SortBar = React.lazy(() => import("../ui/SortBar").then(m => ({ default: m.default })));
const ProductGrid = React.lazy(() => import("../sections/ProductGrid").then(m => ({ default: m.default })));

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // State cho sorting và filtering
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filters, setFilters] = useState({
    fastDelivery: false,
    deal: false,
    freeShip: false,
    rating: false
  });

  // State cho filters từ search
  const [searchFilters, setSearchFilters] = useState<SearchParams>({
    q: query,
    page: 1,
    limit: 20, // Hiển thị nhiều sản phẩm hơn trên grid
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cập nhật filters khi URL thay đổi
  useEffect(() => {
    const newQuery = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const sortByParam = searchParams.get('sortBy') as SearchParams['sortBy'] || 'name';
    const sortOrderParam = searchParams.get('sortOrder') as SearchParams['sortOrder'] || 'asc';
    const author = searchParams.get('author') || undefined;
    const category = searchParams.get('category') || undefined;
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;

    setSearchFilters({
      q: newQuery,
      page,
      limit: 20,
      sortBy: sortByParam,
      sortOrder: sortOrderParam,
      author,
      category,
      minPrice,
      maxPrice
    });

    setSortBy(sortByParam);
    setSortOrder(sortOrderParam);
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // API call
  const { 
    data: searchResponse, 
    isLoading, 
    error 
  } = useSearchBooksQuery(searchFilters, {
    skip: !searchFilters.q && !searchFilters.author && !searchFilters.category
  });

  // Handle sort change
  const handleSortChange = (sort: string, order: string) => {
    setSortBy(sort);
    setSortOrder(order as 'asc' | 'desc');
    
    const newFilters = {
      ...searchFilters,
      sortBy: sort as SearchParams['sortBy'],
      sortOrder: order as SearchParams['sortOrder'],
      page: 1
    };
    setSearchFilters(newFilters);
    updateURL(newFilters);
  };

  // Handle category select
  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const newFilters = {
      ...searchFilters,
      category: categorySlug || undefined,
      page: 1
    };
    setSearchFilters(newFilters);
    updateURL(newFilters);
    setSidebarOpen(false);
  };

  // Handle filters change from SortBar
  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    // Có thể thêm logic để áp dụng filters vào searchFilters nếu cần
  };

  // Generate filter tags
  const getFilterTags = () => {
    const tags: Array<{
      id: string;
      label: string;
      value: string;
      type: 'category' | 'author' | 'price' | 'query';
    }> = [];

    if (searchFilters.q) {
      tags.push({
        id: 'query',
        label: 'Từ khóa',
        value: searchFilters.q,
        type: 'query'
      });
    }

    if (searchFilters.category) {
      tags.push({
        id: 'category',
        label: 'Danh mục',
        value: searchFilters.category,
        type: 'category'
      });
    }

    if (searchFilters.author) {
      tags.push({
        id: 'author',
        label: 'Tác giả',
        value: searchFilters.author,
        type: 'author'
      });
    }

    if (searchFilters.minPrice !== undefined || searchFilters.maxPrice !== undefined) {
      const minPrice = searchFilters.minPrice || 0;
      const maxPrice = searchFilters.maxPrice;
      const priceRange = maxPrice 
        ? `${minPrice.toLocaleString()}đ - ${maxPrice.toLocaleString()}đ`
        : `Từ ${minPrice.toLocaleString()}đ`;
      
      tags.push({
        id: 'price',
        label: 'Khoảng giá',
        value: priceRange,
        type: 'price'
      });
    }

    return tags;
  };

  // Handle remove filter tag
  const handleRemoveTag = (tagId: string) => {
    const newFilters = { ...searchFilters };
    
    switch (tagId) {
      case 'query':
        newFilters.q = '';
        break;
      case 'category':
        newFilters.category = undefined;
        setSelectedCategory('');
        break;
      case 'author':
        newFilters.author = undefined;
        break;
      case 'price':
        newFilters.minPrice = undefined;
        newFilters.maxPrice = undefined;
        break;
    }

    newFilters.page = 1;
    setSearchFilters(newFilters);
    updateURL(newFilters);
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    const newFilters: SearchParams = {
      page: 1,
      limit: 20,
      sortBy: 'name',
      sortOrder: 'asc'
    };
    
    setSearchFilters(newFilters);
    setSelectedCategory('');
    updateURL(newFilters);
  };

  // Update URL helper
  const updateURL = (newFilters: SearchParams) => {
    const params = new URLSearchParams();
    
    if (newFilters.q) params.set('q', newFilters.q);
    if (newFilters.page && newFilters.page > 1) params.set('page', newFilters.page.toString());
    if (newFilters.sortBy && newFilters.sortBy !== 'name') params.set('sortBy', newFilters.sortBy);
    if (newFilters.sortOrder && newFilters.sortOrder !== 'asc') params.set('sortOrder', newFilters.sortOrder);
    if (newFilters.author) params.set('author', newFilters.author);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.minPrice !== undefined) params.set('minPrice', newFilters.minPrice.toString());
    if (newFilters.maxPrice !== undefined) params.set('maxPrice', newFilters.maxPrice.toString());
    
    setSearchParams(params);
  };

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
                onCategorySelect={handleCategorySelect}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-6 space-y-6">
          {/* Breadcrumb */}
          <SearchBreadcrumb 
            query={query}
            category={selectedCategory}
          />

          {/* Error handling */}
          {error && (
            <div className="rounded-[8px] border border-red-200 bg-red-50 p-6">
              <div className="flex items-center">
                <div className="text-red-600 text-lg mr-3">⚠️</div>
                <div>
                  <h3 className="text-red-800 font-semibold">Lỗi tìm kiếm</h3>
                  <p className="text-red-700 text-sm mt-1">
                    Không thể tải kết quả tìm kiếm. Vui lòng thử lại sau.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mobile menu button for sidebar */}
            <div className="lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 mb-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block" style={{width: '240px'}}>
              <BookCategoriesSidebar
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <div className="space-y-6">
                {/* Sort bar */}
                <React.Suspense fallback={<div className="rounded-[8px] border border-[#EBEBF0] bg-white p-4 h-32 animate-pulse" />}>
                  <div className="rounded-[8px] border border-[#EBEBF0] bg-white p-4 lg:p-6">
                    <SortBar 
                      currentSort={sortBy}
                      currentOrder={sortOrder}
                      onSortChange={handleSortChange}
                      totalResults={searchResponse?.total} 
                      filters={filters}
                      onFilterChange={handleFiltersChange}
                    />
                  </div>
                </React.Suspense>

                {/* Product grid */}
                <React.Suspense fallback={
                  <div className="rounded-[8px] border border-[#EBEBF0] bg-white p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="w-full rounded-[8px] bg-white border border-gray-200 overflow-hidden animate-pulse">
                          <div className="aspect-[3/4] bg-gray-200"></div>
                          <div className="p-4 space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }>
                  <div className="rounded-[8px] border border-[#EBEBF0] bg-white p-6">
                    {!query && !searchFilters.author && !searchFilters.category && !isLoading ? (
                      // Empty state for no query
                      <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          Tìm kiếm sách yêu thích
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Nhập từ khóa trong thanh tìm kiếm để bắt đầu
                        </p>
                        <div className="text-sm text-gray-600">
                          <p>Bạn có thể tìm kiếm theo:</p>
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Tên sách</li>
                            <li>Tên tác giả</li>
                            <li>Mô tả sách</li>
                            <li>Danh mục</li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <ProductGrid
                        books={searchResponse?.books || []}
                        isLoading={isLoading}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        searchQuery={query}
                        showEmptyState={true}
                      />
                    )}
                  </div>
                </React.Suspense>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
