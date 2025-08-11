import { useState, FormEvent } from 'react'

interface SearchBoxProps {
  onSearch?: (query: string) => void
}

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query.trim())
    } else {
      // Navigate to search page
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="search"
        placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-12 pl-4 pr-12 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-50 rounded transition-colors"
      >
        <img 
          src="/icon-search.svg" 
          alt="Tìm kiếm" 
          width="20"
          height="20"
        />
      </button>
    </form>
  )
}
