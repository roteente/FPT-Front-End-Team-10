import type { Book } from '../api/bookApi'

/**
 * Lấy URL ảnh thumbnail từ book object
 * Hỗ trợ nhiều format dữ liệu khác nhau
 */
export function getBookThumbnail(book: Book): string {
  // Kiểm tra các trường ảnh có thể có
  const images = book.images
  const bookCover = (book as any).book_cover
  const thumbnail = (book as any).thumbnail
  const cover = (book as any).cover
  
  // 1. Nếu có images array
  if (images && images.length > 0) {
    const firstImage = images[0]
    
    // Nếu images là array of strings
    if (typeof firstImage === 'string') {
      return firstImage
    }
    
    // Nếu images là array of objects
    if (typeof firstImage === 'object' && firstImage !== null) {
      return (
        firstImage.thumbnail_url || 
        firstImage.small_url || 
        firstImage.medium_url ||
        firstImage.base_url ||
        (firstImage as any).url ||
        (firstImage as any).src
      )
    }
  }
  
  // 2. Nếu có book_cover
  if (bookCover && typeof bookCover === 'string') {
    return bookCover
  }
  
  // 3. Nếu có thumbnail
  if (thumbnail && typeof thumbnail === 'string') {
    return thumbnail
  }
  
  // 4. Nếu có cover
  if (cover && typeof cover === 'string') {
    return cover
  }
  
  // 5. Fallback tới placeholder với random seed
  return `https://picsum.photos/276/368?random=${book.id}`
}

/**
 * Tạo fallback URL chain cho image onError
 */
export function getImageFallbackChain(book: Book, title: string): string[] {
  const bookId = book.id
  const shortTitle = title.substring(0, 20).replace(/[^a-zA-Z0-9\s]/g, '')
  
  return [
    // 1. Picsum với random seed
    `https://picsum.photos/276/368?random=${bookId}`,
    
    // 2. Placeholder với text
    `https://via.placeholder.com/276x368/e5e7eb/6b7280?text=${encodeURIComponent(shortTitle)}`,
    
    // 3. SVG data URI fallback
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjc2IiBoZWlnaHQ9IjM2OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJvb2s8L3RleHQ+PC9zdmc+',
  ]
}

/**
 * Kiểm tra URL có phải là valid image URL không
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:' || url.startsWith('data:')
  } catch {
    return false
  }
}
