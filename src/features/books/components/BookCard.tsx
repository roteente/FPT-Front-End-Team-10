import { Card, Rate, Tag, Badge } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import type { Book } from '@/features/books/bookApi'

const nf = new Intl.NumberFormat('vi-VN')

export default function BookCard({ book }: { book: Book }) {
  const nav = useNavigate()

  const price = Number(book?.price ?? 0)
  const sale = book?.salePrice != null ? Number(book.salePrice) : undefined
  const finalPrice = sale ?? price
  const discountPercent = sale ? Math.round(((price - sale) / price) * 100) : 0

  const cover = book?.images?.[0] || 'https://placehold.co/400x600?text=No+Image'

  // Random labels for demo (in real app, this would come from API)
  const getRandomLabel = () => {
    const labels = ['NEW', 'TOP DEAL', 'FREESHIP XTRA', null, null, null]
    return labels[Math.floor(Math.random() * labels.length)]
  }
  const label = getRandomLabel()

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        <div style={{ position: 'relative' }}>
          <img
            src={cover}
            alt={book?.title || 'book'}
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{ 
              width: '100%', 
              aspectRatio: '3/4', 
              objectFit: 'cover'
            }}
          />
          
          {/* Labels */}
          {label && (
            <div style={{
              position: 'absolute',
              top: 8,
              left: 8,
              padding: '4px 8px',
              fontSize: 10,
              fontWeight: 'bold',
              color: 'white',
              borderRadius: 4,
              backgroundColor: 
                label === 'NEW' ? '#f5222d' :
                label === 'TOP DEAL' ? '#fa8c16' :
                '#1890ff'
            }}>
              {label}
            </div>
          )}
          
          {/* Discount badge */}
          {discountPercent > 0 && (
            <div style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#f5222d',
              color: 'white',
              fontSize: 10,
              fontWeight: 'bold',
              padding: '2px 4px',
              borderRadius: 4
            }}>
              -{discountPercent}%
            </div>
          )}
        </div>
      }
      onClick={() => nav(`/books/${book.id}`)}
    >
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Link 
          to={`/books/${book.id}`} 
          style={{ 
            fontSize: 14, 
            fontWeight: 500, 
            color: '#262626',
            textDecoration: 'none',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 8
          }}
        >
          {book.title}
        </Link>
        
        <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 8 }}>
          {book.author}
        </div>
        
        {/* Rating */}
        {book.rating != null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
            <Rate disabled allowHalf defaultValue={book.rating} style={{ fontSize: 12 }} />
            <span style={{ fontSize: 12, color: '#8c8c8c' }}>({book.rating})</span>
          </div>
        )}

        {/* Price */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ 
            fontSize: 16, 
            fontWeight: 'bold', 
            color: '#f5222d' 
          }}>
            {nf.format(finalPrice)}₫
          </span>
          {sale != null && (
            <span style={{ 
              marginLeft: 8, 
              fontSize: 14, 
              color: '#bfbfbf', 
              textDecoration: 'line-through' 
            }}>
              {nf.format(price)}₫
            </span>
          )}
        </div>

        {/* Sold count */}
        {book.sold != null && (
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            Đã bán {book.sold > 1000 ? `${Math.floor(book.sold/1000)}k` : book.sold}
          </div>
        )}
      </div>
    </Card>
  )
}
