import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery } from '../../../features/books/api/bookApi';

interface SearchSuggestionsProps {
  query: string;
  isVisible: boolean;
  onSuggestionClick: (suggestion: string) => void;
  onClose: () => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  isVisible,
  onSuggestionClick,
  onClose
}) => {
  const navigate = useNavigate();
  const { data: books = [] } = useGetBooksQuery();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Generate suggestions based on query
  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const queryLower = query.toLowerCase();
    const bookSuggestions: string[] = [];
    const authorSuggestions: string[] = [];
    
    books.forEach(book => {
      // Book name suggestions
      if (book.name.toLowerCase().includes(queryLower)) {
        bookSuggestions.push(book.name);
      }
      
      // Author suggestions
      book.authors?.forEach(author => {
        if (author.name && author.name.toLowerCase().includes(queryLower)) {
          if (!authorSuggestions.includes(author.name)) {
            authorSuggestions.push(author.name);
          }
        }
      });
    });

    // Combine and limit suggestions
    const allSuggestions = [
      ...bookSuggestions.slice(0, 5),
      ...authorSuggestions.slice(0, 3)
    ].slice(0, 6);

    setSuggestions(allSuggestions);
  }, [query, books]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <div
      ref={suggestionRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
    >
      <div className="py-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="truncate">{suggestion}</span>
          </button>
        ))}
        
        {/* View all results */}
        <div className="border-t border-gray-100 mt-2 pt-2">
          <button
            onClick={() => {
              onSuggestionClick(query);
              navigate(`/search?q=${encodeURIComponent(query)}`);
            }}
            className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Xem tất cả kết quả cho "{query}"
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
