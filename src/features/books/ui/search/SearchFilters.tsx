import React from 'react';
import { SearchParams } from '../../api/bookApi';

interface SearchFiltersProps {
  filters: SearchParams;
  onFiltersChange: (filters: SearchParams) => void;
  totalResults?: number;
}

const PRICE_RANGES = [
  { label: 'Tất cả', min: undefined, max: undefined },
  { label: 'Dưới 100.000đ', min: 0, max: 100000 },
  { label: '100.000đ - 300.000đ', min: 100000, max: 300000 },
  { label: '300.000đ - 500.000đ', min: 300000, max: 500000 },
  { label: 'Trên 500.000đ', min: 500000, max: undefined },
];

const SORT_OPTIONS = [
  { value: 'name_asc', label: 'Tên A-Z' },
  { value: 'name_desc', label: 'Tên Z-A' },
  { value: 'price_asc', label: 'Giá thấp đến cao' },
  { value: 'price_desc', label: 'Giá cao đến thấp' },
  { value: 'rating_desc', label: 'Đánh giá cao nhất' },
  { value: 'newest_desc', label: 'Mới nhất' },
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  totalResults
}) => {
  const handlePriceRangeChange = (range: typeof PRICE_RANGES[0]) => {
    onFiltersChange({
      ...filters,
      minPrice: range.min,
      maxPrice: range.max,
    });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('_');
    onFiltersChange({
      ...filters,
      sortBy: sortBy as SearchParams['sortBy'],
      sortOrder: sortOrder as SearchParams['sortOrder'],
    });
  };

  const handleAuthorChange = (author: string) => {
    onFiltersChange({
      ...filters,
      author: author || undefined,
    });
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      q: filters.q, // Keep search query
      page: 1,
      limit: filters.limit,
    });
  };

  const getCurrentSort = () => {
    if (filters.sortBy && filters.sortOrder) {
      return `${filters.sortBy}_${filters.sortOrder}`;
    }
    return 'name_asc';
  };

  const getCurrentPriceRange = () => {
    return PRICE_RANGES.find(range => 
      range.min === filters.minPrice && range.max === filters.maxPrice
    ) || PRICE_RANGES[0];
  };

  const hasActiveFilters = () => {
    return !!(filters.author || filters.category || filters.minPrice !== undefined || filters.maxPrice !== undefined);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Bộ lọc</h3>
        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Results count */}
      {totalResults !== undefined && (
        <div className="text-sm text-gray-600 pb-4 border-b border-gray-200">
          <span className="font-medium">{totalResults}</span> kết quả
        </div>
      )}

      {/* Sort */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Sắp xếp theo
        </label>
        <select
          value={getCurrentSort()}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Khoảng giá
        </label>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, index) => (
            <label key={index} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={getCurrentPriceRange() === range}
                onChange={() => handlePriceRangeChange(range)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Author Filter */}
      <div className="space-y-3">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Tác giả
        </label>
        <input
          id="author"
          type="text"
          value={filters.author || ''}
          onChange={(e) => handleAuthorChange(e.target.value)}
          placeholder="Nhập tên tác giả..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Danh mục
        </label>
        <input
          id="category"
          type="text"
          value={filters.category || ''}
          onChange={(e) => handleCategoryChange(e.target.value)}
          placeholder="Nhập danh mục..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700">Bộ lọc đang áp dụng:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.author && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Tác giả: {filters.author}
                <button
                  onClick={() => handleAuthorChange('')}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Danh mục: {filters.category}
                <button
                  onClick={() => handleCategoryChange('')}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Giá: {getCurrentPriceRange().label}
                <button
                  onClick={() => handlePriceRangeChange(PRICE_RANGES[0])}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
