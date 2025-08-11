export interface Book {
  id: string
  name: string
  authors?: Array<{
    id: number
    name: string
    slug: string
  }>
  current_seller: {
    price: number
    name: string
    is_best_store: boolean
  }
  list_price: number
  original_price: number
  categories: {
    id: number
    name: string
    is_leaf: boolean
  }
  images: Array<{
    base_url: string
    large_url: string
    medium_url: string
    small_url: string
    thumbnail_url: string
  }>
  rating_average: number
  quantity_sold?: {
    text: string
    value: number
  }
  short_description: string
  description: string
  specifications?: Array<{
    name: string
    attributes: Array<{
      code: string
      name: string
      value: string
    }>
  }>
}

export interface BookFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
}

export interface BookSearchParams {
  q?: string
  category?: string
  sort?: 'title' | 'price' | 'rating' | 'newest'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
  filters?: BookFilters
}

export interface Review {
  id: number
  bookId: number
  userId: number
  userName: string
  rating: number
  comment: string
  createdAt: string
}
