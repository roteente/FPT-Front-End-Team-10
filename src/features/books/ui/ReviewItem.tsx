import { Rating } from '@/ui/primitives'
import { formatDate } from '@/core/utils/format'
import { Review } from '../model/types'

interface ReviewItemProps {
  review: Review
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{review.userName}</h4>
          <div className="flex items-center mt-1">
            <Rating rating={review.rating} size="sm" />
            <span className="text-sm text-gray-500 ml-2">
              {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  )
}
