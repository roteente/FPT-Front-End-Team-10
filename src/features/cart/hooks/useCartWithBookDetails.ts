import { useEffect, useState } from 'react'
import { useGetCartQuery } from '../api/cartApi'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { CartItem } from '../model/types'

export function useCartWithBookDetails() {
  const { user } = useAuthVM()
  const { data: cartItems = [], isLoading: isLoadingCart, refetch } = useGetCartQuery(user?.id, {
    skip: !user?.id,
    // Update cart data frequently
    pollingInterval: 5000,
    // Refetch when window regains focus
    refetchOnFocus: true,
    // Refetch when reconnecting
    refetchOnReconnect: true,
  })
  
  const [itemsWithDetails, setItemsWithDetails] = useState<CartItem[]>([])
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  // For each cart item, fetch the book details
  useEffect(() => {
    if (cartItems.length === 0 || isLoadingCart) return
    
    setIsLoadingDetails(true)
    
    const fetchBookDetails = async () => {
      try {
        const itemsWithDetailsPromises = cartItems.map(async (item) => {
          try {
            // Use direct fetch to get book details
            const result = await fetch(`http://localhost:3000/books/${item.bookId}`)
            
            if (!result.ok) {
              console.error(`Failed to fetch book with ID: ${item.bookId}`)
              return {
                ...item,
                title: `Book #${item.bookId}`,
                price: 0,
                image: '',
              }
            }
            
            const book = await result.json()
            
            return {
              ...item,
              title: book.name || `Book #${item.bookId}`,
              price: book.list_price || book.current_seller?.price || 0,
              image: book.images?.[0]?.base_url || '',
              book
            }
          } catch (error) {
            console.error(`Error fetching book details for ID ${item.bookId}:`, error)
            return {
              ...item,
              title: `Book #${item.bookId}`,
              price: 0,
              image: '',
            }
          }
        })
        
        const completedItemsWithDetails = await Promise.all(itemsWithDetailsPromises)
        setItemsWithDetails(completedItemsWithDetails)
        setIsLoadingDetails(false)
      } catch (error) {
        console.error('Error fetching book details:', error)
        setIsLoadingDetails(false)
      }
    }
    
    fetchBookDetails()
  }, [cartItems, isLoadingCart])
  
  // Manually trigger refetch of cart data
  const refreshCart = () => {
    refetch()
  }
  
  return {
    cartItems: itemsWithDetails,
    isLoading: isLoadingCart || isLoadingDetails,
    refetch: refreshCart
  }
}
