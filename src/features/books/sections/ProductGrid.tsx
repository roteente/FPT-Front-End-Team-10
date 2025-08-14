import * as React from "react";
import BookCard from "../ui/BookCard";
import SearchEmptyState from "../ui/search/SearchEmptyState";
import type { Book } from "../api/bookApi";

type Props = {
  books: Book[];
  isLoading?: boolean;
  sortBy?: string;
  sortOrder?: string;
  searchQuery?: string; // Thêm prop cho search query
  showEmptyState?: boolean; // Thêm prop để control empty state
};

export default function ProductGrid({ 
  books, 
  isLoading, 
  sortBy = 'popularity', 
  sortOrder = 'desc',
  searchQuery,
  showEmptyState = false
}: Props) {
  // Sort books based on sortBy and sortOrder
  const sortedBooks = React.useMemo(() => {
    if (!books?.length) return [];
    
    const booksCopy = [...books];
    
    switch (sortBy) {
      case 'popularity':
        return booksCopy.sort((a, b) => {
          const aSold = a.quantity_sold?.value || 0;
          const bSold = b.quantity_sold?.value || 0;
          return sortOrder === 'desc' ? bSold - aSold : aSold - bSold;
        });
      
      case 'newest':
        // Assuming id is incremental and newer books have higher ids
        return booksCopy.sort((a, b) => {
          const aId = typeof a.id === 'string' ? parseInt(a.id) : Number(a.id);
          const bId = typeof b.id === 'string' ? parseInt(b.id) : Number(b.id);
          return sortOrder === 'desc' ? bId - aId : aId - bId;
        });
      
      case 'price':
        return booksCopy.sort((a, b) => {
          const aPrice = a.current_seller?.price || 0;
          const bPrice = b.current_seller?.price || 0;
          return sortOrder === 'desc' ? bPrice - aPrice : aPrice - bPrice;
        });
        
      default:
        return booksCopy;
    }
  }, [books, sortBy, sortOrder]);
  
  // Preload ảnh cho sản phẩm đầu tiên (above the fold)
  React.useEffect(() => {
    if (sortedBooks?.length > 0) {
      sortedBooks.slice(0, 4).forEach((book) => {
        if (book.images?.[0]) {
          const img = new Image();
          const firstImage = book.images[0];
          
          if (typeof firstImage === 'string') {
            img.src = firstImage;
          } else if (typeof firstImage === 'object') {
            img.src = firstImage.thumbnail_url || 
                      firstImage.small_url || 
                      firstImage.medium_url ||
                      firstImage.base_url ||
                      `https://picsum.photos/276/368?random=${book.id}`;
          }
        }
      });
    }
  }, [sortedBooks]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-full rounded-[8px] bg-white border border-gray-200 overflow-hidden animate-pulse">
            {/* Skeleton content */}
            <div className="aspect-[3/4] bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!books?.length) {
    if (showEmptyState) {
      return <SearchEmptyState query={searchQuery} />;
    }
    return <div className="text-sm text-gray-500">Chưa có sản phẩm.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-5">
      {sortedBooks.slice(0, 12).map((b, index) => (
        <div 
          key={String(b.id)} 
          className="w-full flex animate-fade-in"
          style={{
            // Staggered animation cho smooth loading
            animationDelay: `${index * 100}ms`
          }}
        >
          <BookCard book={b} />
        </div>
      ))}
    </div>
  );
}
