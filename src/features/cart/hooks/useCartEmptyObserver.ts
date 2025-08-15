import { useEffect } from 'react'
import { useGetCartQuery } from '../api/cartApi'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'

/**
 * A hook to run side effects when the cart becomes empty
 * @param callback Function to execute when cart becomes empty
 */
export function useCartEmptyObserver(callback: () => void) {
  const { user, isAuthenticated } = useAuthVM()
  
  const { data: cartItems = [] } = useGetCartQuery(user?.id, {
    skip: !user?.id || !isAuthenticated,
    // We want to be notified as soon as the cart changes
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
  
  useEffect(() => {
    // If the cart is empty and the user is authenticated, run the callback
    if (isAuthenticated && user && cartItems.length === 0) {
      callback()
    }
  }, [cartItems.length, isAuthenticated, user, callback])
}
