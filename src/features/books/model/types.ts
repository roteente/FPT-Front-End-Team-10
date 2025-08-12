export interface Book {
  id: number
  name: string
  authors?: Array<{
    id: number
    name: string
    slug: string
  }>
  current_seller: {
    id: number
    sku: string
    name: string
    link: string
    logo: string
    price: number
    product_id: string
    store_id: number
    is_best_store: boolean
    is_offline_installment_supported: boolean | null
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
    is_gallery: boolean
    label: string | null
    large_url: string
    medium_url: string
    position: number | null
    small_url: string
    thumbnail_url: string
  }>
  rating_average: number
  short_description: string
  description: string
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
