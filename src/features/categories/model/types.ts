export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: number
  children?: Category[]
  bookCount?: number
}
