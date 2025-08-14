import React from 'react';
import { Link } from 'react-router-dom';

interface SearchEmptyStateProps {
  query?: string;
  suggestions?: string[];
}

export const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({ 
  query, 
  suggestions = [] 
}) => {
  const defaultSuggestions = [
    'sách kinh tế', 
    'tiểu thuyết', 
    'sách thiếu nhi', 
    'sách ngoại ngữ',
    'văn học việt nam',
    'sách khoa học'
  ];

  const displaySuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions;

  return (
    <div className="text-center py-12">
      {/* Icon */}
      <div className="mb-6">
        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {query ? `Không tìm thấy kết quả cho "${query}"` : 'Không có kết quả'}
      </h3>

      {/* Description */}
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        {query 
          ? 'Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp với từ khóa của bạn.'
          : 'Thử tìm kiếm với từ khóa khác hoặc xem các gợi ý bên dưới.'
        }
      </p>

      {/* Suggestions */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Gợi ý tìm kiếm:</h4>
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {displaySuggestions.map((suggestion, index) => (
            <Link
              key={index}
              to={`/search?q=${encodeURIComponent(suggestion)}`}
              className="inline-flex items-center px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
            >
              {suggestion}
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 rounded-lg p-6 max-w-lg mx-auto">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Mẹo tìm kiếm hiệu quả:</h4>
        <ul className="text-sm text-gray-600 space-y-2 text-left">
          <li className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Kiểm tra lại chính tả từ khóa
          </li>
          <li className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Thử sử dụng từ khóa ngắn gọn hơn
          </li>
          <li className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Tìm kiếm theo tên tác giả hoặc thể loại
          </li>
          <li className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Sử dụng các bộ lọc để thu hẹp kết quả
          </li>
        </ul>
      </div>

      {/* Back to home link */}
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default SearchEmptyState;
