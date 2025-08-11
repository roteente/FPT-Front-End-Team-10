import { useState, FormEvent } from 'react'
import { Button, Input } from '@/ui/primitives'
import { cn } from '@/core/utils/cn'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  defaultValue?: string
  className?: string
}

export function SearchBar({ 
  onSearch, 
  placeholder = 'Tìm kiếm sách...', 
  defaultValue = '',
  className 
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
      <div className="flex-1">
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <Button type="submit" variant="primary">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Tìm kiếm
      </Button>
    </form>
  )
}
