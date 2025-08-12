import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { setCartItems } from '../model/cartSlice'
import { CartTableUI } from '../ui/CartTableUI'
import type { CartItem } from '../model/types'
import type { Book } from '@/features/books/model/types'

export function CartTableContainer() {
  const dispatch = useAppDispatch()
  
  // Book data from provided source
  const books: Book[] = [
    {
      id: 6,
      name: "Đời Ngắn Đừng Ngủ Dài (Tái Bản)",
      authors: [{ id: 13992, name: "Robin Sharma", slug: "robin-sharma" }],
      current_seller: { 
        id: 1,
        sku: "2331938564882",
        name: "Tiki Trading",
        link: "https://tiki.vn/cua-hang/tiki-trading",
        logo: "https://vcdn.tikicdn.com/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777629aa0.png",
        price: 57491,
        product_id: "8835160",
        store_id: 40395,
        is_best_store: false,
        is_offline_installment_supported: null
      },
      list_price: 75000,
      original_price: 75000,
      categories: { id: 316, name: "Sách tiếng Việt", is_leaf: false },
      images: [{
        base_url: "https://salt.tikicdn.com/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
        is_gallery: true,
        label: null,
        large_url: "https://salt.tikicdn.com/cache/w1200/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
        medium_url: "https://salt.tikicdn.com/cache/w300/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
        position: null,
        small_url: "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg",
        thumbnail_url: "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg"
      }],
      rating_average: 4.8,
      short_description: "“Mọi lựa chọn đều giá trị. Mọi bước đi đều quan trọng. Cuộc sống vẫn diễn ra theo cách của nó, không phải theo cách của ta. Hãy kiên nhẫn. Tin tưởng. Hãy giống như người thợ cắt đá, đều đặn từng nhịp,...",
      description: "<p>“Mọi lựa chọn đều giá trị. Mọi bước đi đều quan trọng. Cuộc sống vẫn diễn ra theo cách của nó, không phải theo cách của ta. Hãy kiên nhẫn. Tin tưởng. Hãy giống như người thợ cắt đá, đều đặn từng nhịp, ngày qua ngày. Cuối cùng, một nhát cắt duy nhất sẽ phá vỡ tảng đá và lộ ra viên kim cương. Người tràn đầy nhiệt huyết và tận tâm với việc mình làm không bao giờ bị chối bỏ. Sự thật là thế.”</p><p>Bằng những lời chia sẻ thật ngắn gọn, dễ hiểu về những trải nghiệm và suy ngẫm trong đời, Robin Sharma tiếp tục phong cách viết của ông từ cuốn sách Điều vĩ đại đời thường để mang đến cho độc giả những bài viết như lời tâm sự, vừa chân thành vừa sâu sắc.</p><p>Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng).....</p>",
    }

  ]

  // Local state for cart management
  const [cart, setCart] = useState([
    {
      id: 1,
      userId: 123,
      items: [
        { bookId: 6, quantity: 2 },
        { bookId: 7, quantity: 1 },
      ]
    }
  ])

  // Memoized cart items
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

  // Update Redux store when items change
  useEffect(() => {
    if (items.length > 0) {
      dispatch(setCartItems(items))
    }
  }, [items, dispatch])

  // Cart management functions
  const addToCart = (bookId: number, quantity: number = 1) => {
    setCart(prevCart => {
      const userCart = prevCart[0]
      const existingItem = userCart.items.find(item => item.bookId === bookId)
      
      if (existingItem) {
        return [{
          ...userCart,
          items: userCart.items.map(item =>
            item.bookId === bookId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }]
      }
      
      return [{
        ...userCart,
        items: [...userCart.items, { bookId, quantity }]
      }]
    })
  }

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity < 1) return removeItem(bookId)
    
    setCart(prevCart => {
      const userCart = prevCart[0]
      return [{
        ...userCart,
        items: userCart.items.map(item =>
          item.bookId === bookId
            ? { ...item, quantity }
            : item
        )
      }]
    })
  }

  const removeItem = (bookId: number) => {
    setCart(prevCart => {
      const userCart = prevCart[0]
      return [{
        ...userCart,
        items: userCart.items.filter(item => item.bookId !== bookId)
      }]
    })
  }

  // Calculate total price
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [items])

  return (
    <div className="p-4">
      {items.length === 0 ? (
        <p className="text-center text-gray-500">Giỏ hàng của bạn đang trống</p>
      ) : (
        <>
          <CartTableUI
            items={items}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
          />
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">
              Tổng tiền: {totalPrice.toLocaleString('vi-VN')} đ
            </p>
          </div>
        </>
      )}
    </div>
  )
}