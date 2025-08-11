import { baseApi } from '@/features/api/baseApi'

export type Book = {
  id: number
  title: string
  author: string
  images: string[]
  price: number
  salePrice?: number
  categoryId: number
  rating?: number
  sold?: number
  description?: string
}

export type BooksQuery = {
  page?: number
  limit?: number
  q?: string
  categoryId?: number
  sort?: 'price' | 'rating' | 'sold'
  order?: 'asc' | 'desc'
}

// ---- RAW types khớp với dữ liệu bạn đang có ----
type TikiImage = {
  large_url?: string
  base_url?: string
  medium_url?: string
  small_url?: string
  thumbnail_url?: string
}

type TikiBookRaw = {
  id: number
  name?: string
  authors?: { name?: string }[]
  categories?: { id?: number; name?: string }
  images?: TikiImage[] | TikiImage
  current_seller?: { price?: number }
  price?: number
  original_price?: number
  list_price?: number
  rating_average?: number
  quantity_sold?: { value?: number }
  description?: string
}

// ---- helpers ----
const stripHtml = (html?: string) => (html || '').replace(/<[^>]+>/g, '').trim()

const firstImageUrl = (r: TikiBookRaw) => {
  const arr = Array.isArray(r.images) ? r.images : r.images ? [r.images] : []
  for (const i of arr) {
    const u =
      i.large_url || i.base_url || i.medium_url || i.small_url || i.thumbnail_url
    if (u) return u
  }
  return ''
}

const mapToBook = (r: TikiBookRaw): Book => {
  const sale = r.current_seller?.price
  const base = r.original_price ?? r.list_price ?? r.price ?? sale ?? 0
  const img = firstImageUrl(r)

  return {
    id: r.id,
    title: r.name || 'Không tiêu đề',
    author: r.authors?.[0]?.name || 'Khác',
    images: img ? [img] : [],
    price: Number(base) || 0,
    salePrice: sale && sale !== base ? Number(sale) : undefined,
    categoryId: Number(r.categories?.id ?? 0),
    rating: r.rating_average,
    sold: r.quantity_sold?.value,
    description: stripHtml(r.description),
  }
}

// ---- RTK Query endpoints ----
export const bookApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getBooks: b.query<{ items: Book[]; total: number }, BooksQuery>({
      query: ({ page = 1, limit = 24, categoryId, q, sort, order = 'desc' }) => ({
        url: '/books',
        params: {
          _page: page,
          _limit: limit,
          // categories nằm trong object -> filter theo path
          ...(categoryId ? { 'categories.id': categoryId } : {}),
          ...(q ? { q } : {}),
          ...(sort ? { _sort: sort, _order: order } : {}),
        },
      }),
      transformResponse: (res: TikiBookRaw[], meta: any) => ({
        items: (res || []).map(mapToBook),
        total: Number(meta?.response?.headers.get('X-Total-Count') ?? res?.length ?? 0),
      }),
      providesTags: ['Books'],
    }),

    getBook: b.query<Book, number>({
      query: (id) => `/books/${id}`,
      transformResponse: (r: TikiBookRaw) => mapToBook(r),
      providesTags: (_r, _e, id) => [{ type: 'Books' as const, id }],
    }),
  }),
})

export const { useGetBooksQuery, useGetBookQuery } = bookApi
