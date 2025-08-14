import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import { BookSearchParams } from '../model/types'

export function useBooksQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useMemo((): BookSearchParams => {
    return {
      q: searchParams.get('q') || undefined,
      category: searchParams.get('category') || undefined,
      sort: (searchParams.get('sort') as any) || 'title',
      order: (searchParams.get('order') as any) || 'asc',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
    }
  }, [searchParams])

  const updateParams = (newParams: Partial<BookSearchParams>) => {
    const updatedParams = new URLSearchParams(searchParams)
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        updatedParams.set(key, value.toString())
      } else {
        updatedParams.delete(key)
      }
    })
    
    setSearchParams(updatedParams)
  }

  return {
    params,
    updateParams,
    setQuery: (q: string) => updateParams({ q, page: 1 }),
    setCategory: (category: string) => updateParams({ category, page: 1 }),
    setSort: (sort: 'title' | 'price' | 'rating' | 'newest', order: 'asc' | 'desc') => updateParams({ sort, order, page: 1 }),
    setPage: (page: number) => updateParams({ page }),
  }
}
