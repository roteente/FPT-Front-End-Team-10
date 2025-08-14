import { useState, FormEvent, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SearchSuggestions from './SearchSuggestions'

interface SearchBoxProps {
  onSearch?: (query: string) => void
}

export function SearchBox({ onSearch }: SearchBoxProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Update query when URL changes
  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    if (urlQuery !== query) {
      setQuery(urlQuery)
    }
  }, [searchParams])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmedQuery = query.trim()
    
    setShowSuggestions(false)
    inputRef.current?.blur()
    
    if (onSearch) {
      onSearch(trimmedQuery)
    } else {
      // Navigate to search page with query
      if (trimmedQuery) {
        navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`)
      } else {
        navigate('/search')
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    
    // Show suggestions when typing
    if (newQuery.length >= 2 && isInputFocused) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleInputFocus = () => {
    setIsInputFocused(true)
    if (query.length >= 2) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    setIsInputFocused(false)
    // Delay hiding suggestions to allow clicks
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }

  const handleClear = () => {
    setQuery('')
    setShowSuggestions(false)
    inputRef.current?.focus()
    
    // Optional: Navigate to search page without query
    if (!onSearch) {
      navigate('/search')
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    inputRef.current?.blur()
  }

  const handleCloseSuggestions = () => {
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          ref={inputRef}
          type="search"
          placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-full h-12 pl-4 pr-20 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500"
          autoComplete="off"
        />
        
        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Search button */}
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

      {/* Search Suggestions */}
      <SearchSuggestions
        query={query}
        isVisible={showSuggestions}
        onSuggestionClick={handleSuggestionClick}
        onClose={handleCloseSuggestions}
      />
    </div>
  )
}
