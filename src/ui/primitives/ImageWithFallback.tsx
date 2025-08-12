import { useState, ImgHTMLAttributes } from 'react'
import { cn } from '@/core/utils/cn'

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

export function ImageWithFallback({ 
  src, 
  fallback = 'https://via.placeholder.com/280x368/e5e7eb/9ca3af?text=No+Image', 
  className, 
  alt = '',
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // Debug logs
  console.log('ImageWithFallback rendered:', { src, fallback, error, loading });

  const handleError = () => {
    console.log('Image failed to load:', src);
    setError(true)
    setLoading(false)
  }

  const handleLoad = () => {
    console.log('Image loaded successfully:', src);
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
