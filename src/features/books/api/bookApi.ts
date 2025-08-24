import { baseApi } from "@/core/api/baseApi";
import { mockBooks, createBookWithDefaults } from '../data/mockBooks';

// Kiểu dữ liệu đầy đủ cho Book
export type Book = {
  id: number | string;
  name: string;
  rating_average?: number;
  short_description?: string;
  description?: string;
  original_price?: number;
  list_price?: number;
  current_seller: {
    id?: number | string;
    name?: string;
    price: number;
    is_best_store?: boolean;
  };
  quantity_sold?: { value?: number; text?: string };
  // Hỗ trợ nhiều format ảnh khác nhau
  images?: Array<{
    base_url?: string;
    medium_url?: string;
    thumbnail_url?: string;
    small_url?: string;
    large_url?: string;
    url?: string;
  }> | Array<string>;
  book_cover?: string;
  thumbnail?: string;
  publisher?: string;
  publication_date?: string;
  page_count?: number;
  dimensions?: string;
  specifications?: Array<{
    name?: string;
    attributes?: Array<{ 
      code?: string; 
      name?: string;
      value?: string;
    }>;
  }>;
  authors?: Array<{
    id?: number | string;
    name?: string;
  }>;
  categories?: {
    id?: number | string;
    name?: string;
    is_leaf?: boolean;
  };
};

// Kiểu dữ liệu cho search parameters
export interface SearchParams {
  q?: string; // search query
  category?: string; // category filter
  author?: string; // author filter
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Kiểu dữ liệu cho search response
export interface SearchResponse {
  books: Book[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const booksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Lấy danh sách sách; có thể thêm params page/limit sau
    getBooks: build.query<Book[], void>({
      query: () => {
        console.log('API Query - All Books URL:', '/books');
        return {
          url: "/books",
        };
      },
      transformResponse: (res: unknown) => {
        console.log('All Books API Response:', res);
        
        // Handle empty response hoặc lỗi API
        if (!res) {
          console.warn('API returned empty response, using fallback data');
          return mockBooks;
        }
        
        if (Array.isArray(res)) {
          // Ensure all books have required fields
          return (res as any[]).map(book => createBookWithDefaults(book));
        }
        
        // Nếu response có structure khác (ví dụ: { data: [...] })
        if (typeof res === 'object' && 'data' in res) {
          const data = (res as any).data;
          if (Array.isArray(data)) {
            return data.map(book => createBookWithDefaults(book));
          }
        }
        
        console.warn('Unexpected API response format, using fallback:', res);
        return mockBooks;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((b) => ({ type: "Book" as const, id: b.id })),
              { type: "Book" as const, id: "LIST" },
            ]
          : [{ type: "Book" as const, id: "LIST" }],
    }),

    // Tìm kiếm sách với các bộ lọc
    searchBooks: build.query<SearchResponse, SearchParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        
        // Xây dựng query parameters
        if (params.q) {
          searchParams.append('q', params.q);
        }
        if (params.category) {
          searchParams.append('category', params.category);
        }
        if (params.author) {
          searchParams.append('author', params.author);
        }
        if (params.minPrice !== undefined) {
          searchParams.append('minPrice', params.minPrice.toString());
        }
        if (params.maxPrice !== undefined) {
          searchParams.append('maxPrice', params.maxPrice.toString());
        }
        if (params.sortBy) {
          searchParams.append('_sort', params.sortBy);
        }
        if (params.sortOrder) {
          searchParams.append('_order', params.sortOrder);
        }
        if (params.page) {
          searchParams.append('_page', params.page.toString());
        }
        if (params.limit) {
          searchParams.append('_limit', params.limit.toString());
        }

        const url = `/books?${searchParams.toString()}`;
        console.log('Search API Query URL:', url);
        
        return {
          url,
        };
      },
      transformResponse: (response: unknown, meta, arg) => {
        console.log('Search API Response:', response);
        console.log('Search API Meta:', meta);
        
        let books: Book[] = [];
        let total = 0;
        
        if (Array.isArray(response)) {
          books = (response as any[]).map(book => createBookWithDefaults(book));
          // Nếu có search query, lọc theo tên sách, tác giả, mô tả
          if (arg.q) {
            const query = arg.q.toLowerCase();
            books = books.filter(book => 
              book.name.toLowerCase().includes(query) ||
              book.description?.toLowerCase().includes(query) ||
              book.short_description?.toLowerCase().includes(query) ||
              book.authors?.some(author => 
                author.name?.toLowerCase().includes(query)
              )
            );
          }
          
          // Lọc theo category
          if (arg.category) {
            books = books.filter(book => 
              book.categories?.name?.toLowerCase().includes(arg.category!.toLowerCase())
            );
          }
          
          // Lọc theo tác giả
          if (arg.author) {
            books = books.filter(book => 
              book.authors?.some(author => 
                author.name?.toLowerCase().includes(arg.author!.toLowerCase())
              )
            );
          }
          
          // Lọc theo giá
          if (arg.minPrice !== undefined) {
            books = books.filter(book => 
              (book.current_seller?.price || 0) >= arg.minPrice!
            );
          }
          if (arg.maxPrice !== undefined) {
            books = books.filter(book => 
              (book.current_seller?.price || 0) <= arg.maxPrice!
            );
          }
          
          total = books.length;
          
          // Sắp xếp
          if (arg.sortBy) {
            books.sort((a, b) => {
              let valueA: any, valueB: any;
              
              switch (arg.sortBy) {
                case 'name':
                  valueA = a.name.toLowerCase();
                  valueB = b.name.toLowerCase();
                  break;
                case 'price':
                  valueA = a.current_seller?.price || 0;
                  valueB = b.current_seller?.price || 0;
                  break;
                case 'rating':
                  valueA = a.rating_average || 0;
                  valueB = b.rating_average || 0;
                  break;
                case 'newest':
                  valueA = a.id;
                  valueB = b.id;
                  break;
                default:
                  valueA = a.name.toLowerCase();
                  valueB = b.name.toLowerCase();
              }
              
              if (arg.sortOrder === 'desc') {
                return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
              }
              return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            });
          }
          
          // Phân trang
          const page = arg.page || 1;
          const limit = arg.limit || 12;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          
          books = books.slice(startIndex, endIndex);
        } else {
          // Fallback to mock data if API fails
          console.warn('Search API returned non-array response, using fallback data');
          books = mockBooks;
          total = books.length;
          
          // Apply same filtering and pagination to mock data
          if (arg.q) {
            const query = arg.q.toLowerCase();
            books = books.filter(book => 
              book.name.toLowerCase().includes(query) ||
              book.description?.toLowerCase().includes(query) ||
              book.short_description?.toLowerCase().includes(query) ||
              book.authors?.some(author => 
                author.name?.toLowerCase().includes(query)
              )
            );
          }
          
          // Phân trang cho mock data
          const page = arg.page || 1;
          const limit = arg.limit || 12;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          books = books.slice(startIndex, endIndex);
          total = mockBooks.length;
        }
        
        const result: SearchResponse = {
          books,
          total,
          page: arg.page || 1,
          limit: arg.limit || 12,
          totalPages: Math.ceil(total / (arg.limit || 12))
        };
        
        console.log('Search API Transformed Response:', result);
        return result;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.books.map((b) => ({ type: "Book" as const, id: b.id })),
              { type: "Book" as const, id: "SEARCH" },
            ]
          : [{ type: "Book" as const, id: "SEARCH" }],
    }),

    // Lấy chi tiết một cuốn sách theo ID
    getBookById: build.query<Book, string>({
      query: (id) => {
        console.log('API Query - Book ID:', id);
        console.log('API Query - URL:', `/books/${id}`);
        return {
          url: `/books/${id}`,
        };
      },
      transformResponse: (res: unknown, meta, arg) => {
        console.log('Book Detail API Response:', res);
        
        if (res && typeof res === 'object') {
          return createBookWithDefaults(res as any);
        }
        
        // Fallback to mock data
        console.warn('Book detail API failed, using mock data for ID:', arg);
        const mockBook = mockBooks.find(book => book.id.toString() === arg);
        return mockBook || createBookWithDefaults({ id: arg, name: "Sách không tìm thấy" });
      },
      providesTags: (result, error, id) => [
        { type: "Book" as const, id }
      ],
    }),
  }),
  overrideExisting: true,
});

export const { useGetBooksQuery, useSearchBooksQuery, useGetBookByIdQuery } = booksApi;
