import React from 'react';
import { Link } from 'react-router-dom';

interface SearchBreadcrumbProps {
  query?: string;
  category?: string;
}

export const SearchBreadcrumb: React.FC<SearchBreadcrumbProps> = ({
  query,
  category
}) => {
  return (
    <div className="flex items-center text-sm text-gray-600 mb-4">
      <Link to="/" className="hover:text-blue-600 transition-colors">
        Trang chủ
      </Link>
      <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      
      {category ? (
        <>
          <span className="text-gray-900">Kết quả tìm kiếm "{query}"</span>
          <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900">{category}</span>
        </>
      ) : query ? (
        <span className="text-gray-900">Kết quả tìm kiếm "{query}"</span>
      ) : (
        <span className="text-gray-900">Tìm kiếm</span>
      )}
    </div>
  );
};

export default SearchBreadcrumb;
