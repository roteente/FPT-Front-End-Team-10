import { cn } from '@/core/utils/cn'

interface RatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  className?: string
}

export function Rating({ 
  rating, 
  maxRating = 5, 
  size = 'md', 
  showNumber = false,
  className 
}: RatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const filled = index < Math.floor(rating)
    const half = index === Math.floor(rating) && rating % 1 !== 0

    return (
      <svg
        key={index}
        className={cn(
          sizes[size],
          filled ? 'text-yellow-400' : half ? 'text-yellow-400' : 'text-gray-300'
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        {half ? (
          <defs>
            <linearGradient id={`half-${index}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
        ) : null}
        <path
          fillRule="evenodd"
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          clipRule="evenodd"
          fill={half ? `url(#half-${index})` : 'currentColor'}
        />
      </svg>
    )
  })

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">{stars}</div>
      {showNumber && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
