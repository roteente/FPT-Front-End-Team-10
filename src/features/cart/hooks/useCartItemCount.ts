import { useGetCartQuery } from '../api/cartApi'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { useMemo } from 'react'
import { useAppSelector } from '@/app/hooks'

export function useCartItemCount() {
  const { user, isAuthenticated } = useAuthVM()
  const { data: items = [], refetch } = useGetCartQuery(user?.id, {
    skip: !user?.id || !isAuthenticated,
    // Poll more frequently when window is focused (every 10 seconds)
    pollingInterval: 10000,
    // Refetch when window regains focus
    refetchOnFocus: true,
    // Refetch when reconnecting after being offline
    refetchOnReconnect: true,
  })
  
  // Monitor the invalidation of Cart tags to trigger a refetch
  const cartInvalidations = useAppSelector((state) => state.api.mutations)
  
  // Memoize the count to avoid unnecessary recalculations
  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }, [items])

  return {
    itemCount,
    refetchCart: refetch
  }
}
