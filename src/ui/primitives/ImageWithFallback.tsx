import { useState, ImgHTMLAttributes } from 'react'
import { cn } from '@/core/utils/cn'

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

export function ImageWithFallback({ 
  src, 
  fallback = '/placeholder-book.jpg', 
  className, 
  alt = '',
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleError = () => {
    setError(true)
    setLoading(false)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          'w-full h-full object-cover transition-opacity',
          loading ? 'opacity-0' : 'opacity-100'
        )}
        {...props}
      />
    </div>
  )
}
