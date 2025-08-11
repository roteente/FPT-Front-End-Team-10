import React, { useEffect, useMemo } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { setCartItems } from '../model/cartSlice'
import { CartTableUI } from '../ui/CartTableUI'
import { useCartActions } from '../hooks/useCartActions'
import type { CartItem } from '../model/types'
import type { Book } from '@/features/books/model/types'

export function CartTableContainer() {
  const dispatch = useAppDispatch()

  // Fake data sách
  const books: Book[] = [
    {
      id: 1,
      name: "Sách A",
      authors: [{ id: 1, name: "Tác giả A", slug: "tac-gia-a" }],
      current_seller: { price: 100000, name: "Cửa hàng 1", is_best_store: true },
      list_price: 120000,
      original_price: 130000,
      categories: { id: 1, name: "Sách văn học", is_leaf: true },
      images: [{ base_url: "", large_url: "", medium_url: "https://via.placeholder.com/150", small_url: "", thumbnail_url: "" }],
      rating_average: 4.5,
      short_description: "Mô tả ngắn sách A",
      description: "Mô tả chi tiết sách A",
    },
    {
      id: 2,
      name: "Sách B",
      authors: [{ id: 2, name: "Tác giả B", slug: "tac-gia-b" }],
      current_seller: { price: 150000, name: "Cửa hàng 2", is_best_store: false },
      list_price: 180000,
      original_price: 200000,
      categories: { id: 2, name: "Sách kỹ năng", is_leaf: true },
      images: [{ base_url: "", large_url: "", medium_url: "https://via.placeholder.com/150", small_url: "", thumbnail_url: "" }],
      rating_average: 4.2,
      short_description: "Mô tả ngắn sách B",
      description: "Mô tả chi tiết sách B",
    },
  ]

  // Fake dữ liệu giỏ hàng
  const cart = [
    {
      id: 1,
      userId: 123,
      items: [
        { bookId: 1, quantity: 2 },
        { bookId: 2, quantity: 1 },
      ]
    }
  ]

  // Ghép dữ liệu cart và books thành CartItem[]
  const items: CartItem[] = useMemo(() => {
    if (!cart || !books || cart.length === 0) return []

    const userCart = cart[0]

    return userCart.items
      .map(item => {
        const book = books.find(b => b.id === item.bookId)
        if (!book) return null

        return {
          id: item.bookId,
          bookId: book.id,
          title: book.name,
          image: book.images?.[0]?.medium_url || '',
          price: book.current_seller?.price || 0,
          quantity: item.quantity,
        }
      })
      .filter((item): item is CartItem => item !== null)
  }, [cart, books])

  // Cập nhật redux store khi items thay đổi
  useEffect(() => {
    if (items.length > 0) {
      dispatch(setCartItems(items))
    }
  }, [items, dispatch])

  // Nếu bạn có hook xử lý giỏ hàng
  const { updateQuantity, remove } = useCartActions()

  return (
    <div>
      {items.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống</p>
      ) : (
        <CartTableUI
          items={items}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={remove}
        />
      )}
    </div>
  )
}
