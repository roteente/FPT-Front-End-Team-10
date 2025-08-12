import { Button } from '@/ui/primitives'

interface SortBarProps {
  currentSort: string
  currentOrder: string
  onSortChange: (sort: string, order: string) => void
  totalResults?: number
}

export default function SortBar({ currentSort, currentOrder, onSortChange, totalResults }: SortBarProps) {
  const sortOptions = [
    { value: 'title', label: 'Tên sách', orders: ['asc', 'desc'] },
    { value: 'price', label: 'Giá', orders: ['asc', 'desc'] },
    { value: 'rating', label: 'Đánh giá', orders: ['desc', 'asc'] },
    { value: 'newest', label: 'Mới nhất', orders: ['desc'] },
  ]

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="text-sm text-gray-600">
        {totalResults !== undefined && (
          <span>Hiển thị {totalResults} kết quả</span>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Sắp xếp theo:</span>
        <div className="flex space-x-2">
          {sortOptions.map((option) => (
            <div key={option.value} className="flex">
              {option.orders.map((order) => (
                <Button
                  key={`${option.value}-${order}`}
                  variant={
                    currentSort === option.value && currentOrder === order
                      ? 'primary'
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => onSortChange(option.value, order)}
                >
                  {option.label} {order === 'asc' ? '↑' : '↓'}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
