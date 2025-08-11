import { baseApi } from '@/core/api/baseApi'
import { Paginated } from '@/core/api/types'
import { Book, BookSearchParams, Review } from '../model/types'

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], BookSearchParams>({
      query: (params) => ({
        url: '/Books',
        params,
      }),
      providesTags: ['Book'],
    }),
    
    getBookById: builder.query<Book, number>({
      query: (id) => `/Books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
    
    searchBooks: builder.query<Book[], number>({
      query: (query) => ({
        url: '/Books',
        params: { q: query },
      }),
      providesTags: ['Book'],
    }),
    
    getFeaturedBooks: builder.query<Book[], void>({
      query: () => '/Books?featured=true',
      providesTags: ['Book'],
    }),
    
    getBestSellers: builder.query<Book[], void>({
      query: () => '/Books?bestseller=true',
      providesTags: ['Book'],
    }),
    
    getNewArrivals: builder.query<Book[], void>({
      query: () => '/Books?new=true',
      providesTags: ['Book'],
    }),
    
    getBookReviews: builder.query<Paginated<Review>, { bookId: number; page?: number }>({
      query: ({ bookId, page = 1 }) => ({
        url: `/Books/${bookId}/reviews`,
        params: { page },
      }),
    }),
  }),
})

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useSearchBooksQuery,
  useGetFeaturedBooksQuery,
  useGetBestSellersQuery,
  useGetNewArrivalsQuery,
  useGetBookReviewsQuery,
} = bookApi
