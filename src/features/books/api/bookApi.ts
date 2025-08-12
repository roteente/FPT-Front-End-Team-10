import { baseApi } from "@/core/api/baseApi";

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
  };
};

export const booksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Lấy danh sách sách; có thể thêm params page/limit sau
    getBooks: build.query<Book[], void>({
      query: () => ({
        url: "/books",
      }),
      transformResponse: (res: unknown) => {
        console.log('API Response:', res);
        return Array.isArray(res) ? (res as Book[]) : [];
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((b) => ({ type: "Book" as const, id: b.id })),
              { type: "Book" as const, id: "LIST" },
            ]
          : [{ type: "Book" as const, id: "LIST" }],
    }),

    // Lấy chi tiết một cuốn sách theo ID
    getBookById: build.query<Book, string>({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      transformResponse: (res: unknown) => {
        console.log('Book Detail API Response:', res);
        return res as Book;
      },
      providesTags: (result, error, id) => [
        { type: "Book" as const, id }
      ],
    }),
  }),
  overrideExisting: true,
});

export const { useGetBooksQuery, useGetBookByIdQuery } = booksApi;
